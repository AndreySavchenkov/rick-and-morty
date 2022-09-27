import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyle = createGlobalStyle`
 body {
    height:100%;
    min-height: 320px;
    margin:0;
    padding:0;
    font-family: "Manrope", Verdana, sans-serif;
    font-style: normal;
    color: ${() => colors.darkTextColor};
    overflow-x: hidden;
    font-size: 16px;
 }

 * {
    font-family: "Manrope", sans-serif;
  }

  html {
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    list-style: none;
  }
`;
