document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let index; // Lunr index will be stored here

    // Load the search index from search_index.json
    fetch('search_index.json')
        .then(response => response.json())
        .then(data => {
            index = lunr.Index.load(data); // Load the index
        })
        .catch(error => {
            console.error('Error loading search index:', error);
        });


    // Function to perform the search
    function performSearch(query) {
        searchResults.innerHTML = ''; // Clear previous results

        if (!index) {
            searchResults.innerHTML = '<li>Search index not loaded yet.</li>';
            return;
        }

        if (!query || query.length < 2) {
            searchResults.innerHTML = '<li>Please enter at least 2 characters.</li>';
            return;
        }


        const results = index.search(query); // Perform the search

        if (results.length === 0) {
            searchResults.innerHTML = '<li>No results found.</li>';
        } else {
            results.forEach(function(result) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = result.ref; // URL from the index
                link.textContent = result.ref; // Or you could fetch the title from your pages.json
                listItem.appendChild(link);
                searchResults.appendChild(listItem);
            });
        }
    }

    // Event listener for the search input
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        performSearch(query);
    });
});
