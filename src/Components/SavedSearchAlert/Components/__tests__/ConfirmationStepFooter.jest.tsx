import { ConfirmationStepFooter } from "Components/SavedSearchAlert/Components/ConfirmationStepFooter"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ConfirmationStepFooter_Test_Query } from "__generated__/ConfirmationStepFooter_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("ConfirmationStepFooter", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConfirmationStepFooter_Test_Query
  >({
    Component: ConfirmationStepFooter,
    query: graphql`
      query ConfirmationStepFooter_Test_Query($searchCriteriaId: ID!)
        @relay_test_operation {
        me {
          internalID
          savedSearch(id: $searchCriteriaId) {
            href
          }
        }
      }
    `,
  })

  const renderComponent = () => {
    renderWithRelay({
      Me: () => ({
        internalID: "1234",
        savedSearch: {
          href:
            "/artist/banksy?sort=-published_at&attribution_class%5B0%5D=unique&additional_gene_ids%5B0%5D=prints&for_sale=true&search_criteria_id=289e87de-97e7-4c36-87aa-9fcd479b46b7",
        },
      }),
    })
  }

  it("renders buttons", () => {
    renderComponent()

    expect(screen.getByText("See all matching works")).toBeInTheDocument()
    expect(screen.getByText("Manage your alerts")).toBeInTheDocument()
  })

  it("redirects to the alerts page", () => {
    renderComponent()

    expect(screen.getByTestId("seeAllMatchingWorksButton")).toHaveAttribute(
      "href",
      "/artist/banksy?sort=-published_at&attribution_class%5B0%5D=unique&additional_gene_ids%5B0%5D=prints&for_sale=true&search_criteria_id=289e87de-97e7-4c36-87aa-9fcd479b46b7"
    )
    expect(screen.getByTestId("manageYourAlertsButton")).toHaveAttribute(
      "href",
      "/settings/alerts"
    )
  })
})
