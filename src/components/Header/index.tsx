import React from 'react'
import { useAction } from '../../hooks/useAction'

import { Container, Content, ContainerCheck } from './styles'

export const Header: React.FC = ({ children }) => {
  const { action, setAction } = useAction()
  return (
    <Container>
      <Content>
        <h1>Manipulador de Arquivos através do Excel</h1>
        <ContainerCheck>
          <button
            type="button"
            className={action === 'generateFile' ? 'check' : ''}
            onClick={() => {
              setAction('generateFile')
            }}
          >
            Gerar Listagem
          </button>
          <button
            type="button"
            className={action === 'rename' ? 'check' : ''}
            onClick={() => {
              setAction('rename')
            }}
          >
            Renomear
          </button>
          <button
            type="button"
            className={action === 'delete' ? 'check' : ''}
            onClick={() => {
              setAction('delete')
            }}
          >
            Deletar
          </button>
        </ContainerCheck>
      </Content>
    </Container>
  )
}
