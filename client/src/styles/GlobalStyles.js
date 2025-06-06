import { createGlobalStyle } from 'styled-components';
import { theme } from './theme'; // Import the theme

export const GlobalStyles = createGlobalStyle`
  // CSS Reset (inspired by modern resets)
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px; // Base font size for rem calculations
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.textColor};
    background-color: ${theme.colors.warmWhite};
    line-height: ${theme.typography.body.lineHeight};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden; // Prevent horizontal scroll

    // Hide scrollbars
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .sr-only {
    position:absolute;
    left:-10000px;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.main};
    color: ${theme.colors.blush}; // Example of using a theme color for headings
  }

  h1 { ${({ theme }) => ({ ...theme.typography.h1 })}; }
  h2 { ${({ theme }) => ({ ...theme.typography.h2 })}; }
  h3 { ${({ theme }) => ({ ...theme.typography.h3 })}; }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.accent};
    }
  }

  ul, ol {
    list-style: none;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
    border: none;
    background: none;
  }
`;
