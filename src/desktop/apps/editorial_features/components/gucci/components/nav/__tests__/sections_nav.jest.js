import React from "react"
import sinon from "sinon"
import { mount } from "enzyme"
import { SectionsNav, SectionItem } from "../sections_nav"

describe("Gucci SectionsNav", () => {
  const props = {
    activeSection: null,
    sections: [{ title: "Past" }, { title: "Present" }, { title: "Future" }],
    onClick: sinon.stub(),
  }

  it("Renders the titles for each section", () => {
    const component = mount(<SectionsNav {...props} />)
    expect(component.html()).toMatch("Past")
    expect(component.html()).toMatch("Present")
    expect(component.html()).toMatch("Future")
  })

  it("Calls onClick with section index on title click", () => {
    const component = mount(<SectionsNav {...props} />)
    component
      .find(SectionItem)
      .last()
      .simulate("click")
    expect(props.onClick.args[0][0]).toBe(2)
  })
})
