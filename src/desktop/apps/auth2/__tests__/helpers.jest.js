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
// import { handleSubmit } from "../helpers"
// import Backbone from 'backbone'
// const LoggedOutUser = require("../../../models/logged_out_user.coffee")

// jest.mock('backbone')

// describe("Authentication Helpers", () => {
//   describe("#handleSubmit", () => {
//     beforeEach() {
//       const formikBag = {
//         setSubmitting: jest.fn(),
//         setStatus: jest.fn(),
//       }
// Backbone.sync = jest.fn()
// }

// it("makes an analytics call on success for login", () => {
// handleSubmit("login", {
//   contextModule: "Header",
//   copy: "Log in yo",
//   destination: "/articles",
//   redirectTo: "/",
//   trigger: "click"
// }, {
//     email: "foo@foo.com"
//   }, formikBag)
// })

// it("makes an analytics call on success for signup", () => {

// })

// it("can login a user", () => {

// })

// it("can signup a user", () => {

// })

// it("can handle errors", () => {

// })
//   })
// })
