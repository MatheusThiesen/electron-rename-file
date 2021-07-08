import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0 !important;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }

  button, input {
    border: 0;
    outline: 0;

    font-family: 'Roboto', sans-serif;
  }


  button {
    cursor: pointer;
  }


  a{
    text-decoration:none; 
  }

  
`
