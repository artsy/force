import { ShowContextCardFragmentContainer } from "Apps/Show/Components/ShowContextCard"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import type { ShowContextCardTestQuery } from "__generated__/ShowContextCardTestQuery.graphql"
import { screen, fireEvent } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL<ShowContextCardTestQuery>({
  Component: props => (
    <AnalyticsCombinedContextProvider
      contextPageOwnerId="example-show-id"
      path="/show/example-show-slug"
    >
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ShowContextCardFragmentContainer {...props} />
    </AnalyticsCombinedContextProvider>
  ),
  query: graphql`
    query ShowContextCardTestQuery @relay_test_operation {
      show(id: "xxx") {
        ...ShowContextCard_show
      }
    }
  `,
})

describe("ShowContextCard", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly for a fair", () => {
    const { container } = renderWithRelay({
      Fair: () => {
        return {
          name: "Catty Art Fair",
        }
      },
    })
    expect(container.innerHTML).toContain(
      'Presented by &lt;mock-value-for-field-"name"&gt;',
    )
  })

  it("renders correctly for a partner", () => {
    renderWithRelay({
      Show: () => {
        return {
          isFairBooth: false,
        }
      },
      Partner: () => {
        return {
          name: "Catty Gallery",
          locations: [{ city: "Wakefield" }],
        }
      },
    })
    expect(screen.getByText("Presented by Catty Gallery")).toBeInTheDocument()
    expect(screen.getByText("Wakefield")).toBeInTheDocument()
  })

  it("tracks clicks for partner cards", () => {
    renderWithRelay({
      Show: () => ({ isFairBooth: false }),
      Partner: () => ({
        internalID: "catty-gallery-id",
        slug: "catty-gallery-slug",
      }),
    })

    const linkElement = screen.getByRole("link")
    fireEvent.click(linkElement)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedPartnerCard",
      context_module: "presentingPartner",
      context_page_owner_id: "example-show-id",
      context_page_owner_slug: "example-show-slug",
      context_page_owner_type: "show",
      destination_page_owner_id: "catty-gallery-id",
      destination_page_owner_slug: "catty-gallery-slug",
      destination_page_owner_type: "partner",
      type: "thumbnail",
    })

    expect(trackEvent).toBeCalledTimes(1)
  })

  it("tracks clicks for fair cards", () => {
    renderWithRelay({
      Show: () => ({ isFairBooth: true }),
      Fair: () => ({
        internalID: "catty-fair-id",
        slug: "catty-fair-slug",
      }),
    })

    const linkElement = screen.getByRole("link")
    fireEvent.click(linkElement)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedFairCard",
      context_module: "presentingFair",
      context_page_owner_id: "example-show-id",
      context_page_owner_slug: "example-show-slug",
      context_page_owner_type: "show",
      destination_page_owner_id: "catty-fair-id",
      destination_page_owner_slug: "catty-fair-slug",
      destination_page_owner_type: "fair",
      type: "thumbnail",
    })

    expect(trackEvent).toBeCalledTimes(1)
  })
})
