import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebarShippingInformationFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarShippingInformation"
import { ArtworkSidebarShippingInformation_Test_Query } from "__generated__/ArtworkSidebarShippingInformation_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebarShippingInformation_Test_Query
>({
  Component: ({ artwork }) => (
    <ArtworkSidebarShippingInformationFragmentContainer artwork={artwork!} />
  ),
  query: graphql`
    query ArtworkSidebarShippingInformation_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebarShippingInformation_artwork
      }
    }
  `,
})

describe("ArtworkSidebarShippingInformation", () => {
  describe("Artwork with no shippingOrigin", () => {
    it("does not render shipping origin", () => {
      renderWithRelay({
        Artwork: () => ({
          shippingOrigin: null,
        }),
      })

      expect(
        screen.queryByText(/artworkPage.sidebar.shippingAndTaxes.shipsFrom/)
      ).not.toBeInTheDocument()
    })
  })

  describe("Artwork with no shippingInfo", () => {
    it("does not render shipping info", () => {
      renderWithRelay({
        Artwork: () => ({
          shippingInfo: null,
        }),
      })

      expect(screen.queryByTestId("shipping-info")).not.toBeInTheDocument()
    })
  })

  describe("Artwork has both shippingOrigin and shippingInfo", () => {
    it("renders shipping origin & info", () => {
      renderWithRelay({
        Artwork: () => ({
          shippingOrigin: "New York, NY US",
          shippingInfo: "Shipping: Calculated in checkout",
        }),
      })

      expect(screen.queryByText(/New York, NY US/)).toBeInTheDocument()
      expect(
        screen.queryByText(/Shipping: Calculated in checkout/)
      ).toBeInTheDocument()
    })
  })
})
