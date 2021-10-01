import { mount } from "enzyme"
import React from "react"
import { Rail } from "../Rail"

describe("Rail", () => {
  const getWrapper = props => {
    return mount(<Rail {...props} />)
  }

  it("renders and behaves correctly", () => {
    const spy = jest.fn()

    const wrapper = getWrapper({
      title: "Test Title",
      viewAllLabel: "Test View All",
      viewAllHref: "/test-href",
      viewAllOnClick: spy,
      getItems: () => [<div>slide-1</div>, <div>slide-2</div>],
    })

    const text = wrapper.text()
    expect(text).toContain("Test Title")
    expect(text).toContain("Test View All")
    expect(wrapper.html()).toContain("/test-href")
    expect(text).toContain("slide-1")
    expect(text).toContain("slide-2")

    wrapper.find('[href="/test-href"]').first().simulate("click")
    expect(spy).toHaveBeenCalled()
  })
})
