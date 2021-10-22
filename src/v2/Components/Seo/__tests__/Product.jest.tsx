import { mount } from "enzyme"
import { Product } from "../Product"
import { HeadProvider } from "react-head"

describe("Product", () => {
  const defaultProps = { data: {} }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <Product {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const data = { title: "Pretty Painting" }
    const props = { data }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "Product"')
    expect(script.text()).toMatch('"title": "Pretty Painting"')
  })
})
