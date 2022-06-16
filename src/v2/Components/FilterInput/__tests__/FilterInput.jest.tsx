import { mount } from "enzyme"
import { FilterInput } from "../FilterInput"

describe("FilterInput", () => {
  it("displays a clear button when input is present", () => {
    const wrapper = mount(<FilterInput />)

    expect(wrapper.find("Clickable")).toHaveLength(0)
    ;(wrapper.find("input").getDOMNode() as HTMLInputElement).value = "Hello"
    wrapper.find("input").simulate("change")

    expect(wrapper.find("Clickable")).toHaveLength(1)
  })

  it("clears the input when the clear button is clicked", () => {
    const wrapper = mount(<FilterInput value="Hello" />)

    expect(wrapper.find("input").prop("value")).toEqual("Hello")
    expect(wrapper.find("Clickable")).toHaveLength(1)

    wrapper.find("Clickable").simulate("click")

    expect(wrapper.find("input").prop("value")).toEqual("")
    expect(wrapper.find("Clickable")).toHaveLength(0)
  })
})
