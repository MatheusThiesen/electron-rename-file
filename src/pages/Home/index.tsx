// import { ipcRenderer, contextBridge } from 'electron'
import React, { useState, useEffect } from 'react'
import filesize from 'filesize'
// import xlsx from 'xlsx'

import { FiLogIn } from 'react-icons/fi'
import { IoMdTrash } from 'react-icons/io'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { FaFileDownload } from 'react-icons/fa'
import {
  Container,
  Form,
  Button,
  ContainerDropZone,
  ContainerPreviews,
} from './styles'
import Dropzone from '../../components/Dropzone'

function Home() {
  const [genereteFolderPath, setGenereteFolderPath] = useState('')
  const [renameFolderPath, setRenameFolderPath] = useState('')
  const [destinyFolderPath, setDestinyFolderPath] = useState('')
  const [selectFile, setSelectFile] = useState<File>()
  const [files, setFiles] = useState<File | undefined>()

  useEffect(() => {
    if (selectFile) setFiles(selectFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFile])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'genereteFolderPath') {
      setGenereteFolderPath(event.target.value)
    }

    if (event.target.name === 'renameFolderPath') {
      setRenameFolderPath(event.target.value)
    }
    if (event.target.name === 'destinyFolderPath') {
      setDestinyFolderPath(event.target.value)
    }
  }

  function onSubmitRename(e: React.FormEvent) {
    e.preventDefault()

    if (selectFile) {
      window.Main.alterFiles({
        folderPath: renameFolderPath,
        folderDestiny: destinyFolderPath,
        folderXlsx: selectFile.path,
        folderName: 'Renomeadas',
        listChanges: [
          {
            newName: 'test.jpg',
            oldName: '145_01.jpg',
          },
        ],
      })
    }
  }
  function onSubmitGenerate(e: React.FormEvent) {
    e.preventDefault()

    window.Main.generateFile({
      folderPath: genereteFolderPath,
    })
  }

  return (
    <Container>
      <Form onSubmit={onSubmitGenerate}>
        <h3>Gerar arquivo</h3>
        <div className="field">
          <input
            type="text"
            name="genereteFolderPath"
            // className={error.codForm ? 'error-input' : ''}
            onChange={onChange}
            value={genereteFolderPath}
          />
          <label
            className={genereteFolderPath ? 'active-label' : ''}
            htmlFor="cod"
          >
            Caminho da pasta
          </label>

          {/* {error.codForm && (
                <div className="error-icon">
                  <IoMdAlert />
                </div>
              )} */}
        </div>

        <Button type="submit">
          <span>
            <FaFileDownload />
          </span>
          <strong>Gerar</strong>
        </Button>
      </Form>

      <Form onSubmit={onSubmitRename}>
        <h3>Renomear arquivos</h3>
        <div className="field">
          <input
            type="text"
            name="renameFolderPath"
            // className={error.codForm ? 'error-input' : ''}
            onChange={onChange}
            value={renameFolderPath}
          />
          <label
            className={renameFolderPath ? 'active-label' : ''}
            htmlFor="cod"
          >
            Caminho da pasta
          </label>

          {/* {error.codForm && (
                <div className="error-icon">
                  <IoMdAlert />
                </div>
              )} */}
        </div>
        <div className="field">
          <input
            type="text"
            name="destinyFolderPath"
            // className={error.codForm ? 'error-input' : ''}
            onChange={onChange}
            value={destinyFolderPath}
          />
          <label
            className={destinyFolderPath ? 'active-label' : ''}
            htmlFor="cod"
          >
            Destino dos arquivos
          </label>

          {/* {error.codForm && (
                <div className="error-icon">
                  <IoMdAlert />
                </div>
              )} */}
        </div>

        <ContainerDropZone>
          <Dropzone
            accept={[
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]}
            onFileUploaded={setSelectFile}
          />
          <ContainerPreviews>
            {files && (
              <li key={`${files.name}`}>
                <RiFileExcel2Fill size={60} color="#185C37" />
                <div className="fileInfo">
                  <div>
                    <strong>{files.name}</strong>
                    <span>{filesize(files.size)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFiles(undefined)
                    }}
                  >
                    <IoMdTrash size={30} />
                  </button>
                </div>
              </li>
            )}
          </ContainerPreviews>
        </ContainerDropZone>

        <Button type="submit">
          <span>
            <FiLogIn />
          </span>
          <strong>Renomear</strong>
        </Button>
      </Form>
    </Container>
  )
}

export { Home }
