document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let index; // Lunr index will be stored here
    let indexLoaded = false; // Flag to indicate if the index is loaded

    // Display a loading message
    searchResults.innerHTML = '<li>Loading search index...</li>';

    // Load the search index from search_index.json
    fetch('search_index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            index = lunr.Index.load(data); // Load the index
            indexLoaded = true; // Set the flag to true
            searchResults.innerHTML = ''; // Clear loading message
            console.log('Search index loaded successfully.');
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            searchResults.innerHTML = '<li>Error loading search index. Please check the console.</li>';
        });


    // Function to perform the search
    function performSearch(query) {
        searchResults.innerHTML = ''; // Clear previous results

        if (!indexLoaded) {
            searchResults.innerHTML = '<li>Search index not loaded yet. Please wait.</li>';
            return;
        }

        if (!query || query.length < 2) {
            searchResults.innerHTML = '<li>Please enter at least 2 characters.</li>';
        }