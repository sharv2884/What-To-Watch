# What to Watch - Decision Helper

Stop wasting time deciding what to watch. Let this app decide for you!

## The Problem
You have too many movies and shows on your watchlist and can't decide what to watch.

## The Solution
Add your watchlist using TMDB movie search, and let the app randomly pick something for you.

## Features
- ✅ Search movies/TV shows with TMDB API
- ✅ Display watchlist with real posters
- ✅ Random picker that decides for you
- ✅ Mark as watched
- ⏳ Filter by genre/mood (coming soon)
- ⏳ User ratings and recommendations (coming soon)

## Tech Stack
- Frontend: HTML, CSS, Vanilla JavaScript
- API: TMDB (The Movie Database)
- Backend: Node.js + Express (coming soon)
- Database: MongoDB (coming soon)

## Setup

1. Clone the repository
2. Get a TMDB API key from [here](https://www.themoviedb.org/settings/api)
3. Create `js/config.js` and add your API key:
   ```javascript
   const CONFIG = {
       TMDB_API_KEY: 'your_api_key_here'
   };
   ```
4. Open `index.html` in your browser

## Development Log
- **Week 1**: Project setup, basic HTML structure
- **Week 2**: TMDB API integration, search functionality, watchlist display
- **Current**: Working on UI improvements and additional features