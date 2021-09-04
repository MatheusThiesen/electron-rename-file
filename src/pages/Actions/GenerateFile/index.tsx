import React, { useState } from 'react'

import { IoMdAlert } from 'react-icons/io'
import { FaFileDownload } from 'react-icons/fa'
import { FcOpenedFolder } from 'react-icons/fc'
import { Form, Button } from '../styles'

export function GenerateFile() {
  const [genereteFolderPath, setGenereteFolderPath] = useState('')
  const [dataGenereteError, setDataGenereteError] = useState({
    genereteFolderPath: false,
  })

  const selectDirectory = () => {
    window.Main.selectDirectory()

    window.Main.on('selected-directory', (folder: string) =>
      setGenereteFolderPath(folder)
    )
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'genereteFolderPath') {
      setGenereteFolderPath(event.target.value)
      setDataGenereteError({
        ...dataGenereteError,
        genereteFolderPath: false,
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
    <Form onSubmit={onSubmitGenerate}>
      <h3>Gerar a listagem de arquivos da pasta</h3>
      <div className="field">
        <input
          type="text"
          name="genereteFolderPath"
          className={dataGenereteError.genereteFolderPath ? 'error-input' : ''}
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

        <button type="button" onClick={selectDirectory}>
          <FcOpenedFolder />
        </button>
      </div>

      <Button type="submit">
        <span>
          <FaFileDownload />
        </span>
        <strong>Gerar</strong>
      </Button>
    </Form>
  )
}
