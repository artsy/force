import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"
import { PrivateArtworkAdditionalInfo_Test_Query } from "__generated__/PrivateArtworkAdditionalInfo_Test_Query.graphql"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent, screen } from "@testing-library/react"
import { PrivateArtworkAdditionalInfo } from "Apps/Artwork/Components/ArtworkSidebar/PrivateArtworkAdditionalInfo"

jest.unmock("react-relay")

jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL<
  PrivateArtworkAdditionalInfo_Test_Query
>({
  Component: ({ artwork }) => {
    return (
      <MockBoot>
        <AnalyticsCombinedContextProvider
          contextPageOwnerId="example-artwork-id"
          path="/artwork/example-artwork-slug"
        >
          <PrivateArtworkAdditionalInfo artwork={artwork!} />
        </AnalyticsCombinedContextProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query PrivateArtworkAdditionalInfo_Test_Query @relay_test_operation {
      artwork(id: "xxx") {
        ...PrivateArtworkAdditionalInfo_artwork
      }
    }
  `,
})

describe("PrivateArtworkAdditionalInfo", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({ category: "Painting" }),
    })

    expect(screen.queryByText("Medium")).toBeInTheDocument()
    expect(screen.queryByText("Painting")).toBeInTheDocument()
  })

  describe("Tracking", () => {
    it("tracks the click on medium type", () => {
      renderWithRelay({
        Artwork: () => ({ category: "Painting" }),
      })

      fireEvent.click(screen.getByText("Painting"))

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "aboutTheWork",
        context_page_owner_id: "example-artwork-id",
        context_page_owner_slug: "example-artwork-slug",
        context_page_owner_type: "artwork",
        subject: "Medium type info",
        type: "Link",
      })

      expect(trackEvent).toBeCalledTimes(1)
    })

    it("tracks the click on Condition read more", () => {
      renderWithRelay({
        Artwork: () => ({
          conditionDescription: {
            details:
              "Excellent condition. Unframed Additional condition and detail images are available upon request. Please reach out to specialist@artsymail.com for further details.",
          },
        }),
      })

      fireEvent.click(screen.getByText("Read more"))

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Condition",
        subject: "Read more",
      })

      expect(trackEvent).toBeCalledTimes(1)
    })
  })
})
