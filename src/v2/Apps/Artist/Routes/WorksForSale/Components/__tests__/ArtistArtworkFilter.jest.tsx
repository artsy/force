import { ArtistArtworkFilterTestQuery } from "v2/__generated__/ArtistArtworkFilterTestQuery.graphql"
import { ArtistArtworkFilterRefetchContainer } from "../ArtistArtworkFilter"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "v2/System/Analytics/useTracking"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
        query: {},
      },
    },
  }),
}))
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL<ArtistArtworkFilterTestQuery>({
  Component: props => {
    if (props.artist && props.me) {
      return (
        <MockBoot>
          <ArtistArtworkFilterRefetchContainer
            artist={props.artist}
            me={props.me}
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
      me {
        ...ArtistArtworkFilter_me
      }
    }
  `,
})

describe("ArtistArtworkFilter", () => {
  const mockUseTracking = useTracking as jest.Mock

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("renders component", () => {
    renderWithRelay()
    const option = screen.getByRole("option", { name: "Default" })

    expect(option).toBeInTheDocument()
    expect(option).toHaveValue("-decayed_merch")
  })
})
