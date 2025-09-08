import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: 1.6;
    color: ${theme.colors.neutral.gray800};
    background-color: ${theme.colors.neutral.white};
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: 2px solid ${theme.colors.primary.skyBlue};
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${theme.colors.neutral.gray300};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    outline: none;
    transition: all 0.2s ease-in-out;

    &:focus {
      border-color: ${theme.colors.primary.skyBlue};
      box-shadow: 0 0 0 3px ${theme.colors.primary.skyBlue}20;
    }

    &::placeholder {
      color: ${theme.colors.neutral.gray400};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: 1.3;
    margin-bottom: ${theme.spacing.sm};
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${theme.typography.fontSize.xl};
  }

  h5 {
    font-size: ${theme.typography.fontSize.lg};
  }

  h6 {
    font-size: ${theme.typography.fontSize.md};
  }

  p {
    margin-bottom: ${theme.spacing.sm};
    line-height: 1.7;
  }

  ul, ol {
    margin-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.sm};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }

  .section {
    padding: ${theme.spacing['3xl']} 0;
  }

  .gradient-bg {
    background: linear-gradient(135deg, 
      ${theme.colors.primary.green}20 0%, 
      ${theme.colors.primary.skyBlue}20 25%, 
      ${theme.colors.primary.orange}20 50%, 
      ${theme.colors.primary.yellow}20 75%, 
      ${theme.colors.primary.green}20 100%
    );
  }

  .text-gradient {
    background: linear-gradient(135deg, 
      ${theme.colors.primary.green}, 
      ${theme.colors.primary.skyBlue}, 
      ${theme.colors.primary.orange}, 
      ${theme.colors.primary.yellow}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 ${theme.spacing.sm};
    }

    .section {
      padding: ${theme.spacing['2xl']} 0;
    }

    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
    }

    h2 {
      font-size: ${theme.typography.fontSize['2xl']};
    }

    h3 {
      font-size: ${theme.typography.fontSize.xl};
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: ${theme.typography.fontSize['2xl']};
    }

    h2 {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
`;