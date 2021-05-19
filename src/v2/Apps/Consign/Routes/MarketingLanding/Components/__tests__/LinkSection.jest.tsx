import React from "react"
import { mount } from "enzyme"
import { LinkSection } from "../LinkSection"

describe("LinkSection", () => {
  const props = {
    title: "Title Example",
    buttonText: "Button Text Example",
    link: "Link Example",
    text: "Text as string",
  }

  it("has correct title, text, button text and link", () => {
    const wrapper = mount(<LinkSection {...props} />)

    expect(wrapper.find("Text").first().text()).toBe("Title Example")
    expect(wrapper.find("Text").at(1).text()).toBe("Text as string")

    expect(wrapper.find("Button").first().text()).toBe("Button Text Example")
    expect(wrapper.find("Button").last().text()).toBe("Button Text Example")

    expect(wrapper.find("Link").first().props().href).toBe("Link Example")
    expect(wrapper.find("Link").at(1).props().href).toBe("Link Example")
  })

  it("renders text passed as component correctly", () => {
    const wrapper = mount(
      <LinkSection
        {...props}
        text={() => (
          <>
            Simple <span>text</span>
          </>
        )}
      />
    )
    expect(wrapper.find("Text").at(1).text()).toBe("Simple text")
  })

  it("renders light background correctly", () => {
    const wrapper = mount(<LinkSection {...props} />)
    expect(wrapper.find("SectionContainer").first().prop("background")).toBe(
      "black5"
    )
  })

  it("renders dark background correctly", () => {
    const wrapper = mount(<LinkSection {...props} darkVariant />)
    expect(wrapper.find("SectionContainer").first().prop("background")).toBe(
      "black100"
    )
  })
})
