import { mount } from "enzyme"
import "jest-styled-components"
import renderer from "react-test-renderer"

import { PasswordInput } from "../PasswordInput"

describe("PasswordInput", () => {
  it("renders a PasswordInput", () => {
    const wrapper = mount(<PasswordInput />)

    expect(wrapper.find("input").length).toEqual(1)
  })

  it("renders masked by default", () => {
    const wrapper = mount(<PasswordInput />)

    expect(wrapper.find('input[type="password"]').length).toEqual(1)
    expect(wrapper.find('input[type="text"]').length).toEqual(0)
  })

  it("renders masked as a snapshot", () => {
    const component = renderer.create(<PasswordInput />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders unmasked if you click on the eye", () => {
    const wrapper = mount(<PasswordInput />)

    const icon = wrapper.find("svg")
    icon.simulate("click")

    expect(wrapper.find('input[type="password"]').length).toEqual(0)
    expect(wrapper.find('input[type="text"]').length).toEqual(1)
  })

  it("renders unmasked as a snapshot", () => {
    const component = renderer.create(<PasswordInput />)

    const root = component.root
    const input = root.find(element => element.type === "svg")
    input.props.onClick()

    expect(component.toJSON()).toMatchSnapshot()
  })

  it("shows error instead of note when error exists", () => {
    const wrapper = mount(
      <PasswordInput note="This is a note" error="But this is an error" />
    )

    const text = wrapper.text()
    expect(text).not.toContain("This is a note")
    expect(text).toContain("But this is an error")
  })
})
