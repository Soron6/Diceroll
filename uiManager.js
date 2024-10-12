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

function updateResultListeners() {
    const resultsContainer = document.getElementById("results");
    const resultCards = resultsContainer.querySelectorAll('.result-card');

    resultCards.forEach((card, index) => {
        card.removeEventListener('click', toggleResultsList);
        if (index === 0) {
            card.addEventListener('click', toggleResultsList);
        }
    });

    updateArrowIndicator();
}

function toggleResultsList() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.classList.toggle('expanded');
    updateArrowIndicator();
}

function updateArrowIndicator() {
    const resultsContainer = document.getElementById("results");
    const firstCard = resultsContainer.firstElementChild;
    if (firstCard) {
        if (resultsContainer.classList.contains('expanded')) {
            firstCard.setAttribute('title', 'Click to collapse');
        } else {
            firstCard.setAttribute('title', 'Click to expand');
        }
    }
}

// Toggle Dark Mode
document.getElementById("darkModeButton").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".input-card").classList.toggle("dark-mode");
    saveDarkModeToLocalStorage();
});

document.getElementById("rollButton").addEventListener("click", rollDiceAndDisplayResults);

// Function to clear results from localStorage
document.getElementById("clearButton").addEventListener("click", function() {
    document.getElementById("results").innerHTML = "";
    localStorage.removeItem("results");
    console.log("Results cleared from localStorage");
});
