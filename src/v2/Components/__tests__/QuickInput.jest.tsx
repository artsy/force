import { mount } from "enzyme"
import "jest-styled-components"
import renderer from "react-test-renderer"

import QuickInput from "../QuickInput"

describe("QuickInput", () => {
  it("renders a QuickInput", () => {
    const wrapper = mount(<QuickInput />)

    expect(wrapper.find("input").length).toEqual(1)
  })

  it("renders a QuickInput with metadata", () => {
    const rightAddOn = <div>right side</div>

    const wrapper = mount(
      <QuickInput
        error="an error"
        label="some label"
        note="a note"
        rightAddOn={rightAddOn}
      />
    )

    const actual = wrapper.text()
    expect(actual).toContain("a note")
    expect(actual).toContain("an error")
    expect(actual).toContain("some label")
    expect(actual).toContain("right side")
  })

  it("renders an unfocused QuickInput as a snapshot", () => {
    const rightAddOn = <div>right side</div>
    const component = renderer
      .create(
        <QuickInput
          error="an error"
          label="some label"
          note="a note"
          rightAddOn={rightAddOn}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("renders a focused QuickInput as a snapshot", () => {
    const rightAddOn = <div>right side</div>
    const component = renderer.create(
      <QuickInput
        error="an error"
        label="some label"
        note="a note"
        rightAddOn={rightAddOn}
      />
    )

    const root = component.root
    const input = root.find(element => element.type === "input")
    input.props.onFocus()

    expect(component.toJSON()).toMatchSnapshot()
  })
})
