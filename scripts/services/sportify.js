const BASE_URL = 'https://api.spotify.com/v1';
const ACCESS_TOKEN = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with a valid token

export async function getArtistByName(name) {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(name)}&type=artist&limit=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
  const data = await res.json();
  return data.artists.items[0];
}

export async function getTopTracks(artistId) {
  const url = `${BASE_URL}/artists/${artistId}/top-tracks?market=US`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
  const data = await res.json();
  return data.tracks;
}
