const YOUTUBE_API_KEY = 'AIzaSyCFXkni_5Vjvjv-IzLRbG41mvm8BnF2Ko0';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * Fetch music videos for a specific artist
 * @param {string} artistName - Name of the artist to search for
 * @param {number} maxResults - Maximum number of results to return (default 5)
 * @returns {Promise<Array>} - Array of video objects
 */
export async function fetchArtistVideos(artistName, maxResults = 5) {
  try {
    const query = `${artistName} official music video`;
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return []; // Return empty array on error
  }
}

/**
 * Fetch music videos for a specific song
 * @param {string} songName - Name of the song
 * @param {string} artistName - Name of the artist
 * @returns {Promise<Object|null>} - Video object or null if not found
 */
export async function fetchSongVideo(songName, artistName) {
  try {
    const query = `${artistName} ${songName} official music video`;
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.items.length === 0) return null;

    const item = data.items[0];
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url
    };
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
}