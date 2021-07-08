import { GlobalStyle } from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'

import theme from './styles/theme'

import { Home } from './pages/Home'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  )
}
