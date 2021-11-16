import Cookies from "cookies-js"
import ReactDOM from "react-dom"
import { init } from "../index"
import { initModalManager } from "../initModalManager"
import { FullPageAuthStatic } from "v2/Apps/Authentication/Components/FullPageAuthStatic"
import { ModalContainer } from "v2/Apps/Authentication/Components/ModalContainer"

jest.mock("cookies-js")
jest.mock("react-dom")
jest.mock("sharify")

describe("Auth client", () => {
  beforeEach(() => {
    Cookies.set = jest.fn()
  })

  describe("#init", () => {
    beforeEach(() => {
      global.document.getElementById = jest.fn(() => <div id="react-root" />)
      window.__BOOTSTRAP__ = {
        options: {
          destination: "/foo",
        },
      }
      ReactDOM.hydrate = jest.fn()
    })

    it("Returns FullPageAuthStatic", () => {
      init()
      const component = ReactDOM.hydrate.mock.calls[0][0]

      expect(component.type).toBe(FullPageAuthStatic)
    })

    it("calls #setCookies", () => {
      init()
      const cookie = Cookies.set.mock.calls[0]

      expect(cookie[0]).toBe("destination")
      expect(cookie[1]).toMatch("/foo")
      expect(cookie[2].expires).toBe(86400)
    })
  })

  describe("#initModalManager", () => {
    beforeEach(() => {
      global.document.getElementById = jest.fn(() => (
        <div id="react-modal-container" />
      ))
      ReactDOM.render = jest.fn()
    })

    it("Sets up the modal container", () => {
      initModalManager()
      const component = ReactDOM.render.mock.calls[0][0]

      expect(component.type).toBe(ModalContainer)
    })
  })
})
