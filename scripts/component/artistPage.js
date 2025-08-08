import { fetchArtistVideos, fetchSongVideo } from '../services/youtube.js';
import { makeApiRequest } from '../apiUtils.js';

export class ArtistPage {
  constructor(artistId) {
    this.artistId = artistId;
    this.videos = [];
    this.init();
  }

  async init() {
    await this.fetchArtistData();
    await this.fetchVideos();
    this.render();
    this.setupEventListeners();
  }

  async fetchArtistData() {
    // You'll want to replace this with your actual artist data fetching logic
    this.artist = {
      id: this.artistId,
      name: 'Artist Name',
      genre: 'Afrobeats',
      monthlyListeners: '4.8M',
      followers: '1.2M'
    };
  }

  async fetchVideos() {
    try {
      this.videos = await fetchArtistVideos(this.artist.name);
      console.log('Fetched videos:', this.videos);
    } catch (error) {
      console.error('Error loading videos:', error);
      this.videos = [];
    }
  }

  render() {
    const videosContainer = document.getElementById('videos');
    if (videosContainer) {
      videosContainer.innerHTML = this.videos.length > 0
        ? this.videos.map(video => this.renderVideoCard(video)).join('')
        : '<p>No videos found for this artist.</p>';
    }
  }

  renderVideoCard(video) {
    return `
      <div class="video-card" data-video-id="${video.id}">
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}">
          <div class="video-duration">3:45</div>
          <button class="video-play" aria-label="Play video">
            <img src="../assets/icons/play.svg" alt="Play">
          </button>
        </div>
        <h3 class="video-title">${video.title}</h3>
        <p class="video-views">${video.channelTitle} • ${video.publishedAt}</p>
      </div>
    `;
  }

  setupEventListeners() {
    document.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.video-play')) return;
        const videoId = card.dataset.videoId;
        this.playVideo(videoId);
      });
    });
  }

  playVideo(videoId) {
    const playerContainer = document.getElementById('video-player');
    if (playerContainer) {
      playerContainer.innerHTML = `
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    }
  }
}