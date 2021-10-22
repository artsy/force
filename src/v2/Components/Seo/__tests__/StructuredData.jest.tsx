import { mount } from "enzyme"
import { StructuredData } from "../StructuredData"
import { HeadProvider } from "react-head"

describe("StructuredData", () => {
  const defaultProps = {}

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <StructuredData {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("renders a script tag with the right type", () => {
    const wrapper = getWrapper()
    const script = wrapper.find("script")
    expect(script).toHaveLength(1)
    expect(script.prop("type")).toEqual("application/ld+json")
  })

  it("renders schema content", () => {
    const schemaData = { "@type": "Object", foo: "bar" }
    const props = { schemaData }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "Object"')
    expect(script.text()).toMatch('"foo": "bar"')
  })

  it("sets the context", () => {
    const wrapper = getWrapper()
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@context": "http://schema.org"')
  })
})
