import { Modal } from "@artsy/palette"
import { mount } from "enzyme"
import { flushPromiseQueue } from "v2/DevTools"
import { ContentKey, PostRegistrationModal } from "../PostRegistrationModal"

const closeMock = jest.fn()
const defaultProps = {
  onClose: closeMock,
}

describe("AuctionRegistrationModal", () => {
  const mountModal = async (key: ContentKey) => {
    const wrapper = mount(
      <PostRegistrationModal onClose={closeMock} contentKey={key} />
    )

    // We need to await the promises to let this wrapper render
    await flushPromiseQueue()
    wrapper.update()
    return wrapper
  }

  beforeAll(jest.resetAllMocks)

  it("renders a registration confirmation modal", async () => {
    const wrapper = await mountModal("registrationConfirmed")

    expect(wrapper.find(Modal).text()).toMatch(
      "Thank you for registering.You’re now eligible to bid on lots in this sale."
    )
  })

  it("renders a registration pending modal", async () => {
    const wrapper = await mountModal("registrationPending")

    expect(wrapper.find(Modal).text()).toMatch(
      "Registration pendingArtsy is reviewing your registration"
    )
  })

  it("renders a registration pending modal with an IDV message", async () => {
    const wrapper = await mountModal("registrationPendingUnverified")

    expect(wrapper.find(Modal).text()).toMatch(
      "This auction requires Artsy to verify your identity before bidding."
    )
  })

  it("renders a bid pending modal", async () => {
    const wrapper = await mountModal("bidPending")

    expect(wrapper.find(Modal).text()).toMatch(
      "We're sorry, your bid could not be placed."
    )
  })

  // FIXME: Reaction migration
  it.skip("calls the onClose prop AFTER the modal show prop turns false", async () => {
    const wrapper = await mountModal("registrationConfirmed")
    expect(wrapper.find(Modal).prop("show")).toEqual(true)

    defaultProps.onClose.mockImplementationOnce(() => {
      expect(wrapper.find(Modal).prop("show")).toEqual(false)
    })
    wrapper.find("CloseIcon").simulate("click")
    await flushPromiseQueue()
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
