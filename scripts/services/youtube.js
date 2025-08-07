const API_KEY = 'YOUR_YOUTUBE_API_KEY';

export async function searchMusicVideo(query) {
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${API_KEY}`;
  
  const res = await fetch(endpoint);
  const data = await res.json();
  return data.items[0]; // Returns the first video match
}
