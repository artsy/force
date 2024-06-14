import { ErrorBoundary } from "System/Components/ErrorBoundary"
import { mount } from "enzyme"

jest.mock("Utils/getENV", () => ({
  getENV: () => "development",
}))

describe("ErrorBoundary", () => {
  const errorLog = console.error

  beforeAll(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = errorLog
  })

  it("renders children if no error", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>found child</div>
      </ErrorBoundary>
    )

    expect(wrapper.text()).toContain("found child")
  })

  it("calls componentDidCatch if error", () => {
    jest.spyOn(ErrorBoundary.prototype, "componentDidCatch")

    const ErrorComponent = () => {
      throw new Error("throw error")
      return null
    }

    mount(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled()
  })

  it("updates `detail` state with stack trace", () => {
    const ErrorComponent = () => {
      throw new Error("throw error")
      return null
    }

    const wrapper = mount(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    const state = wrapper.state() as any

    expect(state.detail).toContain("Error: throw error")
  })

  it("shows error page when the error kind is GenericError", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      kind: "GenericError",
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorPage").length).toEqual(1)
  })

  it("shows error page when the error kind is AsyncChunkLoadError", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      kind: "AsyncChunkLoadError",
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorPage").length).toEqual(1)
  })

  it("derives state for a generic error", () => {
    const state = ErrorBoundary.getDerivedStateFromError({
      name: "error",
      message: "generic error",
    })

    expect(state.kind).toBe("GenericError")
    expect(state.message).toContain("generic error")
  })

  it("derives state for an async chunk load error", () => {
    const state = ErrorBoundary.getDerivedStateFromError({
      name: "error",
      message: "Loading chunk c3495.js failed",
    })

    expect(state.kind).toBe("AsyncChunkLoadError")
    expect(state.message).toContain("Loading chunk c3495.js failed")
  })
})
