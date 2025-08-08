import { ArtistPage } from './component/artistPage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the artist page
  if (document.querySelector('.artist-main')) {
    // Extract artist ID from URL or other source
    const artistId = new URLSearchParams(window.location.search).get('id') || 'default';
    new ArtistPage(artistId);
  }

  // Other page initializations...
});