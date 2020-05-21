import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import request from "superagent"
import { EmailPanel } from "../EmailPanel"

jest.mock("superagent", () => {
  const end = jest.fn()
  const set = jest.fn().mockReturnValue({ end })
  const send = jest.fn().mockReturnValue({ set })
  const post = jest.fn().mockReturnValue({ send })
  return { post, set, send, end }
})
jest.useFakeTimers()

describe("EmailSignup", () => {
  const trackEvent = jest.fn()
  const wrapper = (props = {}) => {
    return <EmailPanel signupUrl="#" tracking={{ trackEvent } as any} />
  }

  it("renders an email signup", () => {
    const emailSignup = renderer.create(wrapper())
    expect(emailSignup).toMatchSnapshot()
  })

  it("submits an email and removes itself when successful", () => {
    const viewer = mount(wrapper())
    viewer.setState({ value: "foo@goo.net" })
    viewer.find("button").simulate("click")
    expect(request.post).toBeCalled()
    expect(request.send.mock.calls[0][0].email).toEqual("foo@goo.net")
    request.end.mock.calls[0][0]()
    const state = viewer.state() as any
    expect(state.message).toEqual("Thank you!")

    jest.runAllTimers()
    const postTimeoutState = viewer.state() as any
    expect(postTimeoutState.submitted).toBe(true)
    expect(postTimeoutState.disabled).toBe(false)
    expect(postTimeoutState.message).toEqual("")
  })

  it("handles signup errors", () => {
    const viewer = mount(wrapper())
    viewer.setState({ value: "foo@goo.net" })
    viewer.find("button").simulate("click")
    expect(request.post).toBeCalled()
    request.end.mock.calls[1][0]("Error")
    const state = viewer.state() as any
    expect(state.message).toEqual("Error. Please try again")
    expect(state.error).toBe(true)

    jest.runAllTimers()
    const postTimeoutState = viewer.state() as any
    expect(postTimeoutState.disabled).toBe(false)
    expect(postTimeoutState.error).toBe(false)
    expect(postTimeoutState.message).toEqual("")
  })

  it("validates email addresses", () => {
    const viewer = mount(wrapper())
    viewer.setState({ value: "foo" })
    viewer.find("button").simulate("click")
    const state = viewer.state() as any
    expect(state.message).toEqual("Invalid Email... Please try again")
    expect(state.error).toBe(true)

    jest.runAllTimers()
    const postTimeoutState = viewer.state() as any
    expect(postTimeoutState.disabled).toBe(false)
    expect(postTimeoutState.error).toBe(false)
    expect(postTimeoutState.message).toEqual("")
  })

  it("tracks sign ups", () => {
    const viewer = mount(wrapper())
    viewer.setState({ value: "foo@goo.net" })
    viewer.find("button").simulate("click")

    jest.runAllTimers()
    expect(trackEvent.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        action: "Sign up for editorial email",
        context_type: "article_fixed",
      })
    )
  })
})
