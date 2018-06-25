import Cookies from 'cookies-js'
import { handleSubmit, setCookies } from '../helpers'
import Backbone from 'backbone'
import $ from 'jquery'

jest.mock('cookies-js')
jest.mock('sharify', () => {
  return {
    data: { AP: { loginPagePath: 'foo' } },
  }
})

describe('Authentication Helpers', () => {
  describe('#setCookies', () => {
    beforeEach(() => {
      Cookies.set = jest.fn()
    })

    it('Sets a cookie for afterSignUpAction ', () => {
      setCookies({ afterSignUpAction: 'an action' })
      const cookie = Cookies.set.mock.calls[0]

      expect(cookie[0]).toBe('afterSignUpAction')
      expect(cookie[1]).toMatch('an action')
    })

    it('Sets a cookie with expiration for destination', () => {
      setCookies({ destination: '/foo' })
      const cookie = Cookies.set.mock.calls[0]

      expect(cookie[0]).toBe('destination')
      expect(cookie[1]).toMatch('/foo')
      expect(cookie[2].expires).toBe(86400)
    })
  })

  describe('#handleSubmit', () => {
    const formikBag = {
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
    }

    beforeEach(() => {
      Backbone.sync = jest.fn()
      window.analytics = { track: jest.fn() }
      global.$ = global.jQuery = $
    })

    it('can login a user', () => {
      handleSubmit(
        'login',
        {
          contextModule: 'Header',
          copy: 'Log in yo',
          destination: '/articles',
          redirectTo: '/',
          trigger: 'click',
        },
        {
          email: 'foo@foo.com',
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success({
        user: { id: 123, accessToken: 'foobar' },
      })

      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
    })

    it('can signup a user', () => {
      handleSubmit(
        'signup',
        {
          contextModule: 'Header',
          copy: 'Sign up please',
          destination: '/articles',
          trigger: 'timed',
          triggerSeconds: 2,
          intent: 'follow artist',
        },
        {
          email: 'foo@foo.com',
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success()
      Backbone.sync.mock.calls[1][2].success({
        user: { id: 123, accessToken: 'foobar' },
      })
      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
    })

    it('can handle errors', () => {
      handleSubmit(
        'login',
        {
          contextModule: 'Header',
          copy: 'Log in yo',
          destination: '/articles',
          redirectTo: '/',
          trigger: 'click',
        },
        {
          email: 'foo@foo.com',
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].error({
        responseJSON: {
          message: 'Bad Request',
        },
      })
      expect(formikBag.setStatus.mock.calls[0][0].message).toMatch(
        'Bad Request'
      )
      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
    })

    it('makes an analytics call on success for login', () => {
      handleSubmit(
        'login',
        {
          contextModule: 'Header',
          copy: 'Log in yo',
          destination: '/articles',
          redirectTo: '/',
          trigger: 'click',
        },
        {
          email: 'foo@foo.com',
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success({
        user: { id: 123, accessToken: 'foobar' },
      })
      expect(window.analytics.track).toBeCalledWith({
        action: 'Successfully logged in',
        user_id: 123,
        trigger: 'click',
        context_module: 'Header',
        modal_copy: 'Log in yo',
        auth_redirect: '/',
      })
    })

    it('makes an analytics call on success for signup', () => {
      handleSubmit(
        'signup',
        {
          contextModule: 'Header',
          copy: 'Sign up please',
          destination: '/articles',
          trigger: 'timed',
          triggerSeconds: 2,
          intent: 'follow artist',
        },
        {
          email: 'foo@foo.com',
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success()
      Backbone.sync.mock.calls[1][2].success({
        user: { id: 123, accessToken: 'foobar' },
      })
      expect(window.analytics.track).toBeCalledWith({
        action: 'Created account',
        user_id: 123,
        trigger: 'timed',
        trigger_seconds: 2,
        context_module: 'Header',
        modal_copy: 'Sign up please',
        auth_redirect: '/articles',
        intent: 'follow artist',
      })
    })
  })
})
