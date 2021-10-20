import { mount } from "enzyme"
import { RailHeaderTitle } from "../RailHeader"

describe("RailHeaderTitle", () => {
  it("returns the text with no viewAllHref", () => {
    const wrapper = mount(<RailHeaderTitle title="Awesome Auction" />)
    expect(wrapper.html()).toEqual("Awesome Auction")
  })

  it("returns a RouterLink with a viewAllHref", () => {
    const wrapper = mount(
      <RailHeaderTitle
        title="Awesome Auction"
        viewAllHref="/auction/awesome-auction"
      />
    )
    expect(wrapper.html()).toContain('<a href="/auction/awesome-auction"')
    expect(wrapper.html()).toContain("Awesome Auction")
  })
})
