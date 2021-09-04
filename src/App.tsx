import { GlobalStyle } from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'

import theme from './styles/theme'
import { Home } from './pages/Home'
import { ActionProvider } from './hooks/useAction'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ActionProvider>
        <GlobalStyle />
        <Home />
      </ActionProvider>
    </ThemeProvider>
  )
}
