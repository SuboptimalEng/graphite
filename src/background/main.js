import { app, protocol, BrowserWindow } from 'electron';
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
import { ipcMain, Menu, dialog } from 'electron';
import * as directoryTree from 'directory-tree';
import * as glob from 'glob';
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

ipcMain.on('MOVE_FILE', (event, payload) => {
  console.log('moving file!!!');
  fs.renameSync(
    payload.file.path,
    `${payload.folderPath}/${payload.file.name}`
  );
  replyWithFileSystem(event, payload);
});

ipcMain.on('CREATE_FILE', (event, payload) => {
  let num = 1;
  let filePath = `${payload.root}/Untitled.md`;
  if (fs.existsSync(filePath)) {
    const fileName = `${payload.root}/Untitled`;
    while (fs.existsSync(`${fileName} ${num}.md`)) {
      num += 1;
    }
    filePath = `${fileName} ${num}.md`;
  }
  fs.writeFileSync(filePath, `untitled file ${num}!!!`);
  replyWithFileSystem(event, payload);
});

ipcMain.on('WRITE_FILE', (event, payload) => {
  fs.writeFileSync(payload.path, payload.markdown);
});

const replyWithFileSystem = (event, payload) => {
  const fileSystemGlob = glob.sync(`${payload.root}/**/*`);
  const fileSystem = directoryTree(
    payload.root,
    {
      // @TODO only display md files?
      // extensions: /\.md/,
    },
    (item, filePath, stats) => {
      // fileSystemGlob.push(filePath);
    }
  );

  event.reply('FILE_SYSTEM', { fileSystem, fileSystemGlob });
};

ipcMain.on('FILE_SYSTEM', (event, payload) => {
  replyWithFileSystem(event, payload);
});

ipcMain.on('RENAME_FILE', (event, payload) => {
  fs.renameSync(payload.oldFilePath, payload.newFilePath);
  replyWithFileSystem(event, payload);
});

ipcMain.on('FILE_CONTEXT_MENU', (event, payload) => {
  const template = [
    {
      label: 'Rename',
      click: () => {
        event.reply('RENAME_FILE', payload);
      },
    },
    {
      label: 'Delete',
      click: () => {
        // const buttonIdx = dialog.showMessageBoxSync(win, {
        const clickedButtonIdx = dialog.showMessageBoxSync({
          type: 'question',
          message: 'Are you sure you want to delete the file?',
          buttons: ['Yes', 'No'],
        });
        if (clickedButtonIdx === 0) {
          fs.unlinkSync(payload.filePath);
          replyWithFileSystem(event, payload);
        }
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
