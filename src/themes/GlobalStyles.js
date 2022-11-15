import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color-scheme: dark light;
        color: ${({ theme }) => theme.primary.main};
        background-color: ${({ theme }) => theme.background.root};

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 1280px;
        margin: 0 auto;
        text-align: center;
        height: 100vh;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        transition: all 0.25s;
    }

    body {
        margin: 0;
        display: flex;
        place-items: center;
        width: 320px;
        min-height: 100vh;
    }

    @media (max-width: 480px) {
        body {
            width: 300px;
        }
  }
`;

export default GlobalStyles;
