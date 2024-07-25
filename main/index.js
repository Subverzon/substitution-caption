const electron = require('electron');
const path = require('path');
const url = require('url');
const ip = require('ip');
const event = require('./app.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const shell = electron.shell;
const ipAddress = ip.address();

// Disable hardware acceleration for better performance
app.disableHardwareAcceleration();

let mainWindow;

// Create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 445,
        frame: false,
        resizable: false,
        icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
        webPreferences: {
            pageVisibility: true,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, '../renderer/preload.js')
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Stop the server and quit the app after receiving the quit-app from renderer
    ipcMain.on('quit-app', (evt, arg) => {
        event.emit('stop-server');
        app.quit();
    });
    
    // Restart the app after receiving the restart-app from renderer
    ipcMain.on('restart-app', (evt, arg) => {
        event.emit('stop-server');
        app.relaunch();
        app.quit();
    });
    
    // Open the cg after receiving the open-cg from renderer
    ipcMain.on('open-cg', (evt, arg) => {
        event.emit('get-port', (port) => {
            shell.openExternal('http://'+ipAddress+':'+port+'/cg');
        })
    })
    
    // Open the panel after receiving the open-panel from renderer
    ipcMain.on('open-panel', (evt, arg) => {
        event.emit('get-port', (port) => {
            shell.openExternal('http://'+ipAddress+':'+port+'/');
        })
    })
    
    // Send the ready event to the renderer after the renderer is ready
    ipcMain.once('renderer-ready', (evt, arg) => {
        event.ready();
    });
    
    // Update the renderer with the access link after receiving the update-renderer event
    event.on('update-renderer', () => {
        event.emit('get-port', (port) => {
            const accessLink = 'http://'+ipAddress+':'+port+'/';
            mainWindow.webContents.send('update-renderer', {accessLink});
        });
    });
}

// Create the main window after the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Create the main window when the app is activated
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});

if (handleSquirrelEvent(app)) {
    return;
}

// Handle squirrel events for Windows
function handleSquirrelEvent(app) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    // Get the path to the Squirrel installer executable file
    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    // Spawn the Squirrel installer executable file
    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) {}

        return spawnedProcess;
    };

    // Spawn the Squirrel update executable file
    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    }

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);
        case '--squirrel-updated':
            return true;
        case '--squirrel-uninstall':
            // Remove desktop and start menu shortcuts and uninstall the app
            spawnUpdate(['--removeShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;
        case '--squirrel-obsolete':
            return true;
    }
}