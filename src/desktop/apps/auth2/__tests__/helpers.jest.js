import Cookies from 'cookies-js'
import { setCookies } from '../helpers'

jest.mock('cookies-js')

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
