import { mount } from "enzyme"
import { ModalHeader } from "../ModalHeader"

describe("ModalHeader", () => {
  const getWrapper = _props => {
    return mount(<ModalHeader {..._props} />)
  }
  let props
  beforeAll(() => {
    props = {
      hasLogo: false,
      title: "Log In",
    }
  })

  it("Renders title if present", () => {
    const component = getWrapper(props)
    expect(component.html()).toMatch("Log In")
    expect(component.find("Icon")).toHaveLength(0)
  })

  it("Renders logo if present", () => {
    props.hasLogo = true
    const component = getWrapper(props)
    expect(component.find("Icon")).toHaveLength(1)
  })
})
