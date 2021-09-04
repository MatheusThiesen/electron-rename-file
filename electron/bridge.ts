import { contextBridge, ipcRenderer } from 'electron'
import * as alterFiles from './ipc/alterFiles'
import * as generateFile from './ipc/generateFile'
import * as deleteFiles from './ipc/deleteFiles'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  alterFiles: (props: alterFiles.Props) => {
    ipcRenderer.send('alter-files', props)
  },
  deleteFiles: (props: deleteFiles.Props) => {
    ipcRenderer.send('delete-files', props)
  },
  generateFile: (props: generateFile.Props) => {
    ipcRenderer.send('generate-file', props)
  },
  selectDirectory: () => {
    ipcRenderer.send('select-directory')
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)
