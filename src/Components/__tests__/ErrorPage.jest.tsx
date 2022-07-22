import { mount } from "enzyme"
import "jest-styled-components"
import { ErrorPage } from "../ErrorPage"

describe("ErrorPage", () => {
  describe("unit", () => {
    it("renders an error page with no stack trace if it's a 404", () => {
      const component = mount(
        <ErrorPage code={404} message="Custom error message" />
      )
      expect(component.text()).not.toMatch("Custom error message")
    })

    it("renders an error page with a stack trace if it's not a 404", () => {
      const component = mount(
        <ErrorPage code={500} message="Custom error message" />
      )
      expect(component.text()).toMatch("Custom error message")
    })
  })
})
