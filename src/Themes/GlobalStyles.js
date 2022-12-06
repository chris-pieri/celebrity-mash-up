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

        overflow-y: overlay;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        transition: all 0.25s;
    }

    #root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        text-align: center;
        height: 100vh;
        width: 300px;
    }

    body {
        margin: 0;
        min-height: 100vh;
    }
`;

export default GlobalStyles;
