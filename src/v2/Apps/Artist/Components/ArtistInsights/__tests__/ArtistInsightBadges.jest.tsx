// import { render, screen } from "@testing-library/react"
// import { ArtistInsightBadges } from "../ArtistInsightBadges"
// import { ArtistInsightBadges_artist } from "v2/__generated__/ArtistInsightBadges_artist.graphql"

// let artist

// describe("ArtistInsightBadges", () => {
//   beforeEach(() => {
//     artist = ({
//       insights: [
//         {
//           type: "ACTIVE_SECONDARY_MARKET",
//           label: "Active Secondary Market",
//           entities: [],
//         },
//       ],
//       auctionResultsConnection: {
//         edges: [
//           {
//             node: {
//               price_realized: {
//                 display: "US$93.1m",
//               },
//               organization: "Christies",
//               sale_date: "2021",
//             },
//           },
//         ],
//       },
//       artistHighlights: {
//         partnersConnection: {
//           edges: [
//             {
//               node: {
//                 categories: [
//                   {
//                     slug: "blue-chip",
//                   },
//                 ],
//               },
//             },
//           ],
//         },
//       },
//     } as unknown) as ArtistInsightBadges_artist
//   })

//   it("renders artist insight badges", () => {
//     render(<ArtistInsightBadges artist={artist} />)

//     expect(screen.queryByText("Blue Chip Representation")).toBeInTheDocument()
//     expect(screen.queryByText("High Auction Record")).toBeInTheDocument()
//     expect(screen.queryByText("Active Secondary Market")).toBeInTheDocument()
//   })

//   it("does not render high auction record badge if not present on artist", () => {
//     artist.auctionResultsConnection = null

//     render(<ArtistInsightBadges artist={artist} />)
//     expect(screen.queryByText("High Auction Record")).not.toBeInTheDocument()
//   })

//   it("does not render blue chip badge if not present on artist", () => {
//     artist.artistHighlights.partnersConnection = []

//     render(<ArtistInsightBadges artist={artist} />)
//     expect(
//       screen.queryByText("Blue Chip Representation")
//     ).not.toBeInTheDocument()
//   })

//   it("does not render active secondary market badge if not present on artist", () => {
//     artist.insights = [
//       {
//         type: "MAJOR_SOLO",
//       },
//     ]

//     render(<ArtistInsightBadges artist={artist} />)
//     expect(
//       screen.queryByText("Active Secondary Market")
//     ).not.toBeInTheDocument()
//   })
// })
