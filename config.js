// Configuration and initialization
let isAction = true;

// Create an Audio object for the roll sound
const rollSound = new Audio('assets/roll.mp3');

// Set default value for variable input
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("variableInput").value = "3";

    // Ensure the variable input always has a valid value
    document.getElementById("variableInput").addEventListener("change", function() {
        if (this.value === "" || isNaN(parseInt(this.value))) {
            this.value = "3";
        }
    });

    document.getElementById("topicInput").value = '';
});
