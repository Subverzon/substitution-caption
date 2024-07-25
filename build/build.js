const electronInstaller = require('electron-winstaller');

// Installer settings
let settings = {
    appDirectory: './dist/subverzon-win32-x64',
    outputDirectory: './dist/installer',
    authors: 'SubVerzon',
    exe: 'subverzon.exe'
}

// Create windows installer with settings
resultPromise = electronInstaller.createWindowsInstaller(settings);

// Handle the result of the installer creation
resultPromise.then(() => {
    console.log('The installers of your application were successfully created !');
}, (e) => {
    console.log(`Well, there is no installer created: ${e.message}`);
});