import { screen, fireEvent, render } from "@testing-library/react"
import {
  MyCollectionArtworkSWASectionDesktopLayout,
  MyCollectionArtworkSWASectionMobileLayout,
} from "../MyCollectionArtworkSWASection"

jest.unmock("react-relay")
const learnMore = jest.fn()

// TODO: add more tests when the main functionality is in place
describe("MyCollection Artwork SWA Section - mobile layout", () => {
  const getWrapper = () => {
    render(
      <MyCollectionArtworkSWASectionMobileLayout
        route={"/my-collection/submission/artwork-details/artwork-id"}
        learnMore={learnMore}
        slug={"slug"}
        artworkId={"artwork-id"}
      />
    )
  }

  it("opens Modal when Learn More is pressed", async () => {
    getWrapper()
    fireEvent.click(screen.getByTestId("learn-more"))
    expect(learnMore).toBeCalled()
  })

  it("the link has right attributes", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("submit-for-sale"))
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/my-collection/submission/artwork-details/artwork-id"
    )
  })
})

describe("MyCollection Artwork SWA Section - desktop layout", () => {
  const getWrapper = () => {
    render(
      <MyCollectionArtworkSWASectionDesktopLayout
        route={`/my-collection/submission/artwork-details/artwork-id`}
        learnMore={learnMore}
        slug={"slug"}
        artworkId={"artwork-id"}
      />
    )
  }

  it("opens Modal when Learn More is pressed", async () => {
    getWrapper()
    fireEvent.click(screen.getByTestId("learn-more-desktop"))
    expect(learnMore).toBeCalled()
  })

  it("the link has right attributes", async () => {
    getWrapper()

    fireEvent.click(screen.getByTestId("submit-for-sale-desktop"))
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/my-collection/submission/artwork-details/artwork-id"
    )
  })
})
