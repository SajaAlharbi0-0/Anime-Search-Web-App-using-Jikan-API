//saja alharbi 2210206
const form = document.getElementById('search-form');
const input = document.getElementById('anime-input');
const results = document.getElementById('anime-results');
const clearBtn = document.getElementById('clear-btn');

// Submits the form and triggers the anime search (event type 1)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  fetchAnime(query);
});

// Clears the input field on double click (event type 2)
input.addEventListener('dblclick', () => {
  input.value = '';
});

// Clears the results when the clear button is clicked (event type 3)
clearBtn.addEventListener('click', () => {
  results.innerHTML = '';
});
// Fetches anime data from the Jikan API based on the search query
async function fetchAnime(query) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();
// Displays message if no results are found
    if (!data.data || data.data.length === 0) {
      results.innerHTML = `<p>No results found for "${query}".</p>`;
      return;
    }

    results.innerHTML = ''; 
    data.data.forEach(anime => {
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p><strong>Rating:</strong> ${anime.rating || 'N/A'}</p>
        <p><strong>Genres:</strong> ${anime.genres.map(g => g.name).join(', ')}</p>
        <p>${anime.synopsis ? anime.synopsis.slice(0, 150) + '...' : 'No synopsis available.'}</p>
      `;
      results.appendChild(card);
    });
  } catch (error) {
    results.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}
