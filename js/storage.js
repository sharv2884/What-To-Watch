// Storage helper functions
const Storage = {
    // Get watchlist from localStorage
    getWatchlist() {
        const data = localStorage.getItem('watchlist');
        return data ? JSON.parse(data) : [];
    },
    
    // Save watchlist to localStorage
    saveWatchlist(watchlist) {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    },
    
    // Add item to watchlist
    addItem(item) {
        const watchlist = this.getWatchlist();
        watchlist.push(item);
        this.saveWatchlist(watchlist);
    },
    
    // Remove item from watchlist
    removeItem(id) {
        let watchlist = this.getWatchlist();
        watchlist = watchlist.filter(item => item.id !== id);
        this.saveWatchlist(watchlist);
    },
    
    // Toggle watched status
    toggleWatched(id) {
        const watchlist = this.getWatchlist();
        const item = watchlist.find(item => item.id === id);
        if (item) {
            item.watched = !item.watched;
            this.saveWatchlist(watchlist);
        }
    },
    
    // Get stats
    getStats() {
        const watchlist = this.getWatchlist();
        return {
            total: watchlist.length,
            watched: watchlist.filter(item => item.watched).length,
            unwatched: watchlist.filter(item => !item.watched).length
        };
    }
};