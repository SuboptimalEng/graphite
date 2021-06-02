import { app, protocol, BrowserWindow, Menu } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

import * as path from 'path';
async function createWindow() {
  // Create browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

/* ================================================================ */
/* ================================================================ */
import { ipcMain } from 'electron';
import * as dTree from 'directory-tree';
import * as fs from 'fs';

ipcMain.on('READ_FILE', (event, payload) => {
  if (fs.existsSync(payload.path)) {
    const content = fs.readFileSync(payload.path, {
      encoding: 'utf8',
      flag: 'r',
    });
    event.reply('READ_FILE', content);
  } else {
    event.reply('READ_FILE', '');
  }
});

ipcMain.on('WRITE_FILE', (event, payload) => {
  fs.writeFileSync(payload.path, payload.markdown);
});

ipcMain.on('FILE_SYSTEM', (event, payload) => {
  const directoryTree = dTree(`${payload.path}`);
  event.reply('FILE_SYSTEM', directoryTree);
});

ipcMain.on('FILE_CONTEXT_MENU', (event, path) => {
  const template = [
    {
      label: 'Rename',
      click: () => {
        console.log('renaming file!!!');
        event.reply('FILE_CONTEXT_MENU', 'renaming file');
      },
    },
    {
      label: 'Delete',
      click: () => {
        console.log('deleting file!!!');
        fs.unlinkSync(path);
        event.reply('FILE_CONTEXT_MENU', 'deleting file');

        let p = '/Users/suboptimaleng/Desktop/graphite';
        const directoryTree = dTree(p);
        event.reply('FILE_SYSTEM', directoryTree);
      },
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});
/* ================================================================ */
/* ================================================================ */

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
