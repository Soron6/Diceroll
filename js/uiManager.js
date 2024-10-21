document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("incrementButton").addEventListener("click", function() {
        const variableInput = document.getElementById("variableInput");
        let variable = parseInt(variableInput.value); 
        if (isNaN(variable)) variable = 3;
        variableInput.value = variable + 1;
    });

    document.getElementById("decrementButton").addEventListener("click", function() {
        const variableInput = document.getElementById("variableInput");
        let variable = parseInt(variableInput.value); 
        if (isNaN(variable)) variable = 3;
        if (variable > 0) variableInput.value = variable - 1;
    });

    document.getElementById("toggleButton").addEventListener("click", function() {
        isAction = !isAction;
        this.innerText = isAction ? "Aktion" : "Herausforderung";
    });

    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");

    sidePanelIndicator.addEventListener("click", function(event) {
        event.stopPropagation();
        toggleSidePanel();
    });

    document.addEventListener("click", function(event) {
        if (!sidePanel.contains(event.target) && !sidePanelIndicator.contains(event.target) && sidePanel.classList.contains("open")) {
            closeSidePanel();
        }
    });

    sidePanel.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    document.getElementById("exportCsvButton").addEventListener("click", function() {
        if (typeof exportResultsToCsv === 'function') {
            exportResultsToCsv();
        } else {
            console.error("exportResultsToCsv function not found");
        }
    });

    document.getElementById("importCsvButton").addEventListener("click", function() {
        if (typeof importResultsFromCsv === 'function') {
            importResultsFromCsv();
        } else {
            console.error("importResultsFromCsv function not found");
        }
    });

    document.getElementById("statisticsButton").addEventListener("click", function() {
        showStatisticsPopup();
    });
});

function toggleSidePanel() {
    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");
    sidePanel.classList.toggle("open");
    sidePanelIndicator.classList.toggle("open");
    updateSidePanelIndicator();
}

function closeSidePanel() {
    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");
    sidePanel.classList.remove("open");
    sidePanelIndicator.classList.remove("open");
    updateSidePanelIndicator();
}

function updateSidePanelIndicator() {
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");
    if (document.getElementById("sidePanel").classList.contains("open")) {
        sidePanelIndicator.innerHTML = "&#10005;";
        sidePanelIndicator.title = "Close panel";
    } else {
        sidePanelIndicator.innerHTML = "&#9881;";
        sidePanelIndicator.title = "Open panel";
    }
}

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
    applyDarkModeToCards();
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

function showDownloadMessage(type, message, downloadUrl, filename) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <span class="message-icon"></span>
        <span class="message-text">${message}</span>
        <a href="${downloadUrl}" download="${filename}" class="download-link">Download</a>
        <span class="message-close">&times;</span>
    `;
    messageContainer.appendChild(messageElement);

    const closeMessage = () => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageContainer.removeChild(messageElement);
        }, 300);
    };

    messageElement.querySelector('.message-close').addEventListener('click', closeMessage);

    messageElement.querySelector('.download-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(downloadUrl, '_blank');
        closeMessage();
    });

    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
}

function showStatisticsPopup() {
    closeSidePanel();

    const statisticsData = getStatistics();
    const total = statisticsData.vollerErfolg + statisticsData.teilerfolg + statisticsData.fehlschlag;

    const popup = document.createElement('div');
    popup.id = 'statisticsPopup';
    popup.innerHTML = `
        <h3>Statistiken</h3>
        <div id="statisticsContent">
            <p>Voller Erfolg: ${statisticsData.vollerErfolg} (${((statisticsData.vollerErfolg / total) * 100).toFixed(2)}%)</p>
            <p class="indent">episch: ${statisticsData.vollerErfolgEpic}</p>
            <p>Teilerfolg: ${statisticsData.teilerfolg} (${((statisticsData.teilerfolg / total) * 100).toFixed(2)}%)</p>
            <p>Fehlschlag: ${statisticsData.fehlschlag} (${((statisticsData.fehlschlag / total) * 100).toFixed(2)}%)</p>
            <p class="indent">episch: ${statisticsData.fehlschlagEpic}</p>
        </div>
        <div id="pieChartContainer">
            <canvas id="statisticsPieChart"></canvas>
        </div>
        <button id="closeStatisticsButton">OK</button>
    `;

    document.body.appendChild(popup);

    const ctx = document.getElementById('statisticsPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Voller Erfolg', 'Teilerfolg', 'Fehlschlag'],
            datasets: [{
                data: [statisticsData.vollerErfolg, statisticsData.teilerfolg, statisticsData.fehlschlag],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    document.getElementById('closeStatisticsButton').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

const styles = `
    .message {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-radius: 4px;
        margin-bottom: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 0.3s, transform 0.3s;
        max-width: 300px;
    }

    .message.show {
        opacity: 1;
        transform: translateX(0);
    }

    .message.info {
        background-color: #e3f2fd;
        color: #0d47a1;
    }

    .message.warning {
        background-color: #fff3e0;
        color: #e65100;
    }

    .message.error {
        background-color: #ffebee;
        color: #b71c1c;
    }

    .message.success {
        background-color: #e8f5e9;
        color: #1b5e20;
    }

    .message-icon {
        margin-right: 10px;
        font-size: 24px;
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .message-text {
        flex-grow: 1;
    }

    .message-close {
        cursor: pointer;
        margin-left: 10px;
        font-size: 18px;
    }

    .message-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .message-buttons button {
        margin-left: 10px;
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .confirm-button {
        background-color: #4caf50;
        color: white;
    }

    .cancel-button {
        background-color: #f44336;
        color: white;
    }

    .download-link {
        display: inline-block;
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 3px;
    }

    .download-link:hover {
        background-color: #45a049;
    }

    .dark-mode .message.info {
        background-color: #0d47a1;
        color: #e3f2fd;
    }

    .dark-mode .message.warning {
        background-color: #e65100;
        color: #fff3e0;
    }

    .dark-mode .message.error {
        background-color: #b71c1c;
        color: #ffebee;
    }

    .dark-mode .message.success {
        background-color: #1b5e20;
        color: #e8f5e9;
    }

    .dark-mode .download-link {
        background-color: #45a049;
    }

    .dark-mode .download-link:hover {
        background-color: #3d8b40;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

window.showMessage = showMessage;
window.showConfirmMessage = showConfirmMessage;
window.updateResultListeners = updateResultListeners;
window.showDownloadMessage = showDownloadMessage;
window.showStatisticsPopup = showStatisticsPopup;
window.closeSidePanel = closeSidePanel;
