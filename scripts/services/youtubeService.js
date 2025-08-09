const YOUTUBE_API_KEY = 'AIzaSyCFXkni_5Vjvjv-IzLRbG41mvm8BnF2Ko0';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Fetch multiple videos for an artist
export async function fetchArtistVideos(artistName, maxResults = 5) {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(artistName + " official music video")}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data.items?.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || '',
      channelTitle: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
    })) || [];
  } catch (error) {
    console.error('YouTube API Error:', error);
    return [];
  }
}

// Fetch single video for a specific song
export async function fetchSongVideo(songName, artistName) {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=1&q=${encodeURIComponent(`${artistName} ${songName} official music video`)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    if (!data.items?.length) return null;

    return {
      id: data.items[0].id.videoId,
      title: data.items[0].snippet.title,
      thumbnail: data.items[0].snippet.thumbnails?.high?.url || ''
    };
  } catch (error) {
    console.error('YouTube API Error:', error);
    return null;
  }
}