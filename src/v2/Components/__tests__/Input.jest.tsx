import { mount } from "enzyme"
import "jest-styled-components"
import renderer from "react-test-renderer"

import Input from "../Input"

describe("Input", () => {
  it("renders an input with no metadata", () => {
    const wrapper = mount(<Input />)

    expect(wrapper.find("input").length).toEqual(1)
  })

  it("passes supported props through to input", () => {
    const wrapper = mount(<Input type="password" placeholder="a placeholder" />)

    const inputProps = wrapper.find("input").props()

    expect(inputProps.type).toEqual("password")
    expect(inputProps.placeholder).toEqual("a placeholder")
  })

  it("renders the input metadata", () => {
    const wrapper = mount(
      <Input
        title="hello"
        description="This is a field"
        error="But something went wrong!"
      />
    )

    const actual = wrapper.text()
    expect(actual).toContain("hello")
    expect(actual).toContain("This is a field")
    expect(actual).toContain("But something went wrong!")
  })

  it("renders as a snapshot", () => {
    const component = renderer
      .create(
        <Input
          type="password"
          placeholder="a placeholder"
          title="hello"
          description="This is a field"
          error="But something went wrong!"
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
