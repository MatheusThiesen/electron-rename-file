import { shell } from 'electron'
import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'

import * as generateFile from './generateFile'

export interface listChanges {
  oldName: string
  newName: string
}

export interface Props {
  folderXlsx: string
  folderPath: string
  folderName: string
  folderDestiny: string
  // listChanges: listChanges[]
}

function xlsxToJson(pathXlsx: string) {
  const file = xlsx.readFile(path.resolve(pathXlsx), { cellDates: true })
  const aba = file.Sheets[file.SheetNames[0]]
  const data: generateFile.listChangesClient[] = xlsx.utils.sheet_to_json(aba)

  return data
}

export async function alterFiles(props: Props) {
  const { folderPath, folderName, folderDestiny, folderXlsx } = props

  const listChanges = xlsxToJson(folderXlsx)

  fs.readdir(path.resolve(folderPath), async (err, files) => {
    //Se ocorrer erro ele reclama
    if (err) throw err
    //Criar uma pasta para copiar arquivos renomeados
    fs.mkdir(path.resolve(folderDestiny, folderName), () => {})
    //Caminho da pasta
    const pathDestiny = path.resolve(folderDestiny, folderName)

    //Percorre a todos arquivos da pasta
    for (const file of files) {
      //Filtra o arquivo conforme lista de alterações
      const selectFile = listChanges.filter(item => item.atual_nome === file)
      //Se exister realiza a copia renomenando o arquivo
      if (
        selectFile[0] &&
        selectFile[0].novo_nome &&
        selectFile[0].novo_nome !== undefined &&
        selectFile[0].novo_nome !== ''
      ) {
        fs.promises
          .copyFile(
            path.resolve(folderPath, file),
            path.resolve(pathDestiny, selectFile[0].novo_nome)
          )
          .then()
      }
    }

    setTimeout(() => {
      shell.openPath(pathDestiny)
    }, 1000)
  })
}
