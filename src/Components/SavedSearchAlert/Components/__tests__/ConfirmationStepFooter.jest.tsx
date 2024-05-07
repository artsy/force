import { ConfirmationStepFooter } from "Components/SavedSearchAlert/Components/ConfirmationStepFooter"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ConfirmationStepFooter_Test_Query } from "__generated__/ConfirmationStepFooter_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { NUMBER_OF_ARTWORKS_TO_SHOW } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"

jest.unmock("react-relay")

describe("ConfirmationStepFooter", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConfirmationStepFooter_Test_Query
  >({
    Component: ConfirmationStepFooter,
    query: graphql`
      query ConfirmationStepFooter_Test_Query($alertID: String!)
        @relay_test_operation {
        me {
          internalID
          alert(id: $alertID) {
            href
          }
        }
      }
    `,
  })

  const renderComponent = (artworksCount: number) => {
    renderWithRelay(
      {
        Me: () => ({
          internalID: "1234",
          alert: {
            href:
              "/artist/banksy?sort=-published_at&attribution_class%5B0%5D=unique&additional_gene_ids%5B0%5D=prints&for_sale=true&search_criteria_id=289e87de-97e7-4c36-87aa-9fcd479b46b7",
          },
        }),
      },
      { artworksCount }
    )
  }

  describe("buttons", () => {
    describe("when there are no artworks", () => {
      it("renders only manage your alerts button", () => {
        renderComponent(0)

        expect(screen.getByText("Manage your alerts")).toBeInTheDocument()
      })
    })

    describe("when there are <= 10 artworks", () => {
      it("renders only manage your alerts button", () => {
        renderComponent(NUMBER_OF_ARTWORKS_TO_SHOW)

        expect(screen.getByText("Manage your alerts")).toBeInTheDocument()
      })
    })

    describe("when there are > 10 artworks", () => {
      it("renders both buttons", () => {
        renderComponent(NUMBER_OF_ARTWORKS_TO_SHOW + 1)

        expect(screen.getByText("See all matching works")).toBeInTheDocument()
        expect(screen.getByText("Manage your alerts")).toBeInTheDocument()
      })
    })

    it("buttons have correct redirect links", () => {
      renderComponent(NUMBER_OF_ARTWORKS_TO_SHOW + 1)

      expect(screen.getByTestId("seeAllMatchingWorksButton")).toHaveAttribute(
        "href",
        "/artist/banksy?sort=-published_at&attribution_class%5B0%5D=unique&additional_gene_ids%5B0%5D=prints&for_sale=true&search_criteria_id=289e87de-97e7-4c36-87aa-9fcd479b46b7"
      )
      expect(screen.getByTestId("manageYourAlertsButton")).toHaveAttribute(
        "href",
        "/favorites/alerts"
      )
    })
  })
})
