import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { FairBoothRailFragmentContainer } from "../FairBoothRail"
import { graphql } from "react-relay"
import { FairBoothRail_Test_Query } from "v2/__generated__/FairBoothRail_Test_Query.graphql"
import { BoothFilterContextProvider } from "../BoothFilterContext"
import { fireEvent, screen } from "@testing-library/react"
import { AnalyticsContext } from "v2/System"
import { OwnerType } from "@artsy/cohesion"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { renderWithRelay } = setupTestWrapperTL<FairBoothRail_Test_Query>({
  Component: props => {
    if (props.show) {
      return (
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: "context-page-owner-id",
            contextPageOwnerSlug: "context-page-owner-slug",
            contextPageOwnerType: OwnerType.show,
          }}
        >
          <BoothFilterContextProvider filters={{ sort: "NAME_ASC", page: 2 }}>
            <FairBoothRailFragmentContainer show={props.show} />
          </BoothFilterContextProvider>
        </AnalyticsContext.Provider>
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
  const trackEvent = jest.fn()
  let originalWindowLocation: Location

  beforeAll(() => {
    originalWindowLocation = window.location

    // @ts-ignore
    delete window.location
    // @ts-ignore
    window.location = {
      assign: jest.fn(),
      pathname: "/fair/slug",
    }

    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterAll(() => {
    window.location = originalWindowLocation
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
    const endcodedUrl = encodeURIComponent("/fair/slug?sort=NAME_ASC&page=2")

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
      Array [
        Object {
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
