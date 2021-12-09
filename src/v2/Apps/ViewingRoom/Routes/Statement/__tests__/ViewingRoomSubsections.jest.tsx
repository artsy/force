import { screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { ViewingRoomSubsectionsFragmentContainer } from "../Components/ViewingRoomSubsections"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ViewingRoomSubsectionsFragmentContainer,
  query: graphql`
    query ViewingRoomSubsections_Test_Query @relay_test_operation {
      viewingRoom(id: "exmaple") {
        ...ViewingRoomSubsections_viewingRoom
      }
    }
  `,
})

describe("ViewingRoomSubsections", () => {
  it("renders correctly", () => {
    renderWithRelay({
      ViewingRoomSubsection: () => ({
        title: "Example Title",
        image: {
          imageURLs: {
            normalized: "example.jpg",
          },
        },
        body: "Example body.",
      }),
    })

    expect(screen.getByText("Example Title")).toBeInTheDocument()
    expect(screen.getByText("Example body.")).toBeInTheDocument()
    expect(screen.getByAltText("")).toBeInTheDocument()
  })

  it("will not render an image if an image is missing", () => {
    renderWithRelay({
      ViewingRoomSubsection: () => ({
        image: null,
      }),
    })

    expect(screen.queryByAltText("")).not.toBeInTheDocument()
  })
})
