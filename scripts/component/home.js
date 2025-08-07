export function renderHome(data) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="trending">
      <h2>🔥 Trending Tracks</h2>
      <div class="track-list">
        ${data.rankings.map(ranking => {
          const track = data.tracks.find(t => t.id === ranking.trackId);
          const artist = data.artists.find(a => a.id === track.artistId);
          return `
            <div class="track-card">
              <h3>${track.title}</h3>
              <p>${artist.name}</p>
              <p>${track.duration}</p>
            </div>
          `;
        }).join('')}
      </div>
    </section>

    <section class="top-artists">
      <h2>🌍 Top Artists</h2>
      <div class="artist-list">
        ${data.artists.map(artist => `
          <div class="artist-card">
            <img src="${artist.image}" alt="${artist.name}" />
            <h3>${artist.name}</h3>
            <p>${artist.genre}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

