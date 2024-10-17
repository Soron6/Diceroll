// Function to save an individual result to localStorage
function saveResultToLocalStorage(resultObj) {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(resultObj);
    localStorage.setItem("results", JSON.stringify(results));
}

// Function to load all results from localStorage and display them
function loadResultsFromLocalStorage() {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) {
        console.error("Results container not found");
        return;
    }
    
    resultsContainer.innerHTML = "";
    
    if (results.length === 0) {
        return;
    }
    
    results.reverse().forEach((result, index) => {
        result.rollNumber = results.length - index;
        const resultCard = createResultCard(result);
        resultsContainer.appendChild(resultCard);
    });

    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    } else {
        console.error("updateResultListeners function not found");
    }

    // Apply dark mode to result cards if necessary
    applyDarkModeToCards();
}

// Function to save dark mode setting in localStorage
function saveDarkModeToLocalStorage() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

// Function to load dark mode setting from localStorage
function loadDarkModeFromLocalStorage() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
        document.body.classList.add("dark-mode");
        applyDarkModeToCards();
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    applyDarkModeToCards();
    saveDarkModeToLocalStorage();
}

// Function to apply dark mode to all cards
function applyDarkModeToCards() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    document.querySelectorAll('.card, .result-card, .input-card').forEach(el => {
        if (isDarkMode) {
            el.classList.add("dark-mode");
        } else {
            el.classList.remove("dark-mode");
        }
    });
}

// Function to clear all results from localStorage
function clearResultsFromLocalStorage() {
    localStorage.removeItem("results");
    const resultsContainer = document.getElementById("results");
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    }
}

// Function to export results to CSV
function exportResultsToCsv() {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    if (results.length === 0) {
        showMessage('info', 'Keine Ergebnisse zum Exportieren vorhanden.');
        return;
    }

    let csvContent = "Roll Number,Action/Challenge,Topic,Success Type,Epic,D6,D10_1,D10_2,Result,Modifier,Timestamp\n";

    results.forEach((result, index) => {
        const row = [
            results.length - index,
            result.isAction ? "Action" : "Challenge",
            result.topic,
            result.successType,
            result.isEpic,
            result.d6,
            result.d10_1,
            result.d10_2,
            result.result,
            result.modifier,
            result.timestamp
        ];
        csvContent += row.join(",") + "\n";
    });

    // Check if running in Median environment
    if (navigator.userAgent.indexOf('median') > -1) {
        // Generate a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Use Median JavaScript Bridge to download the file
        median.share.downloadFile({
            url: url,
            open: false // Set to true if you want to open the file after download
        });
    } else {
        // Fallback for non-Median environments (e.g., web browsers)
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "iron_dice_roller_results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Function to import results from CSV
function importResultsFromCsv() {
    showConfirmMessage('Achtung:\nBestehende Daten werden überschrieben.\nMöchten Sie wirklich fortfahren?', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';

        input.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const content = e.target.result;
                const lines = content.split('\n');
                const results = [];

                // Skip the header row
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim() === '') continue;
                    const values = lines[i].split(',');
                    const result = {
                        isAction: values[1] === "Action",
                        topic: values[2],
                        successType: values[3],
                        isEpic: values[4] === "true",
                        d6: parseInt(values[5]),
                        d10_1: parseInt(values[6]),
                        d10_2: parseInt(values[7]),
                        result: parseInt(values[8]),
                        modifier: parseInt(values[9]),
                        timestamp: values[10],
                        resultImage: getResultImage(values[3])
                    };
                    results.push(result);
                }

                // Save imported results to localStorage
                localStorage.setItem("results", JSON.stringify(results));

                // Reload and display the imported results
                loadResultsFromLocalStorage();

                showMessage('success', 'Ergebnisse erfolgreich importiert!');
            };

            reader.readAsText(file);
        };

        input.click();
    });
}

// Function to save sound setting to localStorage
function saveSoundSettingToLocalStorage(isEnabled) {
    localStorage.setItem("soundEnabled", isEnabled);
}

// Function to load sound setting from localStorage
function loadSoundSettingFromLocalStorage() {
    const soundEnabled = localStorage.getItem("soundEnabled");
    return soundEnabled === null ? true : soundEnabled === "true";
}

// Helper function to get the appropriate result image
function getResultImage(successType) {
    switch (successType) {
        case "Voller Erfolg": return 'assets/vollerErfolg.png';
        case "Teilerfolg": return 'assets/Teilerforg.png';
        case "Fehlschlag": return 'assets/Fehlschlag.png';
        default: return '';
    }
}

// Ensure these functions are globally accessible
window.loadResultsFromLocalStorage = loadResultsFromLocalStorage;
window.loadDarkModeFromLocalStorage = loadDarkModeFromLocalStorage;
window.saveDarkModeToLocalStorage = saveDarkModeToLocalStorage;
window.saveResultToLocalStorage = saveResultToLocalStorage;
window.toggleDarkMode = toggleDarkMode;
window.clearResultsFromLocalStorage = clearResultsFromLocalStorage;
window.exportResultsToCsv = exportResultsToCsv;
window.importResultsFromCsv = importResultsFromCsv;
window.saveSoundSettingToLocalStorage = saveSoundSettingToLocalStorage;
window.loadSoundSettingFromLocalStorage = loadSoundSettingFromLocalStorage;
