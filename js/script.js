function initializePage() {
    // Load results
    if (typeof loadResultsFromLocalStorage === 'function') {
        try {
            loadResultsFromLocalStorage();
        } catch (error) {
            console.error('Error in loadResultsFromLocalStorage:', error);
        }
    }

    // Load dark mode setting
    if (typeof loadDarkModeFromLocalStorage === 'function') {
        try {
            loadDarkModeFromLocalStorage();
        } catch (error) {
            console.error('Error in loadDarkModeFromLocalStorage:', error);
        }
    }

    // Ensure dark mode toggle button works
    const darkModeButton = document.getElementById("darkModeButton");
    if (darkModeButton) {
        darkModeButton.addEventListener('click', function() {
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
        rollButton.addEventListener('click', function() {
            if (typeof rollDiceAndDisplayResults === 'function') {
                rollDiceAndDisplayResults();
            } else {
                console.error("rollDiceAndDisplayResults function not found");
            }
        });
    } else {
        console.error("Roll button not found");
    }

    // Ensure clear button works
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            if (typeof showConfirmMessage === 'function' && typeof clearResultsFromLocalStorage === 'function') {
                showConfirmMessage("Achtung:\nAlle Daten werden gelöscht.\nMöchten Sie wirklich fortfahren?", function() {
                    clearResultsFromLocalStorage();
                });
            } else {
                console.error("showConfirmMessage or clearResultsFromLocalStorage function not found");
            }
        });
    } else {
        console.error("Clear button not found");
    }
}

// Call initializePage when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
