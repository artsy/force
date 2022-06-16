import { mount } from "enzyme"
import { ModalCta } from "../ModalCta"

describe("ModalCta", () => {
  const getWrapper = _props => {
    return mount(<ModalCta {..._props} />)
  }
  let props
  beforeAll(() => {
    props = {
      cta: {
        isFixed: false,
        onClick: jest.fn(),
        text: "Learn More",
      },
      hasImage: false,
      onClose: jest.fn(),
    }
  })

  it("Renders button text", () => {
    const component = getWrapper(props)
    expect(component.html()).toMatch("Learn More")
  })

  it("Calls props.cta.onClick on click if provided", () => {
    const component = getWrapper(props)
    component.find("button").at(0).simulate("click")
    expect(props.cta.onClick).toBeCalled()
  })

  it("Calls props.onClose if no props.cta.onClick", () => {
    props.cta.onClick = null
    const component = getWrapper(props)
    component.find("button").at(0).simulate("click")

    expect(props.onClose).toBeCalled()
  })
})
