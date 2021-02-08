import {createGlobalStyle} from 'styled-components';
import Background from '../static/images/background.svg'
import {css} from "styled-components";

const GlobalStyle = createGlobalStyle`

  html {
    height: 100%;
    overflow: hidden;
    width: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    overflow-x: hidden;
    background-image: ${css`url(${Background})`};
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 100%;
    overflow-y: scroll;
    width: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  a {
    text-decoration: none;
  }

  h6, h5, h4, p {
    margin: 0;
  }

  h3 {
    font-size: 20px;
  }

  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  :global(.text-left) {
    text-align: left !important;
  }

  :global(.text-right) {
    text-align: right !important;
  }

  :global(.text-center) {
    text-align: center !important;
  }

  :global(.display-flex) {
    display: flex;
  }

  :global(.btn-primary) {
    border-radius: 2px;
    padding: 13px 74px;
    font-size: 16px;
    display: inline-block;

    &:hover {
      transition: background-color .3s;
    }
  }

  :global(.btn-primary-small) {
    border-radius: 2px;
    padding: 13px 40px;
    font-size: 16px;
    display: inline-block;

    &:hover {
      transition: background-color .3s;
    }
  }

  :global(.btn-secondary) {
    border-radius: 2px;
    padding: 13px 74px;
    font-size: 16px;
  }

  :global(.rotate) {
    transform: rotate(180deg);
  }

  :global(.container) {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
    @media only screen and (min-width: 768px) {
      padding: 0 40px;
    }
    @media only screen and (min-width: 992px) {
      padding: 0 120px;
    }
    @media only screen and (min-width: 1200px) {
      padding: 0;
    }
    @media only screen and (min-width: 1440px) {
      max-width: 1200px;
    }
  }

  :global(.container-small) {
    max-width: 800px;
    margin: 0 auto;
    padding-left: 16px;
    padding-right: 16px;
    @media only screen and (min-width: 768px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  :global(.container-no-padding) {
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
    @media only screen and (min-width: 768px) {
      padding: 0 40px;
    }
  }

  :global(.hide) {
    display: none !important;
  }

  :global(.hide-mobile) {
    @media (max-width: 767px) {
      display: none !important;
    }
  }

  :global(.hide-desktop) {
    @media (min-width: 768px) {
      display: none !important;
    }
  }

  :global(.block) {
    display: block !important;
  }

  :global(.flex) {
    display: flex !important;
  }

  :global(.text-page) {
    padding-top: 40px;
    padding-bottom: 120px;

    h1 {
      font-weight: bold;
      font-size: 20px;
      @media only screen and (min-width: 768px) {
        font-family: 'Montserrat';
        font-size: 28px;
        font-weight: 800;
      }
    }

    h3 {
      font-size: 20px;
      margin-bottom: 16px;
      margin-top: 0;
    }

    h4 {
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 0;
    }

    p {
      margin-bottom: 1em;
    }

    .main-content {
      padding-top: 20px;
    }
  }

  :global(.swiper-container) {
    :global(.swiper-wrapper) {
      height: auto;

      :global(.swiper-slide) {
        height: auto;
      }
    }
  }


`

export default GlobalStyle;