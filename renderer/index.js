// Send command to the main process to open the cg page
function openCG() {
    electron.send('open-cg');
}

// Send command to the main process to open the panel page
function openPanel() {
    electron.send('open-panel');
}

// Send command to the main process to restart the app
function restartApp() {
    electron.send('restart-app');
}

// Send command to the main process to quit the app
function quitApp() {
    electron.send('quit-app');
}

// Send command to the main process once the renderer is ready
electron.send('renderer-ready');

// Receive the access link from the main process and update the renderer
electron.receive('update-renderer', (arg) => {
    if (arg.accessLink) {
        document.getElementById('access-link').innerHTML = arg.accessLink;
    }
});