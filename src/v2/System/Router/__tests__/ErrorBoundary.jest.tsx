import { mount } from "enzyme"
import { ErrorBoundary } from "../ErrorBoundary"

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

  it("updates `errorStack` state with stack trace", () => {
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

  it("shows error page when genericError is true", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      isError: true,
      genericError: true,
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorPage").length).toEqual(1)
  })

  it("shows error page when asyncChunkLoadError is true", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      isError: true,
      asyncChunkLoadError: true,
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorPage").length).toEqual(1)
  })

  it("sets async chunk load error", () => {
    expect(
      ErrorBoundary.getDerivedStateFromError({
        name: "error",
        message: "generic error",
      })
    ).toEqual({
      genericError: true,
      isError: true,
      message: "generic error",
    })

    expect(
      ErrorBoundary.getDerivedStateFromError({
        name: "error",
        message: "Loading chunk c3495.js failed",
      })
    ).toEqual({
      asyncChunkLoadError: true,
      isError: true,
      message: "Loading chunk c3495.js failed",
    })
  })
})
