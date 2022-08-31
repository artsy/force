import { Breakpoint } from "@artsy/palette"
import { screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { useSystemContext } from "System/useSystemContext"
import { MyCollectionArtworkTestQuery } from "__generated__/MyCollectionArtworkTestQuery.graphql"
import { MyCollectionArtworkFragmentContainer } from "../MyCollectionArtwork"

jest.mock("System/useSystemContext")
jest.unmock("react-relay")

describe("MyCollectionArtwork", () => {
  const getWrapper = (breakpoint: Breakpoint = "lg") => {
    return setupTestWrapperTL<MyCollectionArtworkTestQuery>({
      Component: (props: any) => (
        <MockBoot breakpoint={breakpoint}>
          <MyCollectionArtworkFragmentContainer {...props} />
        </MockBoot>
      ),
      query: graphql`
        query MyCollectionArtworkTestQuery @relay_test_operation {
          artwork(id: "foo") {
            ...MyCollectionArtwork_artwork
          }
        }
      `,
    })
  }

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "my-collection-web-phase-4-demand-index": { flagEnabled: true },
      },
    }))
  })

  describe("In a mobile view", () => {
    describe("When the artwork has insights", () => {
      it("renders the tabs", () => {
        const { renderWithRelay } = getWrapper("xs")

        renderWithRelay(mockResolversWithInsights)

        expect(screen.getByText("Morons")).toBeInTheDocument()
        expect(screen.getByText("Insights")).toBeInTheDocument()
        expect(screen.getByText("About")).toBeInTheDocument()
      })
    })

    describe("when the artwork does not have insights", () => {
      it("does not render the tabs", () => {
        const { renderWithRelay } = getWrapper("xs")

        renderWithRelay(mockResolversWithoutInsights)

        expect(screen.queryByText("Insights")).not.toBeInTheDocument()
        expect(screen.queryByText("About")).not.toBeInTheDocument()
      })
    })
  })

  describe("In desktop view", () => {
    describe("When the artwork has insights", () => {
      it("does not render the tabs", () => {
        const { renderWithRelay } = getWrapper("lg")

        renderWithRelay(mockResolversWithInsights)

        expect(screen.getByText("Morons")).toBeInTheDocument()

        // Testing for the title
        expect(screen.getByText("Insights")).toBeInTheDocument()
        expect(screen.queryByText("About")).not.toBeInTheDocument()
      })
    })
  })
})

const mockResolversWithInsights = {
  Artwork: () => ({
    internalID: "63035a6b41808b000c7e2933",
    title: "Morons",
    date: "2007",
    artistNames: "Banksy",
    hasMarketPriceInsights: true,
  }),
}

const mockResolversWithoutInsights = {
  Artwork: () => ({
    internalID: "63035a6b41808b000c7e2933",
    title: "Morons",
    date: "2007",
    artistNames: "Banksy",
    hasMarketPriceInsights: false,
    comparables: null,
    artist: {
      auctionResults: null,
    },
  }),
}
