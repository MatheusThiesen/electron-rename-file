import React, { useState, useEffect } from 'react'
import filesize from 'filesize'

import { FiLogIn } from 'react-icons/fi'
import { IoMdTrash, IoMdAlert } from 'react-icons/io'
import { FcOpenedFolder } from 'react-icons/fc'
import { RiFileExcel2Fill } from 'react-icons/ri'
import {
  Form,
  Button,
  ContainerDropZone,
  ContainerPreviews,
  ErrorDropzone,
} from '../styles'
import Dropzone from '../../../components/Dropzone'

export function Delete() {
  const [renameFolderPath, setRenameFolderPath] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const [dataRenameError, setDataRenameError] = useState({
    renameFolderPath: false,
    file: false,
  })

  useEffect(() => {
    if (file) {
      setDataRenameError({ ...dataRenameError, file: false })
    }
  }, [file])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'renameFolderPath') {
      setRenameFolderPath(event.target.value)
      setDataRenameError({
        ...dataRenameError,
        renameFolderPath: false,
      })
    }
  }

  const selectDirectory = () => {
    window.Main.selectDirectory()

    window.Main.on('selected-directory', (folder: string) =>
      setRenameFolderPath(folder)
    )
  }

  function verifyErrorRename() {
    let dataError = {}
    if (renameFolderPath === '') {
      dataError = { ...dataError, renameFolderPath: true }
    }

    if (!file) {
      dataError = { ...dataError, file: true }
    }

    setDataRenameError({ ...dataRenameError, ...dataError })
  }

  function onSubmitRename(e: React.FormEvent) {
    e.preventDefault()

    verifyErrorRename()

    if (file && renameFolderPath) {
      window.Main.deleteFiles({
        folderPath: renameFolderPath,
        folderXlsx: file.path,
      })
    }
  }

  return (
    <Form onSubmit={onSubmitRename}>
      <h3>Deletar arquivos</h3>
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
        <label className={renameFolderPath ? 'active-label' : ''} htmlFor="cod">
          Caminho da pasta
        </label>

        {dataRenameError.renameFolderPath && (
          <div className="error-icon">
            <IoMdAlert />
          </div>
        )}

        <button type="button" onClick={selectDirectory}>
          <FcOpenedFolder />
        </button>
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
        <strong>Deletar</strong>
      </Button>
    </Form>
  )
}
