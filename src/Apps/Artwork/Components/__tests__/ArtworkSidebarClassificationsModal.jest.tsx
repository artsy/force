import { ArtworkSidebarClassificationsModalFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const getWrapperWithResponsibilityMessage = (showDisclaimer?: boolean) =>
  setupTestWrapper({
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
      query ArtworkSidebarClassificationsModal_test_Query
        @relay_test_operation {
        viewer {
          ...ArtworkSidebarClassificationsModal_viewer
        }
      }
    `,
  })

describe("ArtworkSidebarClassificationsModal", () => {
  it("renders the classifications with disclaimer", () => {
    const { getWrapper } = getWrapperWithResponsibilityMessage(true)
    const { wrapper } = getWrapper({
      AttributionClass: () => ({
        name: "Unique",
        longDescription: "One of a kind piece, created by the artist.",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Unique")
    expect(html).toContain("One of a kind piece, created by the artist.")
    expect(html).toContain(
      "Our partners are responsible for providing accurate classification information for all works."
    )
  })

  it("renders the classifications without disclaimer", () => {
    const { getWrapper } = getWrapperWithResponsibilityMessage(false)
    const { wrapper } = getWrapper({
      AttributionClass: () => ({
        name: "Unique",
        longDescription: "One of a kind piece, created by the artist.",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Unique")
    expect(html).toContain("One of a kind piece, created by the artist.")
    expect(html).not.toContain(
      "Our partners are responsible for providing accurate classification information for all works."
    )
  })
})
