const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;
let botProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 650,
    minWidth: 820,
    minHeight: 500,
    frame: false,
    transparent: false,
    backgroundColor: '#0d0d0d',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'renderer', 'icon.ico')
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  // mainWindow.webContents.openDevTools(); // Uncomment to debug
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// ─── IPC Handlers ───

ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.close());

ipcMain.handle('export-bot', async (event, code) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Export Bot Code',
    defaultPath: 'bot.js',
    filters: [{ name: 'JavaScript', extensions: ['js'] }]
  });
  if (filePath) {
    fs.writeFileSync(filePath, code, 'utf-8');
    return { success: true, path: filePath };
  }
  return { success: false };
});

ipcMain.handle('save-config', async (event, config) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Bot Configuration',
    defaultPath: 'pyix-config.json',
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
  if (filePath) {
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true, path: filePath };
  }
  return { success: false };
});

ipcMain.handle('load-config', async () => {
  const { filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Load Bot Configuration',
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (filePaths && filePaths.length > 0) {
    const data = fs.readFileSync(filePaths[0], 'utf-8');
    return { success: true, config: JSON.parse(data) };
  }
  return { success: false };
});

// ─── Auto-Save / Auto-Load (persistent) ───
const autoSavePath = path.join(app.getPath('userData'), 'pyix-autosave.json');

ipcMain.handle('auto-save', async (event, config) => {
  try {
    fs.writeFileSync(autoSavePath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('auto-load', async () => {
  try {
    if (fs.existsSync(autoSavePath)) {
      const data = fs.readFileSync(autoSavePath, 'utf-8');
      return { success: true, config: JSON.parse(data) };
    }
    return { success: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// ─── Bot Process Management ───
ipcMain.handle('start-bot', async (event, code) => {
  if (botProcess) return { success: false, error: 'Bot is already running' };
  const projectDir = __dirname;
  const botFile = path.join(projectDir, '_pyix_bot.js');
  fs.writeFileSync(botFile, code, 'utf-8');
  try {
    botProcess = spawn('node', [botFile], { cwd: projectDir, stdio: ['pipe', 'pipe', 'pipe'] });
    botProcess.stdout.on('data', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('bot-log', data.toString());
    });
    botProcess.stderr.on('data', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('bot-log', '[ERROR] ' + data.toString());
    });
    botProcess.on('close', (exitCode) => {
      botProcess = null;
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('bot-stopped', exitCode);
    });
    botProcess.on('error', (err) => {
      botProcess = null;
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('bot-stopped', -1);
    });
    return { success: true };
  } catch (e) {
    botProcess = null;
    return { success: false, error: e.message };
  }
});

ipcMain.handle('stop-bot', async () => {
  if (!botProcess) return { success: false, error: 'Bot is not running' };
  const proc = botProcess;
  botProcess = null;
  // Write stop signal file — bot watches for this and calls client.destroy()
  const stopFile = path.join(__dirname, '_pyix_stop');
  try { fs.writeFileSync(stopFile, 'stop', 'utf-8'); } catch(e) {}
  // Force kill after 4s if graceful shutdown didn't work
  setTimeout(() => {
    try { proc.kill(); } catch(e) {}
    try { if (fs.existsSync(stopFile)) fs.unlinkSync(stopFile); } catch(e) {}
  }, 4000);
  return { success: true };
});

app.on('before-quit', () => {
  if (botProcess) botProcess.kill('SIGKILL');
});
