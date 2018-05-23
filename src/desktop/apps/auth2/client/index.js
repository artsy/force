import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStatic } from 'desktop/apps/auth2/components/AuthStatic'
import { ModalManager } from 'desktop/apps/auth2/components/ModalManager'

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = window.__BOOTSTRAP__
  const el = document.getElementById('react-root')

  if (el) {
    // Start app
    ReactDOM.hydrate(<AuthStatic {...bootstrapData} />, el)
  }
}

export const initModalManager = () => {
  const el = document.getElementById('react-modal-container')

  if (el) {
    ReactDOM.render(<ModalManager />, el)
  }
}
