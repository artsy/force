import { screen } from "@testing-library/react"
import { InvoiceApp } from "Apps/Invoice/InvoiceApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { InvoiceApp_Test_Query } from "__generated__/InvoiceApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<InvoiceApp_Test_Query>({
  Component: props => {
    if (!props?.invoice) return null

    return (
      <MockBoot>
        <InvoiceApp invoice={props.invoice} />
      </MockBoot>
    )
  },
  query: graphql`
    query InvoiceApp_Test_Query @relay_test_operation {
      invoice(token: "cool-token") {
        ...InvoiceApp_invoice
      }
    }
  `,
})

describe("InvoiceApp", () => {
  beforeEach(() =>
    renderWithRelay({
      Invoice: () => ({
        number: "123",
        readyAt: "Oct 17, 2024",
      }),
    }),
  )

  it("renders correctly", () => {
    expect(
      screen.getByTestId("invoice-info").textContent,
    ).toMatchInlineSnapshot(`"Oct 17, 2024"`)
  })
})
