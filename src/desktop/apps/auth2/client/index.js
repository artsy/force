import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStatic } from 'desktop/apps/auth2/components/AuthStatic.tsx'

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = window.__BOOTSTRAP__

  // Start app
  ReactDOM.hydrate(
    <AuthStatic {...bootstrapData} />,
    document.getElementById('react-root')
  )
}
