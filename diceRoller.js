// Function to get the appropriate result image
function getResultImage(successType) {
    switch (successType) {
        case "Voller Erfolg": return 'assets/vollerErfolg.png';
        case "Teilerfolg": return 'assets/Teilerforg.png';
        case "Fehlschlag": return 'assets/Fehlschlag.png';
        default: return '';
    }
}

// Roll the dice and display results
function rollDiceAndDisplayResults() {
    console.log("Roll Dice button clicked");
    
    // Play the roll sound
    rollSound.play();
    
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
    resultDiv.classList.add("result-card");
    resultDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4>Wurf ${document.querySelectorAll(".result-card").length + 1} (${isAction ? 'Aktion' : 'Herausforderung'})</h4>
            <div class="images">
                <img src="${resultImage}" alt="${successType}">
                ${isEpic ? `<img src="assets/episch.png" alt="Episch">` : ''}
            </div>
        </div>
        ${topic ? `<p class="topic">Thema: ${topic}</p>` : ''}
        <p class="modifier"><strong>Modifier:</strong> ${modifier}</p>
        <p class="result"><strong>Ergebnis:</strong> ${successType}${isEpic ? ' (episch)' : ''}</p>
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

    const resultsContainer = document.getElementById("results");
    resultsContainer.insertBefore(resultDiv, resultsContainer.firstChild);

    updateResultListeners();

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
