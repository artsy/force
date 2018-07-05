import { mount } from 'enzyme'
import { data as sd } from 'sharify'
import Cookies from 'cookies-js'
import React from 'react'
import { ModalManager } from '@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager'
import { ModalContainer } from '../ModalContainer'
const mediator = require('../../../../lib/mediator.coffee')

jest.mock('sharify')
jest.mock('cookies-js')
jest.useFakeTimers()

describe('ModalContainer', () => {
  beforeEach(() => {
    Cookies.set = jest.fn()
    sd.AP = {
      loginPagePath: '/login',
      signupPagePath: '/signup',
    }
    sd.CSRF_TOKEN = 'sample-token'
  })

  it('Mediator can open a login modal', () => {
    const component = mount(<ModalContainer />)
    mediator.trigger('open:auth', { mode: 'login' })
    jest.runTimersToTime(1000)
    const form = component.find(ModalManager).instance().state
    expect(form.currentType).toBe('login')
  })

  it('Mediator can open a signup modal', () => {
    const component = mount(<ModalContainer />)
    mediator.trigger('open:auth', { mode: 'signup' })
    jest.runTimersToTime(1000)
    const form = component.find(ModalManager).instance().state
    expect(form.currentType).toBe('signup')
  })

  it('Mediator can open a reset_password modal', () => {
    const component = mount(<ModalContainer />)
    mediator.trigger('open:auth', { mode: 'reset_password' })

    jest.runTimersToTime(1000)
    const form = component.find(ModalManager).instance().state
    expect(form.currentType).toBe('reset_password')
  })

  it('Sets a cookie when opening the modal', () => {
    mount(<ModalContainer />)
    mediator.trigger('open:auth', { mode: 'login', destination: 'foo' })
    const cookie = Cookies.set.mock.calls[0]

    expect(cookie[0]).toBe('destination')
  })
})
