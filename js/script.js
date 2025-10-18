console.log('Script loaded!');
console.log('API_KEY:', CONFIG.TMDB_API_KEY ? 'Found' : 'Missing');

const API_KEY = CONFIG.TMDB_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

let selectedMovie = null;
let watchlist = [];

// Get form and display elements
const form = document.getElementById('add-form');
const watchlistContainer = document.getElementById('watchlist-container');
const titleInput = document.getElementById('title');
const searchResults = document.getElementById('search-results');

// Search movies as user types
titleInput.addEventListener('input', async function() {
    const query = titleInput.value.trim();
    console.log('Typing:', query);
    
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    console.log('Searching for:', query);
    
    try {
        const response = await fetch(`${API_BASE}/search/multi?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        console.log('Results:', data);
        
        displaySearchResults(data.results.slice(0, 5));
    } catch (error) {
        console.error('Search error:', error);
    }
});

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: 12px; color: #787774;">No results found</p>';
        return;
    }
    
    searchResults.innerHTML = '';
    
    results.forEach((item, index) => {
        const title = item.title || item.name;
        const year = item.release_date || item.first_air_date;
        const type = item.media_type === 'movie' ? 'Movie' : 'TV Show';
        const poster = item.poster_path ? IMAGE_BASE + item.poster_path : null;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            ${poster ? `<img src="${poster}" alt="${title}">` : '<div class="no-poster">🎬</div>'}
            <div>
                <strong>${title}</strong>
                <small>${type} ${year ? '(' + year.split('-')[0] + ')' : ''}</small>
            </div>
        `;
        
        // Add click event properly without onclick attribute
        resultItem.addEventListener('click', () => selectMovie(item));
        
        searchResults.appendChild(resultItem);
    });
}

async function selectMovie(item) {
    const type = item.media_type === 'movie' ? 'movie' : 'tv';
    const endpoint = type === 'movie' ? 'movie' : 'tv';
    
    try {
        const response = await fetch(`${API_BASE}/${endpoint}/${item.id}?api_key=${API_KEY}`);
        const data = await response.json();
        
        selectedMovie = {
            tmdbId: data.id,
            title: data.title || data.name,
            type: type === 'movie' ? 'Movie' : 'TV Show',
            genres: data.genres.map(g => g.name).join(', '),
            poster: data.poster_path ? IMAGE_BASE + data.poster_path : null,
            backdrop: data.backdrop_path ? IMAGE_BASE + data.backdrop_path : null
        };
        
        // Update form
        titleInput.value = selectedMovie.title;
        document.getElementById('genre').value = selectedMovie.genres;
        document.getElementById('type').value = type === 'movie' ? 'movie' : 'show';        
        // Clear search results
        searchResults.innerHTML = '';
        
        console.log('Selected:', selectedMovie);
        
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedMovie) {
        alert('Please select a movie from the search results');
        return;
    }
    
    const item = {
        ...selectedMovie,
        id: Date.now(),
        watched: false
    };
    
    watchlist.push(item);
    displayWatchlist();
    
    form.reset();
    selectedMovie = null;
});

// Function to display watchlist
function displayWatchlist() {
    watchlistContainer.innerHTML = '';
    
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p style="text-align: center; color: #6B6B6B; grid-column: 1/-1;">Your watchlist is empty. Add something to get started!</p>';
        return;
    }
    
    watchlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'watchlist-item';
        
        if (item.watched) {
            itemDiv.classList.add('watched');
        }
        
        const posterHTML = item.poster 
            ? `<img src="${item.poster}" alt="${item.title}">`
            : `<div class="poster-placeholder"><span>🎬</span></div>`;
        
        itemDiv.innerHTML = `
            <div class="poster-container">
                ${posterHTML}
                <div class="item-overlay">
                    <button class="btn-watched" onclick="toggleWatched(${item.id})">
                        ${item.watched ? '✓ Watched' : 'Mark Watched'}
                    </button>
                    <button class="btn-remove" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
            <div class="item-info">
                <h3>${item.title}</h3>
                <div class="item-meta">
                    <span class="tag">${item.type}</span>
                    ${item.genres ? `<span class="tag">${item.genres.split(',')[0]}</span>` : ''}
                </div>
            </div>
        `;
        watchlistContainer.appendChild(itemDiv);
    });
}

// Function to toggle watched status
function toggleWatched(id) {
    const item = watchlist.find(item => item.id === id);
    if (item) {
        item.watched = !item.watched;
        displayWatchlist();
    }
}

// Function to remove item
function removeItem(id) {
    watchlist = watchlist.filter(item => item.id !== id);
    displayWatchlist();
}

// Random picker
const pickButton = document.getElementById('pick-for-me');
const resultDiv = document.getElementById('result');

pickButton.addEventListener('click', function() {
    const unwatchedMovies = watchlist.filter(item => !item.watched);
    
    if (unwatchedMovies.length === 0) {
        resultDiv.innerHTML = '<p>You\'ve watched everything! Add more to your watchlist or mark some as unwatched.</p>';
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * unwatchedMovies.length);
    const picked = unwatchedMovies[randomIndex];
    
    resultDiv.innerHTML = `
        <h3>You should watch:</h3>
        <h2>${picked.title}</h2>
        <p>Type: ${picked.type} | Genre: ${picked.genres}</p>
    `;
});