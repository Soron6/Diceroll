console.log('script.js loaded');

function initializePage() {
    console.log('Initializing page');
    
    // Load results
    if (typeof loadResultsFromLocalStorage === 'function') {
        console.log('Calling loadResultsFromLocalStorage');
        try {
            loadResultsFromLocalStorage();
        } catch (error) {
            console.error('Error in loadResultsFromLocalStorage:', error);
        }
    } else {
        console.error("loadResultsFromLocalStorage function not found");
    }

    // Load dark mode setting
    if (typeof loadDarkModeFromLocalStorage === 'function') {
        console.log('Calling loadDarkModeFromLocalStorage');
        try {
            loadDarkModeFromLocalStorage();
        } catch (error) {
            console.error('Error in loadDarkModeFromLocalStorage:', error);
        }
    } else {
        console.error("loadDarkModeFromLocalStorage function not found");
    }

    // Ensure dark mode toggle button works
    const darkModeButton = document.getElementById("darkModeButton");
    if (darkModeButton) {
        console.log('Adding event listener to dark mode button');
        darkModeButton.addEventListener('click', function() {
            console.log('Dark mode button clicked');
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode();
            } else {
                console.error("toggleDarkMode function not found");
            }
        });
    } else {
        console.error("Dark mode button not found");
    }

    // Ensure roll button works
    const rollButton = document.getElementById("rollButton");
    if (rollButton) {
        console.log('Adding event listener to roll button');
        rollButton.addEventListener('click', function() {
            console.log('Roll button clicked');
            if (typeof rollDiceAndDisplayResults === 'function') {
                rollDiceAndDisplayResults();
            } else {
                console.error("rollDiceAndDisplayResults function not found");
            }
        });
    } else {
        console.error("Roll button not found");
    }
    
    console.log("Page initialization complete");
}

// Call initializePage when the DOM is fully loaded
if (document.readyState === 'loading') {
    console.log('DOM not yet ready, adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    console.log('DOM already ready, calling initializePage immediately');
    initializePage();
}

console.log('script.js finished loading');
