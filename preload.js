const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pyix', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  exportBot: (code) => ipcRenderer.invoke('export-bot', code),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  loadConfig: () => ipcRenderer.invoke('load-config'),
  autoSave: (config) => ipcRenderer.invoke('auto-save', config),
  autoLoad: () => ipcRenderer.invoke('auto-load'),
  startBot: (code) => ipcRenderer.invoke('start-bot', code),
  stopBot: () => ipcRenderer.invoke('stop-bot'),
  onBotLog: (cb) => ipcRenderer.on('bot-log', (e, msg) => cb(msg)),
  onBotStopped: (cb) => ipcRenderer.on('bot-stopped', (e, code) => cb(code))
});
