import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    min-height: 100vh;
  }

  body, input, button {
    font-family: 'Roboto Slab' sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, strong {
    font-weight: 500;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }
`;