import React from 'react'
import { ModalManager } from '@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager'
import { handleSubmit, setCookies } from '../helpers'
import { data as sd } from 'sharify'
const mediator = require('../../../lib/mediator.coffee')

export const ModalContainer: React.SFC<any> = () => {
  let manager: ModalManager | null

  mediator.on('open:auth', options => {
    setCookies(options)

    if (options && options.mode === 'register') {
      options.mode = 'signup'
    }

    setTimeout(() => {
      if (manager) {
        manager.openModal(options)
      }
    }, document.readyState === 'complete' ? 0 : 500)
  })

  mediator.on('auth:error', err => {
    if (manager) {
      manager.setError(err)
    }
  })

  return (
    <ModalManager
      ref={ref => (manager = ref)}
      submitUrls={{
        login: sd.AP.loginPagePath,
        signup: sd.AP.signupPagePath,
        facebook: sd.AP.facebookPath,
        twitter: sd.AP.twitterPath,
      }}
      csrf={sd.CSRF_TOKEN}
      handleSubmit={handleSubmit as any}
    />
  )
}
