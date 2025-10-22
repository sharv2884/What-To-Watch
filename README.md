# What to Watch?

A movie and TV show watchlist manager that helps you decide what to watch next.

## Features
- 🔍 Search movies/TV shows using TMDB API
- ➕ Add items to watchlist with real posters
- ✅ Mark items as watched
- 🎲 Random picker when you can't decide
- 💾 LocalStorage for data persistence

## Tech Stack
- Vanilla JavaScript (ES6+)
- TMDB API for movie data
- CSS3 with custom styling
- LocalStorage for client-side persistence

## Setup
1. Get TMDB API key: https://www.themoviedb.org/settings/api
2. Create `js/config.js`:
```javascript
   const CONFIG = {
       TMDB_API_KEY: 'your_api_key_here'
   };
```
3. Open `index.html` in browser
