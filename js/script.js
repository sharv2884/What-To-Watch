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
        id: Date.now() // Simple unique ID
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
    // Clear container
    watchlistContainer.innerHTML = '';
    
    // Loop through watchlist and create HTML for each item
    watchlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'watchlist-item';
        itemDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>Type: ${item.type}</p>
            <p>Genre: ${item.genre}</p>
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