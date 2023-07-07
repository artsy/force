import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { PartnerViewingRoomsGridFragmentContainer } from "Apps/Partner/Components/PartnerViewingRooms/PartnerViewingRoomsGrid"
import { PartnerViewingRoomsGrid_Test_Query } from "__generated__/PartnerViewingRoomsGrid_Test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  PartnerViewingRoomsGrid_Test_Query
>({
  Component: ({ viewingRoomsConnection }) => {
    return (
      <PartnerViewingRoomsGridFragmentContainer
        viewingRoomsConnection={viewingRoomsConnection!}
        sectionTitle="Current Viewing Rooms"
      />
    )
  },
  query: graphql`
    query PartnerViewingRoomsGrid_Test_Query @relay_test_operation {
      viewingRoomsConnection: partner(id: "white-cube") {
        ...PartnerViewingRoomsGrid_viewingRoomsConnection
      }
    }
  `,
})

describe("PartnerViewingRoomsGrid", () => {
  it("renders list of VRs", () => {
    renderWithRelay({
      Partner: () => ({
        viewingRoomsConnection: {
          edges: [
            {
              node: {
                title: "First VR",
              },
            },
            {
              node: {
                title: "Second VR",
              },
            },
            {
              node: {
                title: "Third VR",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Current Viewing Rooms")).toBeInTheDocument()
    expect(screen.getByText("First VR")).toBeInTheDocument()
    expect(screen.getByText("Second VR")).toBeInTheDocument()
    expect(screen.getByText("Third VR")).toBeInTheDocument()
    expect(screen.getAllByText("Viewing Room")).toHaveLength(3)
  })
})
