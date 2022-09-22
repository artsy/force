import { screen, fireEvent, render } from "@testing-library/react"
import {
  MyCollectionArtworkSWASectionDesktopLayout,
  MyCollectionArtworkSWASectionMobileLayout,
} from "../MyCollectionArtworkSWASection"

jest.unmock("react-relay")
const onSubmit = jest.fn()
const learnMore = jest.fn()

// TODO: add more tests when the main functionality is in place
describe("MyCollection Artwork SWA Section - mobile layout", () => {
  const getWrapper = () => {
    render(
      <MyCollectionArtworkSWASectionMobileLayout
        onSubmit={onSubmit}
        learnMore={learnMore}
      />
    )
  }

  it("opens Modal when Learn More is pressed", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("learn-more"))
    expect(learnMore).toBeCalled()
  })

  it("opens the submission flow", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("submit-for-sale"))
    expect(onSubmit).toBeCalled()
  })
})

describe("MyCollection Artwork SWA Section - desktop layout", () => {
  const getWrapper = () => {
    render(
      <MyCollectionArtworkSWASectionDesktopLayout
        onSubmit={onSubmit}
        learnMore={learnMore}
      />
    )
  }

  it("opens Modal when Learn More is pressed", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("learn-more-desktop"))
    expect(learnMore).toBeCalled()
  })

  it("opens the submission flow", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("submit-for-sale-desktop"))
    expect(onSubmit).toBeCalled()
  })
})
