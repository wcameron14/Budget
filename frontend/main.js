const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      nodeIntegration: true, // Allow Node.js integration in the Renderer process
      contextIsolation: false // Disable context isolation
    }
  });

  // Load your index.html file into the window
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools (optional, helps with debugging)
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Use this function when processing new transactions
// For example:
function processNewTransactions(newTransactions) {
  // Fetch existing transactions to use as history
  fetch('/api/transactions')
      .then(response => response.json())
      .then(history => {
          return categorizeTransactions(newTransactions, history);
      })
      .then(categorizedTransactions => {
          // Update UI with categorized transactions
          updateTransactionList(categorizedTransactions);
          renderFlaggedTransactions();
      });
}