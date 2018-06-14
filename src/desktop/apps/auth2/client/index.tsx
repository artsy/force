import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'cookies-js'
import { AuthStatic } from 'desktop/apps/auth2/components/AuthStatic'
import { MobileAuthStatic } from 'desktop/apps/auth2/components/MobileAuthStatic'
import { ModalManager } from '@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager'
import { handleSubmit } from '../helpers'
import { data as sd } from 'sharify'

const mediator = require('../../../lib/mediator.coffee')

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = (window as any).__BOOTSTRAP__
  const el = document.getElementById('react-root')
  const Component = sd.IS_MOBILE ? MobileAuthStatic : AuthStatic

  if (el) {
    // Start app
    // ReactDOM.hydrate(<AuthStatic {...bootstrapData} />, el)
    ReactDOM.hydrate(<Component {...bootstrapData} />, el)
  }
}

export const initModalManager = () => {
  const el = document.getElementById('react-modal-container')

  const Container: React.SFC<any> = () => {
    let manager: ModalManager | null

    mediator.on('open:auth', options => {
      if (options.afterSignUpAction) {
        Cookies.set(
          'postSignupAction',
          JSON.stringify(options.afterSignUpAction)
        )
      }

      if (options.destination) {
        Cookies.set('destination', options.destination, {
          expires: 60 * 60 * 24,
        })
      }

      // TODO: remember to swap 'register' with 'signup' in triggers
      if (options.mode === 'register') {
        options.mode = 'signup'
      }

      if (manager) {
        manager.openModal(options)
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
        handleSubmit={handleSubmit}
      />
    )
  }

  if (el) {
    ReactDOM.render(<Container />, el)
  }
}
