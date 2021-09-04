import { useAction } from '../../hooks/useAction'

import { Header } from '../../components/Header'
import { Rename } from '../Actions/Rename'
import { GenerateFile } from '../Actions/GenerateFile'
import { Delete } from '../Actions/Delete'

import { Container, Content } from './styles'

function Home() {
  const { action } = useAction()

  return (
    <Container>
      <Header />
      <Content>
        {action === 'generateFile' && <GenerateFile />}
        {action === 'rename' && <Rename />}
        {action === 'delete' && <Delete />}
      </Content>
    </Container>
  )
}

export { Home }
