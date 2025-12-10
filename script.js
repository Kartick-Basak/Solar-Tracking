// Function to simulate fetching data from the IOT device
function fetchIOTData() {
    // In a real application, this would be an AJAX call (fetch or XMLHttpRequest)
    // to your server/broker (e.g., MQTT broker or REST API endpoint).
    
    // Simulation data:
    let azimuth = (Math.random() * 180).toFixed(1); // 0.0 to 180.0
    let altitude = (Math.random() * 90).toFixed(1);  // 0.0 to 90.0
    let intensity = Math.floor(Math.random() * (1023 - 500 + 1)) + 500; // 500 to 1023 (LDR value)
    
    // Simulate power based on intensity (higher intensity = higher power)
    let power = (intensity / 1023 * 50).toFixed(1); // Max 50W
    
    let status = document.getElementById('mode-select').value === 'auto' 
        ? (intensity > 900 ? "OPTIMAL" : "TRACKING...") 
        : "MANUAL MODE";

    // Update the DOM elements
    document.getElementById('currentAzimuth').textContent = azimuth + '°';
    document.getElementById('currentAltitude').textContent = altitude + '°';
    document.getElementById('solarIntensity').textContent = intensity;
    document.getElementById('powerOutput').textContent = power + ' W';
    document.getElementById('trackingStatus').textContent = status;
}

// Function to handle mode change (Auto/Manual)
function updateSystemMode(mode) {
    const manualControls = document.getElementById('manual-controls');
    const statusBox = document.querySelector('.status-box');
    
    if (mode === 'manual') {
        manualControls.style.display = 'block';
        statusBox.style.backgroundColor = '#f39c12'; // Yellow for manual
        displayControlMessage(`Mode set to **Manual**. Use the buttons to adjust.`);
    } else {
        manualControls.style.display = 'none';
        statusBox.style.backgroundColor = '#2ecc71'; // Green for auto
        displayControlMessage('Mode set to **Automatic Tracking**.');
    }
}

// Function to simulate sending a manual command
function sendManualCommand(direction) {
    // In a real system, this would send a command (e.g., POST request) to the IOT device.
    
    displayControlMessage(`Command Sent: Move ${direction.toUpperCase()}. Awaiting Confirmation...`, 'success');
    
    // Simulate a successful execution after a short delay
    setTimeout(() => {
        displayControlMessage(`Device Acknowledged: Moved ${direction.toUpperCase()}.`, 'success');
        fetchIOTData(); // Update data after manual movement
    }, 1500);
}

// Helper function to display a temporary message
function displayControlMessage(message, type = 'error') {
    const msgElement = document.getElementById('controlMessage');
    msgElement.innerHTML = message;
    msgElement.style.color = type === 'success' ? '#27ae60' : '#e74c3c';
    
    // Clear message after 5 seconds
    setTimeout(() => {
        msgElement.textContent = '';
    }, 5000);
}

// --- Initialization ---

// 1. Initial Load of Data
fetchIOTData(); 
// Ensure the initial state of the manual controls is correct
updateSystemMode(document.getElementById('mode-select').value);

// 2. Set up the real-time update loop (every 3 seconds)
setInterval(fetchIOTData, 3000);