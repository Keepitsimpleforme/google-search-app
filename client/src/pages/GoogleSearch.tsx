const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_CX = process.env.REACT_APP_GOOGLE_CX;
export async function searchGoogle(query: string) {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    throw new Error("Missing Google API key or CX");
  }

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`;
  console.log("Request URL:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  console.log("Google API full response:", data);
  return data.items || [];
}
