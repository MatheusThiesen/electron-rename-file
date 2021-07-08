import { shell } from 'electron'
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
}

export interface Props {
  // listFiles: listChanges[];
  folderPath: string
}

export async function generateFile(props: Props) {
  const { folderPath } = props

  fs.readdir(path.resolve(folderPath), async (err, files) => {
    //Se ocorrer erro ele reclama
    if (err) throw err
    var normalized: listChangesClient[] = []
    for (const file of files) {
      if (file) {
        const stat = await fs.promises.stat(path.resolve(folderPath, file))

        if (stat.isFile()) {
          normalized.push({
            atual_nome: file,
            novo_nome: '',
          })
        }
      }
    }

    const nameFile = `Listagem-dos-arquivos.xlsx`

    let newFile = xlsx.utils.book_new()
    let newAba = xlsx.utils.json_to_sheet(normalized)
    xlsx.utils.book_append_sheet(newFile, newAba, 'Plan1')

    const pathFileCreate = path.resolve(folderPath, 'Arquivo', nameFile)
    fs.mkdir(path.resolve(folderPath, 'Arquivo'), () => {})
    xlsx.writeFile(newFile, pathFileCreate)
    setTimeout(() => {
      shell.showItemInFolder(pathFileCreate)
    }, 1000)
  })
}
