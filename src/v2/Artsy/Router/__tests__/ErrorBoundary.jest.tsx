import { mount } from "enzyme"
import React from "react"
import { ErrorBoundary } from "../ErrorBoundary"

describe("ErrorBoundary", () => {
  const errorLog = console.error

  beforeEach(() => {
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
    expect(state.errorStack).toContain("Error: throw error")
  })

  it("shows error modal when genericError is true", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      genericError: true,
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorModalWithReload").length).toEqual(1)
  })

  it("shows error modal when asyncChunkLoadError is true", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      asyncChunkLoadError: true,
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorModalWithReload").length).toEqual(1)
  })

  it("it only shows ErrorModalWithReload if error is related to failed chunks", () => {
    expect(
      ErrorBoundary.getDerivedStateFromError({
        message: "generic error",
      })
    ).toEqual({
      genericError: true,
    })
    expect(
      ErrorBoundary.getDerivedStateFromError({
        message: "Loading chunk c3495.js failed",
      })
    ).toEqual({
      asyncChunkLoadError: true,
    })
  })
})
