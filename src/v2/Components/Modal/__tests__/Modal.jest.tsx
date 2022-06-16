import { mount } from "enzyme"
import { Image, Modal, ModalContent } from "../Modal"
import { ModalCta } from "../ModalCta"
import { ModalHeader } from "../ModalHeader"

describe("Modal", () => {
  const getWrapper = inputs => {
    return mount(
      <Modal {...inputs}>
        <div>Modal Contents</div>
      </Modal>
    )
  }

  let props
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      blurContainerSelector: "",
    }
  })

  describe("Modal content", () => {
    beforeEach(() => {
      props.show = true
    })

    it("Renders ModalHeader if props.title", () => {
      props.title = "Log In"
      const component = getWrapper(props)

      expect(component.find(ModalHeader)).toHaveLength(1)
      expect(component.html()).toMatch("Log In")
    })

    it("Renders ModalHeader if props.hasLogo", () => {
      props.hasLogo = true
      const component = getWrapper(props)

      expect(component.find(ModalHeader)).toHaveLength(1)
      expect(component.find("Icon")).toHaveLength(2)
    })

    it("Renders ModalCta if props.cta", () => {
      props.cta = {
        text: "Learn More",
        onClick: jest.fn(),
      }
      const component = getWrapper(props)

      expect(component.find(ModalCta)).toHaveLength(1)
      expect(component.html()).toMatch("Learn More")
    })

    it("Renders Image if props.image", () => {
      props.image = "an_image.jpg"
      const component = getWrapper(props)

      expect(component.find(Image)).toHaveLength(1)
      expect(component.find(ModalContent)).toHaveLength(1)
    })
  })
})
