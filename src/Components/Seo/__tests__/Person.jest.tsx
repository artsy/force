import { mount } from "enzyme"
import { Person } from "../Person"
import { HeadProvider } from "react-head"

describe("Person", () => {
  const defaultProps = { data: {} }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <Person {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const data = { name: "Suzy Sculptor" }
    const props = { data }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "Person"')
    expect(script.text()).toMatch('"name": "Suzy Sculptor"')
  })
})
