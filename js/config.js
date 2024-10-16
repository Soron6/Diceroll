// Initial configuration settings
let isAction = true;

// Create an Audio object for the roll sound
const rollSound = new Audio('assets/roll.mp3');

// Set default values and add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default value for variable input
    document.getElementById("variableInput").value = "3";

    // Ensure the variable input always has a valid value
    document.getElementById("variableInput").addEventListener("change", function() {
        if (this.value === "" || isNaN(parseInt(this.value))) {
            this.value = "3";
        }
    });

    // Clear the topic input
    document.getElementById("topicInput").value = '';
});

// Global variable for sound setting
let soundEnabled = true;
