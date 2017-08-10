import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { App } from './components/app'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.querySelector('.container'))
