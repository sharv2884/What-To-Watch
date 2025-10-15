// Array to store watchlist items
let watchlist = [];

// Get form and display elements
const form = document.getElementById('add-form');
const watchlistContainer = document.getElementById('watchlist-container');

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    
    // Get values from form
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const genre = document.getElementById('genre').value;
    
    // Create item object
    const item = {
        title: title,
        type: type,
        genre: genre,
        id: Date.now(),
        watched: false  // Add this line
    };
    
    // Add to watchlist array
    watchlist.push(item);
    
    // Display the list
    displayWatchlist();
    
    // Clear the form
    form.reset();
});

// Function to display watchlist
function displayWatchlist() {
    watchlistContainer.innerHTML = '';
    
    watchlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'watchlist-item';
        
        // Add 'watched' class if item is watched
        if (item.watched) {
            itemDiv.classList.add('watched');
        }
        
        itemDiv.innerHTML = `
            <h3>${item.title} ${item.watched ? '✓' : ''}</h3>
            <p>Type: ${item.type}</p>
            <p>Genre: ${item.genre}</p>
            <button onclick="toggleWatched(${item.id})">
                ${item.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
            </button>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        watchlistContainer.appendChild(itemDiv);
    });
}

// Function to remove item
function removeItem(id) {
    watchlist = watchlist.filter(item => item.id !== id);
    displayWatchlist();
}
const pickButton = document.getElementById('pick-for-me');
const resultDiv = document.getElementById('result');

pickButton.addEventListener('click', function() {
    // Filter out watched movies
    const unwatchedMovies = watchlist.filter(item => !item.watched);
    
    if (unwatchedMovies.length === 0) {
        resultDiv.innerHTML = '<p>You\'ve watched everything! Add more to your watchlist or mark some as unwatched.</p>';
        return;
    }
    
    // Pick random from unwatched only
    const randomIndex = Math.floor(Math.random() * unwatchedMovies.length);
    const picked = unwatchedMovies[randomIndex];
    
    resultDiv.innerHTML = `
        <h3>You should watch:</h3>
        <h2>${picked.title}</h2>
        <p>Type: ${picked.type} | Genre: ${picked.genre}</p>
    `;
});
// Function to toggle watched status
function toggleWatched(id) {
    const item = watchlist.find(item => item.id === id);
    if (item) {
        item.watched = !item.watched;
        displayWatchlist();
    }
}
function displayWatchlist() {
    watchlistContainer.innerHTML = '';
    
    watchlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'watchlist-item';
        
        if (item.watched) {
            itemDiv.classList.add('watched');
        }
        
        // Wrap content in a div
        itemDiv.innerHTML = `
            <div class="watchlist-item-content">
                <h3>${item.title} ${item.watched ? '✓' : ''}</h3>
                <p>Type: ${item.type}</p>
                <p>Genre: ${item.genre}</p>
                <button onclick="toggleWatched(${item.id})">
                    ${item.watched ? 'Unwatch' : 'Watched'}
                </button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
        watchlistContainer.appendChild(itemDiv);
    });
}
const API_KEY = CONFIG.TMDB_API_KEY;
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

