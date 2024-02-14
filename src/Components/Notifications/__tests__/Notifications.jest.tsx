// import { screen } from "@testing-library/react"
// import { Notifications } from "Components/Notifications/Notifications"
// import { NotificationsWrapper } from "Components/Notifications/NotificationsWrapper"
// import { MockBoot } from "DevTools/MockBoot"
// import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
// import { render } from "DevTools/renderWithMockBoot"
// import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
// import { useFeatureFlag } from "System/useFeatureFlag"
// import { graphql } from "react-relay"
// import { MockEnvironment, createMockEnvironment } from "relay-test-utils"

// jest.mock("System/useFeatureFlag", () => ({
//   useFeatureFlag: jest.fn(),
// }))

// jest.mock("Utils/Hooks/useMatchMedia", () => ({
//   __internal__useMatchMedia: () => false,
// }))
// jest.unmock("react-relay")

// describe("Notifications", () => {
//   beforeEach(() => {
//     ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
//   })

//   it("should render tabs", () => {
//     render(<Notifications mode="page" unreadCounts={0} />)

//     expect(screen.getByText("All")).toBeInTheDocument()
//     expect(screen.getByText("Alerts")).toBeInTheDocument()
//   })

//   it("should display new notifications message", () => {
//     render(<Notifications mode="page" unreadCounts={5} />)

//     expect(screen.getByText("New notifications")).toBeInTheDocument()
//   })
// })

// describe("Notifications with pills", () => {
//   const environment = createMockEnvironment()

//   // const { renderWithRelay } = setupTestWrapperTL({
//   //   Component: (props: any) => (
//   //     <MockBoot>
//   //       <Notifications mode="page" unreadCounts={0} />
//   //     </MockBoot>
//   //   ),
//   //   query: graphql`
//   //     query ArtistAuctionResults_Test_Query($artistID: String!)
//   //       @raw_response_type {
//   //       artist(id: $artistID) {
//   //         ...ArtistAuctionResultsRoute_artist
//   //       }
//   //     }
//   //   `,
//   //   variables: {
//   //     artistID: "pablo-picasso",
//   //   },
//   // })

//   beforeEach(() => {
//     ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
//   })

//   it("should render pills", async () => {
//     render(
//       <MockBoot relayEnvironment={environment}>
//         <Notifications mode="page" unreadCounts={0} />
//       </MockBoot>
//     )

//     await flushPromiseQueue()

//     await environment.mock.resolveMostRecentOperation({})

//     expect(screen.getByText("All")).toBeInTheDocument()
//     expect(screen.getByText("Alerts")).toBeInTheDocument()
//     expect(screen.getByText("Following")).toBeInTheDocument()
//   })
// })
