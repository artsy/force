import { mount } from "enzyme"
import React from "react"
import { BreadCrumbList } from "../BreadCrumbList"
import { HeadProvider } from "react-head"

describe("BreadCrumbList", () => {
  const defaultProps = { items: [] }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <BreadCrumbList {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const wrapper = getWrapper()
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type":"BreadcrumbList"')
  })
})
