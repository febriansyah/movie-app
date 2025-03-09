import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #e50914;
    --secondary: #141414;
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --background: #000000;
    --overlay: rgba(0, 0, 0, 0.7);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: var(--background);
    color: var(--text-primary);
    line-height: 1.5;
    overflow-x: hidden;
  }

  a {
    color: var(--text-primary);
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }
`;

export default GlobalStyles;
