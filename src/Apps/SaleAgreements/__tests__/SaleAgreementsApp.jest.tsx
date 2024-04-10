import { graphql } from "react-relay"
import { SaleAgreementsApp_Test_Query } from "__generated__/SaleAgreementsApp_Test_Query.graphql"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { SaleAgreementsAppFragmentContainer } from "Apps/SaleAgreements/SaleAgreementsApp"

jest.unmock("react-relay")
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({ match: { params: { id: "example" } } }),
}))
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))

describe("SaleAgreementsApp", () => {
  const { renderWithRelay } = setupTestWrapperTL<SaleAgreementsApp_Test_Query>({
    Component: (props: any) => {
      return <SaleAgreementsAppFragmentContainer viewer={props.viewer} />
    },
    query: graphql`
      query SaleAgreementsApp_Test_Query @relay_test_operation {
        viewer {
          ...SaleAgreementsFilter_viewer
        }
      }
    `,
  })

  it("renders correctly", () => {
    renderWithRelay({
      SaleAgreements: () => ({
        saleAgreementsConnection: {
          edges: [
            {
              node: {
                internalID: "abc123",
                displayStartAt: "2024-01-01",
                displayEndAt: "2024-01-01",
                published: true,
                status: "CURRENT",
                sale: {
                  internalID: "xyz987",
                  name: "Test Auction",
                },
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Test Auction")).toBeInTheDocument()
  })
})
