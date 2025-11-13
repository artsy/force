import { ArtworkSidebarClassificationsModalFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const getWrapperWithResponsibilityMessage = (showDisclaimer?: boolean) =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <ArtworkSidebarClassificationsModalFragmentContainer
          {...props}
          show
          showDisclaimer={showDisclaimer}
        />
      )
    },
    query: graphql`
      query ArtworkSidebarClassificationsModalTestQuery @relay_test_operation {
        viewer {
          ...ArtworkSidebarClassificationsModal_viewer
        }
      }
    `,
  })

describe("ArtworkSidebarClassificationsModal", () => {
  it("renders the classifications with disclaimer", () => {
    const { renderWithRelay } = getWrapperWithResponsibilityMessage(true)
    renderWithRelay({
      AttributionClass: () => ({
        name: "Unique",
        longDescription: "One of a kind piece, created by the artist.",
      }),
    })

    expect(screen.getByText("Unique")).toBeInTheDocument()
    expect(
      screen.getByText("One of a kind piece, created by the artist.")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Our partners are responsible for providing accurate classification information for all works."
      )
    ).toBeInTheDocument()
  })

  it("renders the classifications without disclaimer", () => {
    const { renderWithRelay } = getWrapperWithResponsibilityMessage(false)
    renderWithRelay({
      AttributionClass: () => ({
        name: "Unique",
        longDescription: "One of a kind piece, created by the artist.",
      }),
    })

    expect(screen.getByText("Unique")).toBeInTheDocument()
    expect(
      screen.getByText("One of a kind piece, created by the artist.")
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        "Our partners are responsible for providing accurate classification information for all works."
      )
    ).not.toBeInTheDocument()
  })
})
