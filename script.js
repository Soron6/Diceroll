let isAction = true;

// Load stored values from localStorage when the page loads
window.onload = function() {
    console.log("Page loaded, loading results from localStorage...");
    loadResultsFromLocalStorage();
    loadDarkModeFromLocalStorage();
    document.getElementById("topicInput").value = '';
};

// Function to increment the variable
document.getElementById("incrementButton").addEventListener("click", function() {
    const variableInput = document.getElementById("variableInput");
    let variable = parseInt(variableInput.value); 
    if (isNaN(variable)) variable = 3;
    variableInput.value = variable + 1;
});

// Function to decrement the variable
document.getElementById("decrementButton").addEventListener("click", function() {
    const variableInput = document.getElementById("variableInput");
    let variable = parseInt(variableInput.value); 
    if (isNaN(variable)) variable = 3;
    if (variable > 0) variableInput.value = variable - 1;
});

// Toggle between "Action" and "Challenge"
document.getElementById("toggleButton").addEventListener("click", function() {
    isAction = !isAction;
    this.innerText = isAction ? "Aktion" : "Herausforderung";
    console.log("Toggle button clicked. isAction:", isAction);
});

// Function to get the appropriate result image
function getResultImage(successType) {
    switch (successType) {
        case "Voller Erfolg": return 'vollerErfolg.png';
        case "Teilerfolg": return 'Teilerforg.png';
        case "Fehlschlag": return 'Fehlschlag.png';
        default: return '';
    }
}

// Roll the dice and display results
function rollDiceAndDisplayResults() {
    console.log("Roll Dice button clicked");
    const variableInput = document.getElementById("variableInput");
    const topicInput = document.getElementById("topicInput");
    const variable = parseInt(variableInput.value); 
    const topic = topicInput.value.trim();

    if (isNaN(variable)) {
        alert("Please enter a valid number for the variable.");
        return;
    }

    const modifier = variable;
    const d6 = isAction ? Math.ceil(Math.random() * 6) : 0;
    const d10_1 = Math.ceil(Math.random() * 10);
    const d10_2 = Math.ceil(Math.random() * 10);

    let result = isAction ? Math.min(d6 + modifier, 10) : modifier;
    let successType = "";
    let isEpic = (d10_1 === d10_2);

    if (result > d10_1 && result > d10_2) successType = "Voller Erfolg";
    else if (result > d10_1 || result > d10_2) successType = "Teilerfolg";
    else successType = "Fehlschlag";

    const resultImage = getResultImage(successType);

    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `
        <hr>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4>Wurf ${document.querySelectorAll(".result").length + 1} (${isAction ? 'Aktion' : 'Herausforderung'})</h4>
            <div>
                <img src="${resultImage}" alt="${successType}" style="width: 24px; height: 24px; vertical-align: middle;">
                ${isEpic ? `<img src="episch.png" alt="Episch" style="width: 24px; height: 24px; vertical-align: middle; margin-left: 5px;">` : ''}
            </div>
        </div>
        ${topic ? `<p><i>Thema: ${topic}</i></p>` : ''}
        <p><strong>Modifier:</strong> ${modifier}</p>
        <p><strong>Ergebnis:</strong> ${successType}${isEpic ? ' (episch)' : ''}</p>
        <table>
            <tr>
                <th>D6</th>
                <th>D10 (1)</th>
                <th>D10 (2)</th>
            </tr>
            <tr>
                <td>${isAction ? `<strong>${d6}</strong>` : '-'}</td>
                <td>${result > d10_1 ? `<s>${d10_1}</s>` : d10_1}</td>
                <td>${result > d10_2 ? `<s>${d10_2}</s>` : d10_2}</td>
            </tr>
        </table>
    `;
    resultDiv.classList.add("result");

    const resultsContainer = document.getElementById("results");
    resultsContainer.insertBefore(resultDiv, resultsContainer.firstChild);

    saveResultToLocalStorage({
        modifier, result, d6, d10_1, d10_2, successType, isAction, resultImage, isEpic, topic
    });

    topicInput.value = '';

    animateDice(isAction, d6, d10_1, d10_2);
}

function animateDice(isAction, d6, d10_1, d10_2) {
    const d6Element = document.getElementById("d6Animation");
    const d10_1Element = document.getElementById("d10Animation1");
    const d10_2Element = document.getElementById("d10Animation2");

    d6Element.style.visibility = isAction ? "visible" : "hidden";
    [d6Element, d10_1Element, d10_2Element].forEach(el => {
        el.querySelector('.resultText').textContent = '';
        el.classList.add("rollingAnimation");
    });

    setTimeout(() => {
        [d6Element, d10_1Element, d10_2Element].forEach(el => el.classList.remove("rollingAnimation"));
        if (isAction) d6Element.querySelector('.resultText').textContent = d6;
        d10_1Element.querySelector('.resultText').textContent = d10_1;
        d10_2Element.querySelector('.resultText').textContent = d10_2;
    }, 1000);
}

document.getElementById("rollButton").addEventListener("click", rollDiceAndDisplayResults);

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
        resultDiv.innerHTML = `
            <hr>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4>Wurf ${results.length - index} (${result.isAction ? 'Aktion' : 'Herausforderung'})</h4>
                <div>
                    <img src="${result.resultImage}" alt="${result.successType}" style="width: 24px; height: 24px; vertical-align: middle;">
                    ${result.isEpic ? `<img src="episch.png" alt="Episch" style="width: 24px; height: 24px; vertical-align: middle; margin-left: 5px;">` : ''}
                </div>
            </div>
            ${result.topic ? `<p><i>Thema: ${result.topic}</i></p>` : ''}
            <p><strong>Modifier:</strong> ${result.modifier}</p>
            <p><strong>Ergebnis:</strong> ${result.successType}</p>
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
        resultDiv.classList.add("result");
        resultsContainer.appendChild(resultDiv);
    });
}

// Function to clear results from localStorage
document.getElementById("clearButton").addEventListener("click", function() {
    document.getElementById("results").innerHTML = "";
    localStorage.removeItem("results");
    console.log("Results cleared from localStorage");
});

// Toggle Dark Mode
document.getElementById("darkModeButton").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    saveDarkModeToLocalStorage();
});

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
    }
    console.log("Dark mode loaded from localStorage:", darkMode);
}

// Set default value for variable input
document.getElementById("variableInput").value = "3";

// Ensure the variable input always has a valid value
document.getElementById("variableInput").addEventListener("change", function() {
    if (this.value === "" || isNaN(parseInt(this.value))) {
        this.value = "3";
    }
});
