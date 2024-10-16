document.addEventListener('DOMContentLoaded', function() {
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

    // Side Panel Toggle
    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");

    sidePanelIndicator.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        toggleSidePanel();
    });

    // Close side panel when clicking outside
    document.addEventListener("click", function(event) {
        if (!sidePanel.contains(event.target) && !sidePanelIndicator.contains(event.target) && sidePanel.classList.contains("open")) {
            closeSidePanel();
        }
    });

    // Prevent clicks inside the side panel from closing it
    sidePanel.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    // Function to toggle side panel
    function toggleSidePanel() {
        sidePanel.classList.toggle("open");
        sidePanelIndicator.classList.toggle("open");
        updateSidePanelIndicator();
    }

    // Function to close side panel
    function closeSidePanel() {
        sidePanel.classList.remove("open");
        sidePanelIndicator.classList.remove("open");
        updateSidePanelIndicator();
    }

    // Function to update side panel indicator
    function updateSidePanelIndicator() {
        if (sidePanel.classList.contains("open")) {
            sidePanelIndicator.innerHTML = "&#10005;"; // "×" symbol
            sidePanelIndicator.title = "Close panel";
            // The positioning is now handled by CSS
        } else {
            sidePanelIndicator.innerHTML = "&#9881;"; // "⚙" symbol
            sidePanelIndicator.title = "Open panel";
            // The positioning is now handled by CSS
        }
    }

    // Initial update of side panel indicator
    updateSidePanelIndicator();
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
