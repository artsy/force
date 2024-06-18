import { graphql } from "react-relay"
import { SaleAgreementsApp_Test_Query } from "__generated__/SaleAgreementsApp_Test_Query.graphql"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { SaleAgreementsApp } from "Apps/SaleAgreements/SaleAgreementsApp"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ match: { params: { id: "example" } } }),
}))
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: () => true,
}))

describe("SaleAgreementsApp", () => {
  const { renderWithRelay } = setupTestWrapperTL<SaleAgreementsApp_Test_Query>({
    Component: (props: any) => {
      return <SaleAgreementsApp viewer={props.viewer} />
    },
    query: graphql`
      query SaleAgreementsApp_Test_Query @relay_test_operation {
        viewer {
          ...SaleAgreementsApp_viewer
        }
      }
    `,
  })

  it("sorts and renders sale agreements correctly", () => {
    renderWithRelay({
      Viewer: () => ({
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
                  name: "Current Auction",
                },
              },
            },
            {
              node: {
                internalID: "abc123",
                displayStartAt: "2024-01-01",
                displayEndAt: "2024-01-01",
                published: true,
                status: "Past",
                sale: {
                  internalID: "567ghj",
                  name: "Past Auction",
                  isBenefit: true,
                },
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Current Auction")).toBeInTheDocument()
    const tab = screen.getByText("Past")

    fireEvent.click(tab)
    expect(screen.getByText("Partner Auctions: Benefit")).toBeInTheDocument()
    expect(
      screen.queryByText("Partner Auctions: Commercial")
    ).not.toBeInTheDocument()
    expect(screen.queryByText("Artsy Auctions")).not.toBeInTheDocument()
    expect(screen.getByText("Past Auction")).toBeInTheDocument()
  })
})
