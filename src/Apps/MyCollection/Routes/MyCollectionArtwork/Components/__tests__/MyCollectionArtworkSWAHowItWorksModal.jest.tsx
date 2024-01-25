import { screen, fireEvent } from "@testing-library/react"
import { MyCollectionArtworkSWAHowItWorksModal } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWAHowItWorksModal"
import { mount } from "DevTools/mountWithMockBoot"

jest.unmock("react-relay")
const onClose = jest.fn()

// TODO: add more tests when the main functionality is in place
describe("MyCollectionArtworkSWAHowItWorksModal", () => {
  const getWrapper = () => {
    return mount(<MyCollectionArtworkSWAHowItWorksModal onClose={onClose} />)
  }

  it("the modal can be clossed", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("modal-close-button"))
    expect(onClose).toBeCalled()
  })

  it("renders the support mailto link", async () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain("mailto:sell@artsy.net")
  })

  it("navigates to the Collector Help Center article", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").first().props().to).toBe(
      "https://support.artsy.net/s/topic/0TO3b000000UevOGAS/sell-with-artsy"
    )
  })
})
