const ACCESS_TOKEN = 'YOUR_GENIUS_ACCESS_TOKEN';

export async function searchLyrics(songTitle, artistName) {
  const query = `${songTitle} ${artistName}`;
  const endpoint = `https://api.genius.com/search?q=${encodeURIComponent(query)}`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  const data = await res.json();
  return data.response.hits[0]; // Best match
}
