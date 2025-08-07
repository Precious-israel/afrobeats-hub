export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    throw error;
  }
}

