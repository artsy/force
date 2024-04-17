import { screen } from "@testing-library/react"
import { ArtworkSidebarArtsyGuarantee } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtsyGuarantee"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebarArtsyGuarantee_Test_Query } from "__generated__/ArtworkSidebarArtsyGuarantee_Test_Query.graphql"

jest.unmock("react-relay")

describe("ArtworkSidebarArtsyGuarantee", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkSidebarArtsyGuarantee_Test_Query
  >({
    Component: ({ artwork }) => {
      return <ArtworkSidebarArtsyGuarantee artwork={artwork!} />
    },
    query: graphql`
      query ArtworkSidebarArtsyGuarantee_Test_Query @relay_test_operation {
        artwork(id: "josef-albers-homage-to-the-square-85") {
          ...ArtworkSidebarArtsyGuarantee_artwork
        }
      }
    `,
  })
  it("renders the Artsy Guarantee section", async () => {
    renderWithRelay()

    expect(screen.queryByText("Secure Checkout")).toBeInTheDocument()
    expect(screen.queryByText("Money-Back Guarantee")).toBeInTheDocument()
    expect(screen.queryByText("Authenticity Guarantee")).toBeInTheDocument()

    expect(screen.queryByText("Learn more")).toBeInTheDocument()
  })
})
