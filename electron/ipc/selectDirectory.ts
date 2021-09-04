import { dialog } from 'electron'
import { mainWindow } from '../main'

export async function selectDirectory() {
  const result = await dialog.showOpenDialog(
    mainWindow as Electron.BrowserWindow,
    {
      properties: ['openDirectory'],
    }
  )

  return result
}
