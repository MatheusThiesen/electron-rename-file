import React, { useState, useEffect } from 'react'
import filesize from 'filesize'

import { FiLogIn } from 'react-icons/fi'
import { IoMdTrash, IoMdAlert } from 'react-icons/io'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { FaFileDownload } from 'react-icons/fa'
import {
  Container,
  Form,
  Button,
  ContainerDropZone,
  ContainerPreviews,
  ErrorDropzone,
} from './styles'
import Dropzone from '../../components/Dropzone'

function Home() {
  const [genereteFolderPath, setGenereteFolderPath] = useState('')
  const [dataGenereteError, setDataGenereteError] = useState({
    genereteFolderPath: false,
  })

  const [renameFolderPath, setRenameFolderPath] = useState('')
  const [destinyFolderPath, setDestinyFolderPath] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const [dataRenameError, setDataRenameError] = useState({
    renameFolderPath: false,
    destinyFolderPath: false,
    file: false,
  })

  useEffect(() => {
    if (file) {
      setDataRenameError({ ...dataRenameError, file: false })
    }
  }, [file])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'genereteFolderPath') {
      setGenereteFolderPath(event.target.value)
      setDataGenereteError({
        ...dataGenereteError,
        genereteFolderPath: false,
      })
    }

    if (event.target.name === 'renameFolderPath') {
      setRenameFolderPath(event.target.value)
      setDataRenameError({
        ...dataRenameError,
        renameFolderPath: false,
      })
    }
    if (event.target.name === 'destinyFolderPath') {
      setDestinyFolderPath(event.target.value)
      setDataRenameError({
        ...dataRenameError,
        destinyFolderPath: false,
      })
    }
  }

  function verifyErrorGenerate() {
    if (genereteFolderPath === '') {
      setDataGenereteError({
        ...dataGenereteError,
        genereteFolderPath: true,
      })
    }
  }
  function verifyErrorRename() {
    var dataError = {}
    if (renameFolderPath === '') {
      dataError = { ...dataError, renameFolderPath: true }
    }

    if (!file) {
      dataError = { ...dataError, file: true }
    }

    if (destinyFolderPath === '') {
      dataError = { ...dataError, destinyFolderPath: true }
    }

    setDataRenameError({ ...dataRenameError, ...dataError })
  }

  function onSubmitRename(e: React.FormEvent) {
    e.preventDefault()

    verifyErrorRename()
    console.log(dataRenameError)

    if (file && renameFolderPath && destinyFolderPath) {
      window.Main.alterFiles({
        folderPath: renameFolderPath,
        folderDestiny: destinyFolderPath,
        folderXlsx: file.path,
        folderName: 'Renomeadas',
      })
    }
  }
  function onSubmitGenerate(e: React.FormEvent) {
    e.preventDefault()

    verifyErrorGenerate()

    if (genereteFolderPath) {
      window.Main.generateFile({
        folderPath: genereteFolderPath,
      })
    }
  }

  return (
    <Container>
      <Form onSubmit={onSubmitGenerate}>
        <h3>Gerar listagem de arquivos</h3>
        <div className="field">
          <input
            type="text"
            name="genereteFolderPath"
            className={
              dataGenereteError.genereteFolderPath ? 'error-input' : ''
            }
            onChange={onChange}
            onClick={() =>
              setDataGenereteError({
                ...dataGenereteError,
                genereteFolderPath: false,
              })
            }
            value={genereteFolderPath}
          />
          <label
            className={genereteFolderPath ? 'active-label' : ''}
            htmlFor="cod"
          >
            Caminho da pasta
          </label>

          {dataGenereteError.genereteFolderPath && (
            <div className="error-icon">
              <IoMdAlert />
            </div>
          )}
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
            className={dataRenameError.renameFolderPath ? 'error-input' : ''}
            onClick={() =>
              setDataRenameError({
                ...dataRenameError,
                renameFolderPath: false,
              })
            }
            onChange={onChange}
            value={renameFolderPath}
          />
          <label
            className={renameFolderPath ? 'active-label' : ''}
            htmlFor="cod"
          >
            Caminho da pasta
          </label>

          {dataRenameError.renameFolderPath && (
            <div className="error-icon">
              <IoMdAlert />
            </div>
          )}
        </div>
        <div className="field">
          <input
            type="text"
            name="destinyFolderPath"
            className={dataRenameError.destinyFolderPath ? 'error-input' : ''}
            onClick={() =>
              setDataRenameError({
                ...dataRenameError,
                destinyFolderPath: false,
              })
            }
            onChange={onChange}
            value={destinyFolderPath}
          />
          <label
            className={destinyFolderPath ? 'active-label' : ''}
            htmlFor="cod"
          >
            Destino dos arquivos
          </label>

          {dataRenameError.destinyFolderPath && (
            <div className="error-icon">
              <IoMdAlert />
            </div>
          )}
        </div>

        <ContainerDropZone>
          <Dropzone
            accept={[
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]}
            onFileUploaded={setFile}
          />
          {dataRenameError.file && (
            <ErrorDropzone>
              <IoMdAlert color="#d93025" size={22} />
              <span>Arquivo é obrigatório</span>
            </ErrorDropzone>
          )}

          <ContainerPreviews>
            {file && (
              <li key={`${file.name}`}>
                <RiFileExcel2Fill size={60} color="#185C37" />
                <div className="fileInfo">
                  <div>
                    <strong>{file.name}</strong>
                    <span>{filesize(file.size)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFile(undefined)
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
