import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import { createGlobalStyle } from 'styled-components'
import { customTheme } from './app/common/theme'
import Router from './app/Routes'

const GlobalStyle = createGlobalStyle`
	body{
		overflow: hidden;
	}

	&::-webkit-scrollbar {
		width: 9px;               /* width of the entire scrollbar */
	}

	&::-webkit-scrollbar-track {
		background: #F8F8F8;        /* color of the tracking area */
	}

	&::-webkit-scrollbar-thumb {
		background-color: "#1d3354";    /* color of the scroll thumb */
		border-radius: 20px;       /* roundness of the scroll thumb */
		border: 3px solid #F8F8F8;  /* creates padding around scroll thumb */
	}

	*:focus {
			outline: 0;
			box-shadow: none!important;
	}
.nav-area {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.logo {
  text-decoration: none;
  font-size: 25px;
  color: inherit;
  margin-right: 20px;
}

.menus {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
}

.menu-items {
  position: relative;
  font-size: 14px;
}

.menu-items a {
  display: block;
  font-size: inherit;
  color: inherit;
  text-decoration: none;
}

.menu-items button {
  display: flex;
  align-items: center;
  color: inherit;
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
}

button span {
  margin-left: 3px;
}

.menu-items > a, .menu-items button {
  text-align: left;
  padding: 0.7rem 1rem;
}

.menu-items a:hover,
.menu-items button:hover {
  background-color: #f2f2f2;
  border-radius: 5px ;
}

.arrow::after {
  content: "";
  display: inline-block;
  margin-left: 0.28em;
  vertical-align: 0.09em;
  border-top: 0.42em solid;
  border-right: 0.32em solid transparent;
  border-left: 0.32em solid transparent;
}

.dropdown {
  position: absolute;
  right: 0;
  left: auto;
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08),
    0 4px 6px -2px rgba(71, 63, 79, 0.16);
  font-size: 0.875rem;
  z-index: 9999;
  min-width: 10rem;
  padding: 0.5rem 0;
  list-style: none;
  background-color: #fff;
  border-radius: 0.5rem;
  display: none;
}

.dropdown.show {
  display: block;
}

.dropdown .dropdown-submenu {
  position: absolute;
  left: 100%;
  top: -7px;
}	
`

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={customTheme} resetCSS>
			<Router />
			<GlobalStyle />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
