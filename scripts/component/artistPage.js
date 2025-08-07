import { getArtistByName, getTopTracks } from '../services/spotifyService.js';
import { searchMusicVideo } from '../services/youtubeService.js';

export async function renderArtistPage(artistName) {
  const app = document.getElementById('app');
  app.innerHTML = `<h2>Loading artist data for "${artistName}"...</h2>`;

  try {
    const artist = await getArtistByName(artistName);
    const tracks = await getTopTracks(artist.id);

    const trackHTML = await Promise.all(tracks.map(async (track) => {
      const video = await searchMusicVideo(`${track.name} ${artist.name}`);
      return `
        <div class="track">
          <h4>${track.name}</h4>
          <audio controls src="${track.preview_url || ''}"></audio>
          <iframe width="300" height="180"
            src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0"
            allowfullscreen>
          </iframe>
        </div>`;
    }));

    app.innerHTML = `
      <section class="artist-profile">
        <h2>${artist.name}</h2>
        <img src="${artist.images[0]?.url || ''}" alt="${artist.name}" />
        <p>Genre: ${artist.genres.join(', ')}</p>
        <h3>Top Tracks</h3>
        <div class="tracks">
          ${trackHTML.join('')}
        </div>
      </section>
    `;
  } catch (error) {
    console.error('Error loading artist page:', error);
    app.innerHTML = `<p>Failed to load artist data for "${artistName}".</p>`;
  }
}
