// const { contextBridge, ipcRenderer } = require('electron');
import { contextBridge, ipcRenderer } from 'electron';

const validChannels = [
  'READ_FILE',
  'WRITE_FILE',
  'FILE_SYSTEM',
  'FILE_CONTEXT_MENU',
];

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, data) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      // Strip event as it includes `sender` and is a security risk
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args);
      });
    }
  },
});
