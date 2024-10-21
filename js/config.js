// Initial configuration settings
let isAction = true;

// Create Audio objects for all sounds
const rollSound = new Audio('assets/roll.mp3');
const vollerErfolgSound = new Audio('assets/de/VollerErfolg.mp3');
const teilerfolgSound = new Audio('assets/de/Teilerfolg.mp3');
const fehlschlagSound = new Audio('assets/de/Fehlschlag.mp3');
const epischSound = new Audio('assets/de/episch.mp3');

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

// Function to update sound enabled status
function updateSoundEnabled(enabled) {
    soundEnabled = enabled;
    // Update UI if necessary
    const soundToggleButton = document.getElementById("soundToggleButton");
    if (soundToggleButton) {
        soundToggleButton.textContent = soundEnabled ? "Sound: An" : "Sound: Aus";
        soundToggleButton.classList.toggle('sound-disabled', !soundEnabled);
    }
}

// Make updateSoundEnabled function globally accessible
window.updateSoundEnabled = updateSoundEnabled;
