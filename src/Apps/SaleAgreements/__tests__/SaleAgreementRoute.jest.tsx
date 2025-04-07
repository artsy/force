import { screen } from "@testing-library/react"
import { SaleAgreementRoute } from "Apps/SaleAgreements/Routes/SaleAgreementRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { SaleAgreementRoute_Test_Query } from "__generated__/SaleAgreementRoute_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ match: { params: { id: "example" } } }),
}))
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))
jest.mock("@unleash/proxy-client-react", () => {
  const actual = jest.requireActual("@unleash/proxy-client-react")
  return {
    ...actual,
    useFlag: jest.fn().mockReturnValue(true),
  }
})

describe("SaleAgreementsRoute", () => {
  const { renderWithRelay } = setupTestWrapperTL<SaleAgreementRoute_Test_Query>(
    {
      Component: (props: any) => {
        return <SaleAgreementRoute saleAgreement={props.saleAgreement} />
      },
      query: graphql`
        query SaleAgreementRoute_Test_Query {
          saleAgreement(id: "abc123") {
            ...SaleAgreementRoute_saleAgreement
          }
        }
      `,
    },
  )

  it("renders correctly", () => {
    renderWithRelay({
      SaleAgreement: () => ({
        internalID: "abc123",
        displayStartAt: "2024-01-01",
        displayEndAt: "2024-01-01",
        published: true,
        status: "CURRENT",
        sale: {
          internalID: "xyz987",
          name: "Current Auction",
        },
      }),
    })

    expect(screen.getByText("Current Auction")).toBeInTheDocument()
  })
})
