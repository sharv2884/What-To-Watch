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
const pickButton = document.getElementById('pick-for-me');
const resultDiv = document.getElementById('result');

pickButton.addEventListener('click', function() {
    if (watchlist.length === 0) {
        resultDiv.innerHTML = '<p>Your watchlist is empty! Add something first.</p>';
        return;
    }
    
    // Pick random item
    const randomIndex = Math.floor(Math.random() * watchlist.length);
    const picked = watchlist[randomIndex];
    
    resultDiv.innerHTML = `
        <h3>You should watch:</h3>
        <h2>${picked.title}</h2>
        <p>Type: ${picked.type} | Genre: ${picked.genre}</p>
    `;
});