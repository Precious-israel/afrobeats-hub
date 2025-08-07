import { fetchJSON } from './utils/apiUtils.js';
import { renderHome } from './components/homeComponent.js';
import { renderPlaylistManager } from './components/playlistComponent.js';
import { renderArtistPage } from './components/artistPageComponent.js';

let appData = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    appData = await fetchJSON('./data/data.json');
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
  } catch (error) {
    console.error('App failed to load:', error);
  }
});

function handleRoute() {
  const hash = location.hash.slice(1); // remove #
  if (!hash || hash === 'home') {
    renderHome(appData);
  } else if (hash === 'playlist') {
    renderPlaylistManager();
  } else if (hash.startsWith('artist/')) {
    const artistName = decodeURIComponent(hash.split('/')[1]);
    renderArtistPage(artistName);
  } else {
    document.getElementById('app').innerHTML = `<h2>Page not found</h2>`;
  }
}
document.getElementById('login-btn').addEventListener('click', () => {
  const name = prompt('Enter your username:');
  if (name) {
    localStorage.setItem('user', name);
    alert(`Welcome back, ${name}`);
  }
});
