import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { rehydrateClient } from 'desktop/components/react/utils/renderReactLayout'
import Article from 'desktop/models/article.coffee'

export default () => {
  // Rehydrate data from Server
  const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)
  const article = new Article(bootstrapData.app.article)

  // Start app
  ReactDOM.render(
    <App {...bootstrapData} />, document.getElementById('react-root')
  )
}
