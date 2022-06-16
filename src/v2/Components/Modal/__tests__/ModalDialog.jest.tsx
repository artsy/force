import { mount } from "enzyme"
import { ModalButton, ModalDialog, ModalDialogProps } from "../ModalDialog"
import { ModalOverlay } from "../ModalWrapper"

describe("ModalDialog", () => {
  let defaultProps: ModalDialogProps

  const getWrapper = (props?: Partial<ModalDialogProps>) => {
    return mount(<ModalDialog {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    defaultProps = {
      heading: "Heading",
      primaryCta: {
        text: "Submit",
        action: jest.fn(),
      },
      show: true,
    }
  })

  describe("content", () => {
    it("shows the heading", () => {
      expect(getWrapper().text()).toMatch("Heading")
    })

    it("shows the cta button", () => {
      expect(getWrapper().text()).toMatch("Submit")
      expect(getWrapper().find(ModalButton).text()).toBe("Submit")
    })

    it("shows the detail if present", () => {
      const dialog = getWrapper({
        detail: "this is the detail",
      })
      expect(dialog.text()).toMatch("this is the detail")
    })

    it("shows the secondary cta button if present", () => {
      const dialog = getWrapper({
        secondaryCta: {
          text: "Cancel",
          action: jest.fn(),
        },
      })

      const buttons = dialog.find(ModalButton)

      expect(buttons).toHaveLength(2)

      expect(buttons.first().text()).toBe("Cancel")
      expect(buttons.last().text()).toBe("Submit")
    })

    it("Does not show when `show` is false", () => {
      const dialog = getWrapper({ show: false })

      expect(dialog.text()).toBe("")
      expect(dialog.find(ModalButton)).toHaveLength(0)
    })
  })

  describe("behaviour", () => {
    it("triggers the primary cta action", () => {
      const dialog = getWrapper()

      expect(defaultProps.primaryCta.action).not.toHaveBeenCalled()
      dialog.find(ModalButton).simulate("click")
      expect(defaultProps.primaryCta.action).toHaveBeenCalled()
    })

    it("triggers the secondary cta action", () => {
      const mockAction = jest.fn()
      const dialog = getWrapper({
        secondaryCta: {
          action: mockAction,
          text: "cancel",
        },
      })

      expect(mockAction).not.toHaveBeenCalled()
      dialog.find(ModalButton).first().simulate("click")
      expect(mockAction).toHaveBeenCalled()
      expect(defaultProps.primaryCta.action).not.toHaveBeenCalled()
    })

    it("triggers the onClose callback when the backdrop is clicked", () => {
      const mockOnClose = jest.fn()
      const dialog = getWrapper({
        onClose: mockOnClose,
      })

      expect(mockOnClose).not.toHaveBeenCalled()

      dialog.find(ModalOverlay).simulate("click")
      expect(mockOnClose).toHaveBeenCalled()
    })
  })
})
