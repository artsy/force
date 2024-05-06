import { Breakpoint } from "@artsy/palette"
import { screen } from "@testing-library/react"
import { MyCollectionArtworkFragmentContainer } from "Apps/MyCollection/Routes/MyCollectionArtwork/MyCollectionArtwork"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MyCollectionArtworkTestQuery } from "__generated__/MyCollectionArtworkTestQuery.graphql"

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
            ...MyCollectionArtworkSWASectionSubmitted_submissionState
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

  describe("SWA section", () => {
    it("P1 artist: renders correct component when artwork does not have submission id", () => {
      const { renderWithRelay } = getWrapper("lg")
      renderWithRelay(mockResolversWithoutInsights)

      // eslint-disable-next-line jest/valid-expect
      expect(screen.getByText("Interested in Selling This Work?"))
    })
    it("not P1 artist: the section is not rendered", () => {
      const { renderWithRelay } = getWrapper("lg")
      renderWithRelay(mockResolversNotP1)

      expect(
        screen.queryByText("Artwork has been submitted for sale")
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText("Interested in Selling This Work?")
      ).not.toBeInTheDocument()
    })

    it("with submission id: the section is rendered", () => {
      const { renderWithRelay } = getWrapper()
      renderWithRelay(mockResolversWithInsights)
      expect(screen.queryByText("Submission Status")).toBeInTheDocument()
      expect(screen.queryByText("In Progress")).toBeInTheDocument()
    })
  })

  describe("Request Price Estimate section", () => {
    describe("when the price estimate is requestable", () => {
      it("the section is rendered", () => {
        const { renderWithRelay } = getWrapper("lg")
        renderWithRelay(mockResolversWithInsightsWithoutSubmission)

        expect(
          screen
            .getAllByRole("link")
            .find(c => c.textContent?.includes("Request a Price Estimate"))
        ).toHaveAttribute(
          "href",
          `/collector-profile/my-collection/artwork/63035a6b41808b000c7e2933/price-estimate`
        )
      })
    })

    describe("when the price estimate has been already requested", () => {
      it("the request confirmation is rendered", () => {
        const { renderWithRelay } = getWrapper("lg")
        renderWithRelay(mockResolversWithPriceEstimateRequest)

        expect(
          screen.queryByText("Request a Price Estimate")
        ).not.toBeInTheDocument()
        expect(
          screen.getByText("Price estimate request sent")
        ).toBeInTheDocument()
      })
    })

    describe("when the price estimate is not requestable", () => {
      it("the section is not rendered", () => {
        const { renderWithRelay } = getWrapper("lg")
        renderWithRelay(mockResolversNotP1)

        expect(
          screen.queryByText("Request a Price Estimate")
        ).not.toBeInTheDocument()
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

const mockResolversWithInsightsWithoutSubmission = {
  Artwork: () => ({
    internalID: "63035a6b41808b000c7e2933",
    title: "Morons",
    date: "2007",
    artistNames: "Banksy",
    hasMarketPriceInsights: true,
    isPriceEstimateRequestable: true,
    consignmentSubmission: null,
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
        isP1: true,
      },
    },
    consignmentSubmission: null,
  }),
}

const mockResolversNotP1 = {
  Artwork: () => ({
    internalID: "61efced8a47135000c7b4c31",
    title: "Anima",
    date: "2020",
    artistNames: "MAria",
    hasMarketPriceInsights: false,
    consignmentSubmission: {
      state: "SUBMITTED",
      stateLabel: "In Progress",
    },
    artist: {
      targetSupply: {
        isP1: false,
      },
    },
  }),
}

const mockResolversWithPriceEstimateRequest = {
  Artwork: () => ({
    internalID: "61efced8a47135000c7b4c31",
    title: "Anima",
    date: "2020",
    artistNames: "MAria",
    hasMarketPriceInsights: false,
    hasPriceEstimateRequest: true,
    consignmentSubmission: null,
  }),
}
