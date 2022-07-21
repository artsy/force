import { mount } from "enzyme"
import { Text } from "@artsy/palette"
import { InfoSection } from "../InfoSection"

describe("InfoSection", () => {
  it("shows plain text", () => {
    const wrapper = mount(
      <InfoSection info={"<strong>Info example</strong>"} type="text" />
    )
    expect(wrapper.find("HTML").length).toEqual(0)
    expect(wrapper.find("TextWithNewlines").length).toEqual(1)
    expect(wrapper.find("TextWithNewlines").text()).toEqual(
      "<strong>Info example</strong>"
    )
  })

  it("shows html", () => {
    const wrapper = mount(
      <InfoSection info={"<strong>Info example</strong>"} type="html" />
    )
    expect(wrapper.find("TextWithNewlines").length).toEqual(0)
    expect(wrapper.find("HTML").length).toEqual(1)
    expect(wrapper.find("HTML").text()).toEqual("Info example")
  })

  it("shows passed JSX", () => {
    const wrapper = mount(
      <InfoSection
        info={
          <>
            <Text>Info item</Text>
            <Text>Another item</Text>
          </>
        }
      />
    )
    expect(wrapper.find("TextWithNewlines").length).toEqual(0)
    expect(wrapper.find("HTML").length).toEqual(0)
    expect(wrapper.find("Text").length).toEqual(2)
    expect(wrapper.text()).toContain("Info item")
    expect(wrapper.text()).toContain("Another item")
  })

  it("shows label", () => {
    const wrapper = mount(
      <InfoSection info={"Info example"} type="text" label="About:" />
    )
    expect(wrapper.find("Text").length).toEqual(1)
    expect(wrapper.find("Text").text()).toEqual("About:")
  })
})
