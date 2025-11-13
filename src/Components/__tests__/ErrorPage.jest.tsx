import { render } from "@testing-library/react"
import "jest-styled-components"
import { ErrorPage } from "Components/ErrorPage"

describe("ErrorPage", () => {
  describe("unit", () => {
    it("renders an error page with no stack trace if it's a 404", () => {
      const { container } = render(
        <ErrorPage code={404} message="Custom error message" />
      )
      expect(container.textContent).not.toMatch("Custom error message")
    })

    it("renders an error page with a stack trace if it's not a 404", () => {
      const { container } = render(
        <ErrorPage code={500} message="Custom error message" />
      )
      expect(container.textContent).toMatch("Custom error message")
    })
  })
})
