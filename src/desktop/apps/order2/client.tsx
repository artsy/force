import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './Components/App'

export function init() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
