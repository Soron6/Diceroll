// Function to save an individual result to localStorage
function saveResultToLocalStorage(resultObj) {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(resultObj);
    localStorage.setItem("results", JSON.stringify(results));
    console.log("Results saved to localStorage:", results);
}

// Function to load all results from localStorage and display them
function loadResultsFromLocalStorage() {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    results.reverse().forEach((result, index) => {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result-card");
        resultDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4>Wurf ${results.length - index} (${result.isAction ? 'Aktion' : 'Herausforderung'})</h4>
                <div class="images">
                    <img src="${result.resultImage}" alt="${result.successType}">
                    ${result.isEpic ? `<img src="assets/episch.png" alt="Episch">` : ''}
                </div>
            </div>
            ${result.topic ? `<p class="topic">Thema: ${result.topic}</p>` : ''}
            <p class="modifier"><strong>Modifier:</strong> ${result.modifier}</p>
            <p class="result"><strong>Ergebnis:</strong> ${result.successType}${result.isEpic ? ' (episch)' : ''}</p>
            <table>
                <tr>
                    <th>D6</th>
                    <th>D10 (1)</th>
                    <th>D10 (2)</th>
                </tr>
                <tr>
                    <td>${result.isAction ? `<strong>${result.d6}</strong>` : '-'}</td>
                    <td>${result.result > result.d10_1 ? `<s>${result.d10_1}</s>` : result.d10_1}</td>
                    <td>${result.result > result.d10_2 ? `<s>${result.d10_2}</s>` : result.d10_2}</td>
                </tr>
            </table>
        `;
        resultsContainer.appendChild(resultDiv);
    });

    updateResultListeners();
}

// Function to save dark mode setting in localStorage
function saveDarkModeToLocalStorage() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    console.log("Dark mode saved to localStorage:", isDarkMode);
}

// Function to load dark mode setting from localStorage
function loadDarkModeFromLocalStorage() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
        document.body.classList.add("dark-mode");
        document.querySelector(".input-card").classList.add("dark-mode");
    }
    console.log("Dark mode loaded from localStorage:", darkMode);
}
