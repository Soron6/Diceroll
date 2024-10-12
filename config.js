// Configuration and initialization
let isAction = true;

// Create an Audio object for the roll sound
const rollSound = new Audio('assets/roll.mp3');

// Load stored values from localStorage when the page loads
window.onload = function() {
    console.log("Page loaded, loading results from localStorage...");
    loadResultsFromLocalStorage();
    loadDarkModeFromLocalStorage();
    document.getElementById("topicInput").value = '';
};

// Set default value for variable input
document.getElementById("variableInput").value = "3";

// Ensure the variable input always has a valid value
document.getElementById("variableInput").addEventListener("change", function() {
    if (this.value === "" || isNaN(parseInt(this.value))) {
        this.value = "3";
    }
});
