import { mainWindow } from '../main'
import { shell, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'

export interface listChanges {
  oldName: string
  newName: string
}

export interface listChangesClient {
  atual_nome: string
  novo_nome: string
  deletar: string
}

export interface Props {
  // listFiles: listChanges[];
  folderPath: string
}

export async function generateFile(props: Props) {
  const { folderPath } = props

  fs.readdir(path.resolve(folderPath), async (err, files) => {
    // Se ocorrer erro ele reclama
    if (err) throw err
    const normalized: listChangesClient[] = []
    for (const file of files) {
      if (file) {
        const stat = await fs.promises.stat(path.resolve(folderPath, file))

        if (stat.isFile()) {
          normalized.push({
            atual_nome: file,
            novo_nome: '',
            deletar: '',
          })
        }
      }
    }

    const resultFilePath = dialog.showSaveDialogSync(
      mainWindow as Electron.BrowserWindow,
      {
        filters: [{ name: '', extensions: ['xls'] }],
      }
    )

    const newFile = xlsx.utils.book_new()
    const newAba = xlsx.utils.json_to_sheet(normalized)
    xlsx.utils.book_append_sheet(newFile, newAba, 'Plan1')

    if (resultFilePath !== undefined) {
      const split = resultFilePath.split('.')
      const nameFile =
        split[split.length - 1].toUpperCase() !== 'XLS'
          ? resultFilePath + '.xls'
          : resultFilePath

      xlsx.writeFile(newFile, nameFile)
      setTimeout(() => {
        shell.showItemInFolder(nameFile)
      }, 1000)
    }
  })
}
