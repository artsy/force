import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { FairBoothRailFragmentContainer } from "Apps/Fair/Components/FairBoothRail"
import { graphql } from "react-relay"
import { FairBoothRail_Test_Query } from "__generated__/FairBoothRail_Test_Query.graphql"
import { BoothFilterContextProvider } from "Apps/Fair/Components/BoothFilterContext"
import { fireEvent, screen } from "@testing-library/react"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { useTracking } from "react-tracking"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")

const { renderWithRelay } = setupTestWrapperTL<FairBoothRail_Test_Query>({
  Component: props => {
    if (props.show) {
      return (
        <AnalyticsCombinedContextProvider
          contextPageOwnerId="context-page-owner-id"
          path="/show/context-page-owner-slug"
        >
          <BoothFilterContextProvider filters={{ sort: "NAME_ASC", page: 2 }}>
            <FairBoothRailFragmentContainer show={props.show} />
          </BoothFilterContextProvider>
        </AnalyticsCombinedContextProvider>
      )
    }

    return null
  },
  query: graphql`
    query FairBoothRail_Test_Query @relay_test_operation {
      show(id: "show-id") {
        ...FairBoothRail_show
      }
    }
  `,
})

describe("FairBoothRail", () => {
  const mockTracking = useTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/slug",
        },
      },
    }))

    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("should render links", () => {
    renderWithRelay({
      Show: () => Show,
      Partner: () => Partner,
    })

    const links = screen.getAllByRole("link")

    expect(links[0]).toHaveTextContent("Partner Name")
    expect(links[1]).toHaveTextContent("View")
  })

  it("should include filters in `back_to_fair_href` query param", () => {
    renderWithRelay({
      Show: () => Show,
      Partner: () => Partner,
    })

    const link = screen.getAllByRole("link")[0]
    const endcodedUrl = encodeURIComponent(
      "/fair/slug?sort=NAME_ASC&page=2&focused_booths=true"
    )

    expect(link).toHaveAttribute(
      "href",
      `/show/slug?back_to_fair_href=${endcodedUrl}`
    )
  })

  it("should correctly track analytics when link is clicked", () => {
    renderWithRelay({
      Show: () => Show,
      Partner: () => Partner,
    })

    const link = screen.getAllByRole("link")[0]

    fireEvent.click(link)

    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "action": "clickedArtworkGroup",
          "context_module": "galleryBoothRail",
          "context_page_owner_id": "context-page-owner-id",
          "context_page_owner_slug": "context-page-owner-slug",
          "context_page_owner_type": "show",
          "destination_page_owner_id": "show-id",
          "destination_page_owner_slug": "slug",
          "destination_page_owner_type": "show",
          "type": "viewAll",
        },
      ]
    `)
  })
})

const Show = {
  href: "/show/slug",
  slug: "slug",
  internalID: "show-id",
}

const Partner = {
  name: "Partner Name",
}
