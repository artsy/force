import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { RelatedWorksFragmentContainer } from "Apps/Artwork/Components/RelatedWorks"
import { RelatedWorks_Test_Query } from "__generated__/RelatedWorks_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL<RelatedWorks_Test_Query>({
  Component: RelatedWorksFragmentContainer,
  query: graphql`
    query RelatedWorks_Test_Query($slug: String!) @relay_test_operation {
      artwork(id: $slug) {
        ...RelatedWorks_artwork
      }
    }
  `,
})

describe("RelatedWorks", () => {
  const trackEvent = jest.fn()
  const mockUseTracking = useTracking as jest.Mock

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  afterAll(() => {
    mockUseTracking.mockReset()
    trackEvent.mockReset()
  })

  it("renders a the related works rail", () => {
    renderWithRelay()
    expect(screen.queryByTestId("relatedWorksRail")).toBeInTheDocument()
    expect(screen.queryByText("Related works")).toBeInTheDocument()
  })

  it("renders nothing if there are no related artworks", () => {
    renderWithRelay({
      Artwork: () => ({
        layer: {
          artworksConnection: {
            edges: [],
          },
        },
      }),
    })
    expect(screen.queryByText("Related works")).not.toBeInTheDocument()
  })
})
