// import { screen } from "@testing-library/react"
// import { ArtistInsightPillsFragmentContainer } from "../ArtistInsightPills"
// import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
// import { graphql } from "react-relay"

// jest.unmock("react-relay")

// const { renderWithRelay } = setupTestWrapperTL({
//   Component: ArtistInsightPillsFragmentContainer,
//   query: graphql`
//     query ArtistInsightPills_Test_Query @relay_test_operation {
//       artist(id: "example") {
//         ...ArtistInsightPills_artist
//       }
//     }
//   `,
// })

// describe("ArtistInsightPills", () => {
//   it("renders artist insight pills", () => {
//     renderWithRelay({
//       Artist: () => ({
//         insights: [
//           {
//             type: "ACTIVE_SECONDARY_MARKET",
//           },
//         ],
//       }),
//     })

//     expect(screen.getByText("Blue Chip Representation")).toBeInTheDocument()
//     expect(screen.getByText("High Auction Record")).toBeInTheDocument()
//     expect(screen.getByText("Active Secondary Market")).toBeInTheDocument()
//   })

//   it("does not render high auction record pill if not present on artist", () => {
//     renderWithRelay({
//       Artist: () => ({
//         auctionResultsConnection: null,
//       }),
//     })

//     expect(screen.queryByText("High Auction Record")).not.toBeInTheDocument()
//   })

//   it("does not render blue chip pill if not present on artist", () => {
//     renderWithRelay({
//       ArtistHighlights: () => ({
//         partnersConnection: { edges: [] },
//       }),
//     })

//     expect(
//       screen.queryByText("Blue Chip Representation")
//     ).not.toBeInTheDocument()
//   })

//   it("does not render active secondary market pill if not present on artist", () => {
//     renderWithRelay({
//       Artist: () => ({
//         insights: [
//           {
//             type: "MAJOR_SOLO",
//           },
//         ],
//       }),
//     })

//     expect(
//       screen.queryByText("Active Secondary Market")
//     ).not.toBeInTheDocument()
//   })
// })
