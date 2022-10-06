import { ArtistArtworkFilterTestQuery } from "__generated__/ArtistArtworkFilterTestQuery.graphql"
import { ArtistArtworkFilterRefetchContainer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools"

interface Props {
  context?: Record<string, any>
}

jest.unmock("react-relay")

jest.mock("react-tracking")
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
        query: {},
      },
    },
  }),
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
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

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("renders component", () => {
    const { renderWithRelay } = getWrapper()

    renderWithRelay()
    const option = screen.getByRole("option", { name: "Default" })

    expect(option).toBeInTheDocument()
    expect(option).toHaveValue("-decayed_merch")
  })

  it("should display trending sort for experiment variant", () => {
    const { renderWithRelay } = getWrapper({
      context: {
        featureFlags: {
          "trending-sort-for-artist-artwork-grids": {
            flagEnabled: true,
            variant: {
              enabled: true,
              name: "experiment",
            },
          },
        },
      },
    })

    renderWithRelay()
    const option = screen.getByRole("option", { name: "Default" })

    expect(option).toBeInTheDocument()
    expect(option).toHaveValue("-decayed_merch")
  })
})
