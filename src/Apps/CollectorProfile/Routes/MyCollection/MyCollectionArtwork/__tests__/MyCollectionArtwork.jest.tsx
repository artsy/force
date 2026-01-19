import type { Breakpoint } from "@artsy/palette"
import { screen } from "@testing-library/react"
import { MyCollectionArtworkFragmentContainer } from "Apps/CollectorProfile/Routes/MyCollection/MyCollectionArtwork/MyCollectionArtwork"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { MyCollectionArtworkTestQuery } from "__generated__/MyCollectionArtworkTestQuery.graphql"
import { graphql } from "react-relay"

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
    consignmentSubmission: {
      state: "SUBMITTED",
      stateLabel: "In Progress",
    },
    hasMarketPriceInsights: true,
    artist: {
      targetSupply: {
        isP1: true,
      },
    },
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
      targetSupply: {
        priority: true,
      },
    },
    consignmentSubmission: null,
  }),
}
