const form = document.getElementById('search-form');
const input = document.getElementById('anime-input');
const results = document.getElementById('anime-results');
const clearBtn = document.getElementById('clear-btn');

// Event: Submit form (1st event type)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  fetchAnime(query);
});

// Event: Double click to clear input (2nd event type)
input.addEventListener('dblclick', () => {
  input.value = '';
});

// Event: Click to clear results (3rd event type)
clearBtn.addEventListener('click', () => {
  results.innerHTML = '';
});

async function fetchAnime(query) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      results.innerHTML = `<p>No results found for "${query}".</p>`;
      return;
    }

    results.innerHTML = ''; // clear previous
    data.data.slice(0, 3).forEach(anime => {
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
