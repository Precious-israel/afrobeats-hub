export function renderPlaylistManager() {
  const app = document.getElementById('app');
  const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

  app.innerHTML = `
    <section class="playlists">
      <h2>🎵 Your Playlists</h2>
      <form id="newPlaylistForm">
        <input type="text" id="playlistName" placeholder="Playlist Name" required />
        <button type="submit">Create</button>
      </form>
      <ul>
        ${playlists.map(p => `<li>${p.name}</li>`).join('')}
      </ul>
    </section>
  `;

  document.getElementById('newPlaylistForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('playlistName').value.trim();
    if (name) {
      playlists.push({ name, tracks: [] });
      localStorage.setItem('playlists', JSON.stringify(playlists));
      renderPlaylistManager(); // re-render updated list
    }
  });
}

