import React from 'react'
import ReactDOM from 'react-dom'
import App from 'desktop/apps/editorial_features/components/gucci/components/App.jsx'
import { data as sd } from 'sharify'

export default () => {
  ReactDOM.render(
    <App
      activeSection={sd.VIDEO_INDEX}
      curation={sd.CURATION}
    />,
    document.getElementById('react-root')
  )
}
