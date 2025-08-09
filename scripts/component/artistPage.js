import { fetchArtistVideos, fetchSongVideo } from '../services/youtubeService.js';

export class ArtistPage {
  constructor(artistId) {
    console.log(`Initializing ArtistPage for artist ID: ${artistId}`);
    this.artistId = artistId;
    this.artist = null; // Will hold artist data
    this.videos = [];
    this.init().catch(error => {
      console.error('ArtistPage initialization failed:', error);
    });
  }

  async init() {
    console.log('Starting initialization...');
    await this.fetchArtistData();
    console.log('Artist data fetched:', this.artist);

    await this.fetchVideos();
    console.log('Videos fetched:', this.videos);

    this.render();
    this.setupEventListeners();
    console.log('ArtistPage initialized successfully');
  }

  async fetchArtistData() {
    // In a real app, this would fetch from your API
    // For now, we'll use mock data
    this.artist = {
      id: this.artistId,
      name: "Artist Name",
      genre: "Afrobeats",
      monthlyListeners: "4.8M",
      followers: "1.2M",
      tracks: 12,
      bio: "Artist Name is a Nigerian Afrobeats singer, songwriter, and performer..."
    };
  }

  async fetchVideos() {
    try {
      // Pass a real artist name, not just "Artist Name"
      const artistQuery = this.artist?.name || "Afrobeats";
      this.videos = await fetchArtistVideos(artistQuery + " Afrobeats");
    } catch (error) {
      console.error('Error fetching videos:', error);
      this.videos = [];
    }
  }


  renderVideoCard(video) {
    return `
      <div class="video-card" data-video-id="${video.id}">
        <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
        <div class="video-info">
          <h3 class="video-title">${video.title}</h3>
          <p class="video-channel">${video.channelTitle}</p>
          <p class="video-date">${video.publishedAt}</p>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        this.playVideo(videoId);
      });
    });
  }

  playVideo(videoId) {
    const playerContainer = document.getElementById('video-player');
    if (playerContainer) {
      playerContainer.innerHTML = `
        <iframe width="100%" height="500" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    }
  }

  render() {
    console.log('Rendering artist page...');
    const videosContainer = document.querySelector('#videos .videos-grid');
    if (!videosContainer) {
      console.error('Videos container not found!');
      return;
    }

    if (this.videos.length > 0) {
      console.log(`Rendering ${this.videos.length} videos`);
      videosContainer.innerHTML = this.videos.map(video => this.renderVideoCard(video)).join('');
    } else {
      console.log('No videos to render');
      videosContainer.innerHTML = '<p class="no-videos">No videos found for this artist.</p>';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing ArtistPage');

  // Extract artist ID from URL or use default
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id') || 'default-artist';

  new ArtistPage(artistId);
});