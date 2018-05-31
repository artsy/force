import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStatic } from 'desktop/apps/auth2/components/AuthStatic'
import { ModalManager } from '@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager'
import { data as sd } from 'sharify'

const mediator = require('../../../lib/mediator.coffee')

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = (window as any).__BOOTSTRAP__
  const el = document.getElementById('react-root')

  if (el) {
    // Start app
    ReactDOM.hydrate(<AuthStatic {...bootstrapData} />, el)
  }
}

export const initModalManager = () => {
  const el = document.getElementById('react-modal-container')

  const Container: React.SFC<any> = () => {
    let manager: ModalManager | null

    mediator.on('open:auth', options => {
      if (manager) {
        manager.openModal(options.mode)
      }
    })

    return (
      <ModalManager
        ref={ref => (manager = ref)}
        submitUrls={{
          login: sd.AP.loginPagePath,
          signup: sd.AP.signupPagePath,
        }}
        csrf={sd.CSRF_TOKEN}
        redirectUrl="/"
      />
    )
  }

  if (el) {
    ReactDOM.render(<Container />, el)
  }
}
