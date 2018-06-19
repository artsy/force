import React from 'react'
import { ModalManager } from '@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager'
import { handleSubmit, setCookies } from '../helpers'
import { data as sd } from 'sharify'
const mediator = require('../../../lib/mediator.coffee')

export const ModalContainer: React.SFC<any> = () => {
  let manager: ModalManager | null

  mediator.on('open:auth', options => {
    setCookies(options)

    // TODO: remember to swap 'register' with 'signup' in triggers
    if (options && options.mode === 'register') {
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
