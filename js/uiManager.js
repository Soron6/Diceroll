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
        } else {
            sidePanelIndicator.innerHTML = "&#9881;"; // "⚙" symbol
            sidePanelIndicator.title = "Open panel";
        }
    }

    // Initial update of side panel indicator
    updateSidePanelIndicator();

    // Event listener for Export CSV button
    document.getElementById("exportCsvButton").addEventListener("click", function() {
        if (typeof exportResultsToCsv === 'function') {
            exportResultsToCsv();
        } else {
            console.error("exportResultsToCsv function not found");
        }
    });

    // Event listener for Import CSV button
    document.getElementById("importCsvButton").addEventListener("click", function() {
        if (typeof importResultsFromCsv === 'function') {
            importResultsFromCsv();
        } else {
            console.error("importResultsFromCsv function not found");
        }
    });

    // Remove the event listener for Clear button from here
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
    applyDarkModeToCards(); // Apply dark mode to all cards
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

function showMessage(type, message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <span class="message-icon"></span>
        <span class="message-text">${message}</span>
        <span class="message-close">&times;</span>
    `;
    messageContainer.appendChild(messageElement);

    messageElement.querySelector('.message-close').addEventListener('click', () => {
        messageContainer.removeChild(messageElement);
    });

    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);

    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageContainer.removeChild(messageElement);
        }, 300);
    }, 5000);
}

function showConfirmMessage(message, onConfirm) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.className = 'message warning';
    messageElement.innerHTML = `
        <span class="message-icon"></span>
        <span class="message-text">${message}</span>
        <div class="message-buttons">
            <button class="confirm-button">Ja</button>
            <button class="cancel-button">Nein</button>
        </div>
    `;
    messageContainer.appendChild(messageElement);

    const confirmButton = messageElement.querySelector('.confirm-button');
    const cancelButton = messageElement.querySelector('.cancel-button');

    confirmButton.addEventListener('click', () => {
        onConfirm();
        messageContainer.removeChild(messageElement);
    });

    cancelButton.addEventListener('click', () => {
        messageContainer.removeChild(messageElement);
    });

    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
}

// Make these functions globally accessible
window.showMessage = showMessage;
window.showConfirmMessage = showConfirmMessage;
window.updateResultListeners = updateResultListeners;
