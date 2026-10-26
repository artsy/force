import { render, screen } from "@testing-library/react"
import { renderRouteError } from "System/Router/Utils/renderRouteError"
import { getENV } from "Utils/getENV"

jest.mock("Server/context", () => ({
  updateContext: jest.fn(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("renderRouteError", () => {
  const mockGetENV = getENV as jest.Mock

  const error = Object.assign(new Error("fetch failed"), {
    stack: "TypeError: fetch failed\n    at somewhere",
  })

  it("returns null when there is no error", () => {
    expect(renderRouteError(null)).toBeNull()
  })

  it("displays the error message and stack in development", () => {
    mockGetENV.mockReturnValue("development")

    render(renderRouteError(error)!)

    expect(screen.getByText("Internal Server Error")).toBeInTheDocument()
    expect(screen.getByText("fetch failed")).toBeInTheDocument()
    expect(screen.getByText(/at somewhere/)).toBeInTheDocument()
  })

  it("hides the error message and stack outside of development", () => {
    mockGetENV.mockReturnValue("production")

    render(renderRouteError(error)!)

    expect(screen.getByText("Internal Server Error")).toBeInTheDocument()
    expect(screen.queryByText("fetch failed")).not.toBeInTheDocument()
    expect(screen.queryByText(/at somewhere/)).not.toBeInTheDocument()
  })
})
