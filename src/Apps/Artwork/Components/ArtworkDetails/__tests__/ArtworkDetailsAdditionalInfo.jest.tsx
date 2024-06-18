import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"
import { ArtworkDetailsAdditionalInfo_Test_Query } from "__generated__/ArtworkDetailsAdditionalInfo_Test_Query.graphql"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { ArtworkDetailsAdditionalInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsAdditionalInfo"
import { fireEvent, screen } from "@testing-library/react"
import { useSelectedEditionSetContext } from "Apps/Artwork/Components/SelectedEditionSetContext"

jest.unmock("react-relay")

jest.mock("react-tracking")

jest.mock("Apps/Artwork/Components/SelectedEditionSetContext")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkDetailsAdditionalInfo_Test_Query
>({
  Component: props => {
    return (
      <MockBoot>
        <AnalyticsCombinedContextProvider
          contextPageOwnerId="example-artwork-id"
          path="/artwork/example-artwork-slug"
        >
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <ArtworkDetailsAdditionalInfoFragmentContainer {...props} />
        </AnalyticsCombinedContextProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkDetailsAdditionalInfo_Test_Query @relay_test_operation {
      artwork(id: "xxx") {
        ...ArtworkDetailsAdditionalInfo_artwork
      }
    }
  `,
})

describe("ArtworkDetailsAdditionalInfo", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  beforeEach(() => {
    ;(useSelectedEditionSetContext as jest.Mock).mockImplementation(() => ({
      selectedEditionSet: null,
    }))
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({ category: "Painting" }),
    })

    expect(screen.queryByText("Medium")).toBeInTheDocument()
    expect(screen.queryByText("Painting")).toBeInTheDocument()
  })

  it("renders size materials and rarity if they exist", () => {
    renderWithRelay({
      Artwork: () => ({
        attributionClass: {
          name: "Unique",
        },
        dimensions: {
          cm: "135.3 × 84.5 cm",
          in: "53 1/4 × 33 1/4 in",
        },
        medium:
          "Oil on cotton, hand-dyed silk organza, backed with vintage kantha quilt",
      }),
    })

    expect(
      screen.queryByText(
        "Oil on cotton, hand-dyed silk organza, backed with vintage kantha quilt"
      )
    ).toBeInTheDocument()
    expect(screen.queryByText("Unique")).toBeInTheDocument()
    expect(
      screen.queryByText("53 1/4 × 33 1/4 in | 135.3 × 84.5 cm")
    ).toBeInTheDocument()
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

    it("tracks the click on rarity", () => {
      renderWithRelay({
        Artwork: () => ({ attributionClass: { name: "Unique" } }),
      })

      fireEvent.click(screen.getByText("Unique"))

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "aboutTheWork",
        context_page_owner_id: "example-artwork-id",
        context_page_owner_slug: "example-artwork-slug",
        context_page_owner_type: "artwork",
        subject: "Rarity type info",
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

    it("shows dimensions from selected edition", () => {
      ;(useSelectedEditionSetContext as jest.Mock).mockImplementation(() => ({
        selectedEditionSet: {
          dimensions: {
            in: "10 × 15 in",
            cm: "20 × 30 cm",
          },
        },
      }))

      renderWithRelay({
        Artwork: () => ({
          dimensions: { in: "1 × 2 in", cm: "2 × 5 cm" },
        }),
      })
      expect(screen.queryByText("10 × 15 in | 20 × 30 cm")).toBeInTheDocument()
    })
  })
})
