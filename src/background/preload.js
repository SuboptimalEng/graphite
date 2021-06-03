// const { contextBridge, ipcRenderer } = require('electron');
import { contextBridge, ipcRenderer } from 'electron';

const validSendChannels = [
  'READ_FILE',
  'WRITE_FILE',
  'CREATE_FILE',
  'RENAME_FILE',
  'FILE_SYSTEM',
  'FILE_CONTEXT_MENU',
];

const validOnChannels = [
  'READ_FILE',
  'WRITE_FILE',
  'FILE_SYSTEM',
  'RENAME_FILE',
];

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, func) => {
    if (validOnChannels.includes(channel)) {
      // Strip event as it includes `sender` and is a security risk
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args);
      });
    }
  },
});
