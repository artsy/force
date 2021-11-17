import Cookies from "cookies-js"
import ReactDOM from "react-dom"
import { ModalContainer } from "v2/Apps/Authentication/Components/ModalContainer"
import { initAuthModalContainer } from "../initAuthModalContainer"

jest.mock("sharify")
jest.mock("cookies-js")
jest.mock("react-dom", () => ({
  render: jest.fn(),
}))

describe("initAuthModalContainer", () => {
  const mockRender = ReactDOM.render as jest.Mock

  beforeEach(() => {
    Cookies.set = jest.fn()

    global.document.getElementById = jest.fn(() => (
      <div id="react-modal-container" />
    )) as any
  })

  it("sets up the modal container", () => {
    initAuthModalContainer()

    const component = mockRender.mock.calls[0][0]
    expect(component.type).toBe(ModalContainer)
  })
})
