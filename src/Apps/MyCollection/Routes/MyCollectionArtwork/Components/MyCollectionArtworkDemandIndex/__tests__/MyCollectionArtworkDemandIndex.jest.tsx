import { screen } from "@testing-library/react"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MyCollectionArtworkDemandIndexTestQuery } from "__generated__/MyCollectionArtworkDemandIndexTestQuery.graphql"
import { MyCollectionArtworkDemandIndexFragmentContainer } from ".."

jest.unmock("react-relay")

describe("MyCollectionArtworkDemandIndex", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkDemandIndexTestQuery
  >({
    Component: props => {
      if (props.artwork?.marketPriceInsights) {
        return (
          <MockBoot>
            <MyCollectionArtworkDemandIndexFragmentContainer
              marketPriceInsights={props.artwork.marketPriceInsights}
            />
          </MockBoot>
        )
      }
      return null
    },
    query: graphql`
      query MyCollectionArtworkDemandIndexTestQuery @relay_test_operation {
        artwork(id: "artwork-ID") {
          marketPriceInsights {
            ...MyCollectionArtworkDemandIndex_marketPriceInsights
          }
        }
      }
    `,
  })

  describe("when there is no demand rank", () => {
    it("renders nothing", () => {
      renderWithRelay({ Artwork: () => ({ marketPriceInsights: null }) })

      expect(screen.queryByText("Demand Index")).not.toBeInTheDocument()
    })
  })

  describe("when there is demand rank", () => {
    describe("with demand rank less than 4", () => {
      it("renders the demand rank bar", () => {
        renderWithRelay({
          ArtworkPriceInsights: () => ({
            demandRank: 0.33,
            demandRankDisplayText: "Less Active Demand",
          }),
        })

        expect(screen.getByText("Demand Index")).toBeInTheDocument()
        expect(screen.getByText("3.3")).toBeInTheDocument()
        expect(screen.getByText("3.3")).toHaveAttribute("color", "black60")
        expect(screen.getByText("Less Active Demand")).toBeInTheDocument()
        expect(screen.getByTestId("demandIndexBar")).toBeInTheDocument()
        expect(screen.queryByTestId("highDemandIcon")).not.toBeInTheDocument()
      })
    })

    describe("with demand rank less than 7", () => {
      it("renders the demand rank bar", () => {
        renderWithRelay({
          ArtworkPriceInsights: () => ({
            demandRank: 0.69,
            demandRankDisplayText: "Moderate Demand",
          }),
        })

        expect(screen.getByText("Demand Index")).toBeInTheDocument()
        expect(screen.getByText("6.9")).toBeInTheDocument()
        expect(screen.getByText("6.9")).toHaveAttribute("color", "black60")
        expect(screen.getByText("Moderate Demand")).toBeInTheDocument()
        expect(screen.getByTestId("demandIndexBar")).toBeInTheDocument()
        expect(screen.queryByTestId("highDemandIcon")).not.toBeInTheDocument()
      })
    })

    describe("with demand rank less than 9", () => {
      it("renders the demand rank bar", () => {
        renderWithRelay({
          ArtworkPriceInsights: () => ({
            demandRank: 0.77,
            demandRankDisplayText: "Active Demand",
          }),
        })

        expect(screen.getByText("Demand Index")).toBeInTheDocument()
        expect(screen.getByText("7.7")).toBeInTheDocument()
        expect(screen.getByText("7.7")).toHaveAttribute("color", "blue100")
        expect(screen.getByText("Active Demand")).toBeInTheDocument()
        expect(screen.getByTestId("demandIndexBar")).toBeInTheDocument()
        expect(screen.queryByTestId("highDemandIcon")).not.toBeInTheDocument()
      })
    })

    describe("with demand rank more than or equals 9", () => {
      it("renders the demand rank bar", () => {
        renderWithRelay({
          ArtworkPriceInsights: () => ({
            demandRank: 0.94,
            demandRankDisplayText: "High Demand",
          }),
        })

        expect(screen.getByText("Demand Index")).toBeInTheDocument()
        expect(screen.getByText("9.4")).toBeInTheDocument()
        expect(screen.getByText("9.4")).toHaveAttribute("color", "blue100")
        expect(screen.getByText("High Demand")).toBeInTheDocument()
        expect(screen.getByTestId("demandIndexBar")).toBeInTheDocument()
        expect(screen.queryByTestId("highDemandIcon")).toBeInTheDocument()
      })
    })
  })
})
