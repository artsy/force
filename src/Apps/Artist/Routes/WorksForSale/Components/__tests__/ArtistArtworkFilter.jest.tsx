import { render, screen } from "@testing-library/react"
import {
  ArtistArtworkFilter,
  ArtistArtworkFilterQueryRenderer,
  ArtistArtworkFilterRefetchContainer,
} from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtistArtworkFilterTestQuery } from "__generated__/ArtistArtworkFilterTestQuery.graphql"
import type { ArtistArtworkFilter_artist$data } from "__generated__/ArtistArtworkFilter_artist.graphql"
import { graphql } from "react-relay"
import { fetchQuery } from "react-relay"
import type { RelayRefetchProp } from "react-relay"
import { useTracking } from "react-tracking"

interface Props {
  context?: Record<string, any>
}

const mockUseRouter = jest.fn()

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => mockUseRouter(),
}))

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("System/Relay/SystemQueryRenderer", () => ({
  SystemQueryRenderer: jest.fn(({ render }) => {
    return render({ error: null, props: null, retry: null })
  }),
}))
;(fetchQuery as jest.Mock).mockImplementation(() => ({
  toPromise: jest.fn().mockResolvedValue({}),
}))

const getWrapper = (props: Props = {}) => {
  const { context = {} } = props

  return setupTestWrapperTL<ArtistArtworkFilterTestQuery>({
    Component: props => {
      if (props.artist) {
        return (
          <MockBoot context={context}>
            <ArtistArtworkFilterRefetchContainer
              artist={props.artist}
              aggregations={[]}
            />
          </MockBoot>
        )
      }

      return null
    },
    query: graphql`
      query ArtistArtworkFilterTestQuery @relay_test_operation {
        artist(id: "example") {
          ...ArtistArtworkFilter_artist
        }
      }
    `,
  })
}

describe("ArtistArtworkFilter", () => {
  const mockUseTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      match: {
        params: { artistID: "example-artist" },
        location: {
          pathname: "anything",
          query: {},
        },
      },
    })
  })

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("renders component", () => {
    const { renderWithRelay } = getWrapper()

    renderWithRelay()

    expect(screen.getByText("Sort: Recommended")).toBeInTheDocument()
  })

  it("renders empty-state filter shell when filtered_artworks is missing", () => {
    render(
      <MockBoot>
        <ArtistArtworkFilter
          artist={
            {
              id: "artist-id",
              internalID: "artist-internal-id",
              name: "Example Artist",
              slug: "example-artist",
              counts: {
                for_sale_artworks: 0,
                ecommerce_artworks: 0,
                auction_artworks: 0,
                artworks: 0,
                has_make_offer_artworks: false,
              },
              filtered_artworks: null,
            } as ArtistArtworkFilter_artist$data
          }
          aggregations={[]}
          relay={
            {
              refetch: () => ({ dispose: () => {} }),
            } as unknown as RelayRefetchProp
          }
        />
      </MockBoot>,
    )

    expect(screen.getAllByText("Price Range").length).toBeGreaterThan(0)
    expect(screen.getByText("Sort: Recommended")).toBeInTheDocument()
  })

  it.each(["100-100", "*-1"])(
    "renders fallback empty state when invalid price_range %s causes a query error",
    invalidPriceRange => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { artistID: "example-artist" },
          location: {
            pathname: "anything",
            query: { price_range: invalidPriceRange },
          },
        },
      })
      ;(SystemQueryRenderer as jest.Mock).mockImplementationOnce(
        ({ render }) => {
          return render({
            error: new Error("Invalid price range"),
            props: null,
            retry: null,
          })
        },
      )

      render(
        <MockBoot>
          <ArtistArtworkFilterQueryRenderer id="example-artist-id" />
        </MockBoot>,
      )

      expect(screen.getAllByText("Price Range").length).toBeGreaterThan(0)
      expect(screen.getByText("0 Artworks:")).toBeInTheDocument()
      expect(
        screen.getByText(
          "There aren’t any works available that meet the following criteria at this time.",
        ),
      ).toBeInTheDocument()
    },
  )
})
