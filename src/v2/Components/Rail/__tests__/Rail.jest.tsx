import { mount } from "enzyme"
import { Rail } from "../Rail"

describe("Rail", () => {
  const getWrapper = props => {
    return mount(
      <Rail
        getItems={() => [<div>slide-1</div>, <div>slide-2</div>]}
        {...props}
      />
    )
  }

  it("renders and behaves correctly", () => {
    const spy = jest.fn()

    const wrapper = getWrapper({
      title: "Test Title",
      subTitle: "Test SubTitle",
      viewAllLabel: "Test View All",
      viewAllHref: "/test-href",
      viewAllOnClick: spy,
    })

    const text = wrapper.text()
    expect(text).toContain("Test Title")
    expect(text).toContain("Test SubTitle")
    expect(text).toContain("Test View All")
    expect(wrapper.html()).toContain("/test-href")
    expect(text).toContain("slide-1")
    expect(text).toContain("slide-2")

    wrapper.find('[href="/test-href"]').first().simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  it("shows isLoading state", () => {
    const wrapper = getWrapper({
      isLoading: true,
      title: "Test Title",
      subTitle: "Test SubTitle",
      getItems: () => [<div>slide-1</div>, <div>slide-2</div>],
    })

    expect(wrapper.find("SkeletonText").length).toBe(2)
  })
})
