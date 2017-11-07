import React from 'react'
import ReactDOM from 'react-dom'
import App from 'desktop/apps/editorial_features/components/gucci/components/App.jsx'
import { data as sd } from 'sharify'

export default () => {
  ReactDOM.render(
    <App
      curation={sd.CURATION}
      index={sd.VIDEO_INDEX}
    />,
    document.getElementById('react-root')
  )
}
