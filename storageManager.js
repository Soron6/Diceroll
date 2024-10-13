console.log('storageManager.js loaded');

// Function to save an individual result to localStorage
function saveResultToLocalStorage(resultObj) {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(resultObj);
    localStorage.setItem("results", JSON.stringify(results));
    console.log("Results saved to localStorage:", results);
}

// Function to load all results from localStorage and display them
function loadResultsFromLocalStorage() {
    console.log("loadResultsFromLocalStorage called");
    let results = JSON.parse(localStorage.getItem("results")) || [];
    console.log("Loaded results from localStorage:", results);
    
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) {
        console.error("Results container not found");
        return;
    }
    
    console.log("Clearing results container");
    resultsContainer.innerHTML = "";
    
    if (results.length === 0) {
        console.log("No results to display");
        return;
    }
    
    console.log("Populating results");
    results.reverse().forEach((result, index) => {
        result.rollNumber = results.length - index;
        const resultCard = createResultCard(result);
        resultsContainer.appendChild(resultCard);
    });
    
    console.log("Results populated");

    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    } else {
        console.error("updateResultListeners function not found");
    }
}

// Function to save dark mode setting in localStorage
function saveDarkModeToLocalStorage() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    console.log("Dark mode saved to localStorage:", isDarkMode);
}

// Function to load dark mode setting from localStorage
function loadDarkModeFromLocalStorage() {
    console.log("loadDarkModeFromLocalStorage called");
    const darkMode = localStorage.getItem("darkMode");
    console.log("Loaded dark mode setting:", darkMode);
    if (darkMode === "true") {
        document.body.classList.add("dark-mode");
        document.querySelectorAll('.card, .result-card, .input-card').forEach(el => {
            el.classList.add("dark-mode");
        });
        console.log("Dark mode applied");
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    console.log('Toggling dark mode');
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll('.card, .result-card, .input-card').forEach(el => {
        el.classList.toggle("dark-mode");
    });
    saveDarkModeToLocalStorage();
    console.log('Dark mode toggled');
}

// Function to clear all results from localStorage
function clearResultsFromLocalStorage() {
    localStorage.removeItem("results");
    const resultsContainer = document.getElementById("results");
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
    console.log("All results cleared from localStorage and display");
}

// Ensure these functions are globally accessible
window.loadResultsFromLocalStorage = loadResultsFromLocalStorage;
window.loadDarkModeFromLocalStorage = loadDarkModeFromLocalStorage;
window.saveDarkModeToLocalStorage = saveDarkModeToLocalStorage;
window.saveResultToLocalStorage = saveResultToLocalStorage;
window.toggleDarkMode = toggleDarkMode;
window.clearResultsFromLocalStorage = clearResultsFromLocalStorage;

console.log('storageManager.js finished loading');
