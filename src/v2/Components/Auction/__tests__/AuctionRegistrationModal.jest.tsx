import { Button, Checkbox, Modal } from "@artsy/palette"
import { mount } from "enzyme"
import "jest-styled-components"
import { act } from "react-dom/test-utils"
import { flushPromiseQueue } from "v2/DevTools"
import { AuctionRegistrationModal } from "../AuctionRegistrationModal"

const submitMock = jest.fn()
const closeMock = jest.fn()
const defaultProps = {
  onSubmit: submitMock,
  onClose: closeMock,
  auction: {
    name: "Big Sale",
    id: 1,
    requireIdentityVerification: false,
  },
  me: {
    identityVerified: false,
  },
}

describe("AuctionRegistrationModal", () => {
  const mountComponent = async (props = {}) => {
    const wrapper = mount(
      <AuctionRegistrationModal {...defaultProps} {...props} />
    )
    jest.restoreAllMocks()
    // We need to await the promises to let this wrapper render
    await flushPromiseQueue()
    wrapper.update()
    return wrapper
  }

  it("renders a Modal with the sale name", async () => {
    const wrapper = await mountComponent()

    expect(wrapper.find(Modal).text()).toMatch("Register for Big Sale")
    expect(wrapper.find(Modal).text()).toMatch(
      "Welcome back. To complete your registration, please confirm that you agree to the Conditions of Sale."
    )
  })

  it("shows a registration message if the sale requires IDV and the user is verified", async () => {
    const wrapper = await mountComponent({
      auction: {
        name: "IDV Sale",
        requireIdentityVerification: true,
      },
      me: {
        identityVerified: true,
      },
    })

    expect(wrapper.find(Modal).text()).toMatch("Register for IDV Sale")
    expect(wrapper.find(Modal).text()).toMatch(
      "Welcome back. To complete your registration, please confirm that you agree to the Conditions of Sale."
    )
  })

  it("shows an IDV registration message if the sale requires IDV and the user is not verified", async () => {
    const wrapper = await mountComponent({
      auction: {
        name: "IDV Sale",
        requireIdentityVerification: true,
      },
      me: {
        identityVerified: false,
      },
    })

    expect(wrapper.find(Modal).text()).toMatch("Register for IDV Sale")
    expect(wrapper.find(Modal).text()).toMatch(
      "This auction requires Artsy to verify your identity before bidding."
    )
  })

  it("adds an error when trying to submit without accepting terms", async () => {
    const wrapper = await mountComponent()

    wrapper.find(Button).simulate("click")
    await flushPromiseQueue()
    expect(wrapper.text()).toMatch("You must agree to our terms.")
  })

  it("calls the onSubmit prop when trying to submit after accepting terms", async () => {
    const wrapper = await mountComponent()

    act(() => {
      wrapper.find(Checkbox).prop("onSelect")(true)
    })

    await flushPromiseQueue()
    wrapper.find(Button).simulate("click")
    expect(wrapper.text()).not.toMatch("You must agree to our terms.")
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  it("calls the onClose prop AFTER the modal show prop turns false", async () => {
    const wrapper = await mountComponent()

    expect(wrapper.find(Modal).prop("show")).toEqual(true)

    defaultProps.onClose.mockImplementationOnce(() => {
      // FIXME: Reaction migration
      // expect(wrapper.find(Modal).prop("show")).toEqual(false)
    })
    wrapper.find("CloseIcon").simulate("click")
    await flushPromiseQueue()
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
