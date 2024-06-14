import { ArtistArtworkFilterTestQuery } from "__generated__/ArtistArtworkFilterTestQuery.graphql"
import { ArtistArtworkFilterRefetchContainer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"
import { fetchQuery } from "react-relay"

interface Props {
  context?: Record<string, any>
}

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
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
})
