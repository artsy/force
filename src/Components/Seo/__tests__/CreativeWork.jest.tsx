import { mount } from "enzyme"
import { CreativeWork } from "../CreativeWork"
import { HeadProvider } from "react-head"

describe("CreativeWork", () => {
  const defaultProps = { data: {} }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <CreativeWork {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const data = { title: "Pretty Painting" }
    const props = { data }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "CreativeWork"')
    expect(script.text()).toMatch('"title": "Pretty Painting"')
  })
})
