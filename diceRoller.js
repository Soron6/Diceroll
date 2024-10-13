console.log('diceRoller.js loaded');

// Only declare rollSound if it hasn't been declared before
if (typeof rollSound === 'undefined') {
    const rollSound = new Audio('assets/roll.mp3');
}

// Function to get the appropriate result image
function getResultImage(successType) {
    switch (successType) {
        case "Voller Erfolg": return 'assets/vollerErfolg.png';
        case "Teilerfolg": return 'assets/Teilerforg.png';
        case "Fehlschlag": return 'assets/Fehlschlag.png';
        default: return '';
    }
}

// Function to format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid Date";
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Function to create a result card
function createResultCard(result) {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result-card");
    
    const isD10Beaten = (diceValue, result) => result > diceValue ? 'beaten' : 'not-beaten';
    
    // Calculate the modifier result, capped at 10
    const modifierResult = Math.min(result.isAction ? result.modifier + result.d6 : result.modifier, 10);
    
    resultDiv.innerHTML = `
        <h4>Wurf ${result.rollNumber} (${result.isAction ? 'Aktion' : 'Herausforderung'})</h4>
        <div class="icons">
            <img src="${result.resultImage}" alt="${result.successType}">
            ${result.isEpic ? `<img src="assets/episch.png" alt="Episch">` : ''}
        </div>
        <div class="topic">${result.topic}</div>
        <div class="result">${result.successType}${result.isEpic ? ' (episch)' : ''}</div>
        <div class="modifier">Modifier: <span class="modifier-value">+${result.modifier}</span> <span class="modifier-result">(=${modifierResult})</span></div>
        <div class="dice-results">
            <div class="dice d6">
                <div class="dice-symbol">&#9856;</div>
                <div class="dice-value">${result.isAction ? result.d6 : '-'}</div>
            </div>
            <div class="dice d10">
                <div class="dice-symbol">&#9861;</div>
                <div class="dice-value ${isD10Beaten(result.d10_1, result.result)}">${result.d10_1}</div>
            </div>
            <div class="dice d10">
                <div class="dice-symbol">&#9861;</div>
                <div class="dice-value ${isD10Beaten(result.d10_2, result.result)}">${result.d10_2}</div>
            </div>
        </div>
        <div class="timestamp">${formatDateTime(result.timestamp)}</div>
    `;
    
    return resultDiv;
}

// Roll the dice and display results
function rollDiceAndDisplayResults() {
    console.log("Roll Dice function called");
    
    // Play the roll sound
    if (typeof rollSound !== 'undefined') {
        rollSound.play().catch(error => console.error("Error playing sound:", error));
    }
    
    const variableInput = document.getElementById("variableInput");
    const topicInput = document.getElementById("topicInput");
    const variable = parseInt(variableInput.value); 
    const topic = topicInput.value.trim();
    const isAction = document.getElementById("toggleButton").innerText === "Aktion";

    if (isNaN(variable)) {
        alert("Please enter a valid number for the variable.");
        return;
    }

    const modifier = variable;
    const d6 = isAction ? Math.ceil(Math.random() * 6) : 0;
    const d10_1 = Math.ceil(Math.random() * 10);
    const d10_2 = Math.ceil(Math.random() * 10);

    // Calculate result, capped at 10
    let result = Math.min(isAction ? d6 + modifier : modifier, 10);
    let successType = "";
    let isEpic = (d10_1 === d10_2);

    if (result > d10_1 && result > d10_2) successType = "Voller Erfolg";
    else if (result > d10_1 || result > d10_2) successType = "Teilerfolg";
    else successType = "Fehlschlag";

    const resultImage = getResultImage(successType);
    const timestamp = new Date().toISOString();

    const resultObj = {
        isAction,
        topic,
        successType,
        isEpic,
        d6,
        d10_1,
        d10_2,
        result,
        modifier,
        timestamp,
        resultImage
    };

    saveResultToLocalStorage(resultObj);
    displayLatestResult(resultObj);

    topicInput.value = '';

    animateDice(isAction, d6, d10_1, d10_2);
}

function displayLatestResult(result) {
    const resultsContainer = document.getElementById("results");
    result.rollNumber = document.querySelectorAll(".result-card").length + 1;
    const resultCard = createResultCard(result);
    resultsContainer.insertBefore(resultCard, resultsContainer.firstChild);

    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    } else {
        console.error("updateResultListeners function not found");
    }
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

// Make functions globally accessible
window.rollDiceAndDisplayResults = rollDiceAndDisplayResults;
window.formatDateTime = formatDateTime;
window.createResultCard = createResultCard;

console.log('diceRoller.js finished loading');
