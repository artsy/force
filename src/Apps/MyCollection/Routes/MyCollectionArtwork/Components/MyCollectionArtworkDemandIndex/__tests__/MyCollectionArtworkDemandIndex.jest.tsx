import { screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { MyCollectionArtworkDemandIndexTestQuery } from "__generated__/MyCollectionArtworkDemandIndexTestQuery.graphql"
import { MyCollectionArtworkDemandIndexFragmentContainer } from ".."

jest.unmock("react-relay")

describe("MyCollectionArtworkDemandIndex", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkDemandIndexTestQuery
  >({
    Component: props => (
      <MockBoot>
        <MyCollectionArtworkDemandIndexFragmentContainer {...(props as any)} />
      </MockBoot>
    ),
    query: graphql`
      query MyCollectionArtworkDemandIndexTestQuery @relay_test_operation {
        artwork(id: "artwork-ID") {
          ...MyCollectionArtworkDemandIndex_artwork
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
          Artwork: () => ({ marketPriceInsights: { demandRank: 0.33 } }),
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
          Artwork: () => ({ marketPriceInsights: { demandRank: 0.69 } }),
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
          Artwork: () => ({ marketPriceInsights: { demandRank: 0.77 } }),
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
          Artwork: () => ({ marketPriceInsights: { demandRank: 0.94 } }),
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
