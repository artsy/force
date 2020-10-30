import { mount } from "enzyme"
import React from "react"
import { NavItem } from "../NavItem"

jest.mock("v2/Artsy/Analytics/useTracking", () => {
  return {
    useTracking: () => ({
      trackEvent: jest.fn(),
    }),
  }
})

jest.mock("v2/Utils/Hooks/useMatchMedia")

jest.useFakeTimers()

describe("NavItem", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders proper content", () => {
    const wrapper = mount(
      <NavItem href="/some-link">hello how are you</NavItem>
    )
    expect(wrapper.html()).toContain("hello how are you")
    expect(wrapper.find("a").prop("href")).toContain("/some-link")
  })

  it("renders a Menu", () => {
    const wrapper = mount(
      <NavItem active href="/some-link" Menu={() => <div>Menu Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain("Menu Item")
  })

  it("passes a setIsVisible toggle to Menu component", () => {
    let toggle
    const wrapper = mount(
      <NavItem
        active
        href="/some-link"
        Menu={({ setIsVisible }) => {
          toggle = setIsVisible
          return <div>Menu Item</div>
        }}
      >
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain("Menu Item")
    expect(wrapper.html()).toContain('aria-expanded="true"')
    expect(wrapper.html()).not.toContain('aria-expanded="false"')
    toggle()
    expect(wrapper.html()).toContain("Menu Item")
    expect(wrapper.html()).toContain('aria-expanded="false"')
    expect(wrapper.html()).not.toContain('aria-expanded="true"')
  })

  it("shows / hides Menu on mouse interactions", () => {
    const wrapper = mount(
      <NavItem href="/some-link" Menu={() => <div>Menu Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain('aria-expanded="false"')
    wrapper.simulate("mouseenter")
    jest.runAllTimers()
    expect(wrapper.html()).toContain('aria-expanded="true"')
    wrapper.simulate("mouseleave")
    jest.runAllTimers()
    expect(wrapper.html()).toContain('aria-expanded="false"')
  })

  it("shows / hides Menu on button click", () => {
    const wrapper = mount(
      <NavItem href="/some-link" Menu={() => <div>Menu Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain('aria-expanded="false"')
    wrapper.find("button").simulate("click")
    expect(wrapper.html()).toContain('aria-expanded="true"')
    wrapper.find("button").simulate("click")
    expect(wrapper.html()).toContain('aria-expanded="false"')
  })

  it("renders a Overlay", () => {
    const wrapper = mount(
      <NavItem href="/some-link" Overlay={() => <div>Overlay Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain("Overlay Item")
  })

  it("calls onClick callbacks", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NavItem href="/some-link" onClick={spy}>
        hello how are you
      </NavItem>
    )
    wrapper.find("a").simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  it("supports renderProps for children", () => {
    const wrapper = mount(
      <NavItem href="/some-link" active>
        {({ hover }) => {
          expect(hover).toBe(true)
          return <div>hello renderprop</div>
        }}
      </NavItem>
    )

    expect(wrapper.html()).toContain("hello renderprop")
  })
})
