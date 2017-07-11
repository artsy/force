import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { rehydrateClient } from 'desktop/components/react/utils/render_react_layout'

const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)

ReactDOM.render(
  <App {...bootstrapData} />, document.getElementById('react-root')
)
