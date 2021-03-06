import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { alterFiles } from './ipc/alterFiles'
import { generateFile } from './ipc/generateFile'
import { deleteFiles } from './ipc/deleteFiles'
import { selectDirectory } from './ipc/selectDirectory'

export let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join('assets', 'icon.png'),
    width: 750,
    height: 535,
    minWidth: 600,
    minHeight: 535,
    // frame: false,
    transparent: true,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  ipcMain.on('select-directory', async event => {
    const result = await selectDirectory()
    event.reply('selected-directory', result.filePaths[0])
  })

  ipcMain.on('alter-files', (_, props) => {
    alterFiles(props)
      .then(() => console.log('Alterado'))
      .catch(e => console.log(e))
  })
  ipcMain.on('generate-file', (_, props) => {
    generateFile(props)
      .then(() => console.log('Gerado'))
      .catch(e => console.log(e))
  })
  ipcMain.on('delete-files', (_, props) => {
    deleteFiles(props)
      .then(() => console.log('Gerado'))
      .catch(e => console.log(e))
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
