import { fireEvent, screen } from "@testing-library/react"
import { Order2RespondForm } from "Apps/Order2/Routes/Respond/Components/Order2RespondForm"
import { Order2RespondSummary } from "Apps/Order2/Routes/Respond/Components/Order2RespondSummary"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2RespondSummaryTestQuery } from "__generated__/Order2RespondSummaryTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<Order2RespondSummaryTestQuery>({
  Component: (props: any) => {
    const order = props.me?.order

    if (!order) {
      return null
    }

    return (
      <Order2RespondContextProvider order={order}>
        <Order2RespondForm order={order} />
        <Order2RespondSummary order={order} />
      </Order2RespondContextProvider>
    )
  },
  query: graphql`
    query Order2RespondSummaryTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2RespondContext_order
          ...Order2RespondForm_order
          ...Order2RespondSummary_order
        }
      }
    }
  `,
})

const defaultResolvers = {
  Order: () => ({ mode: "OFFER" }),
  Money: () => ({ display: "$1,000.00" }),
}

const continueButton = () =>
  screen.getByRole("button", { name: "Continue to Review" })

describe("Order2RespondSummary", () => {
  it("does not show the Submit CTA while the respond step is active", () => {
    renderWithRelay(defaultResolvers)

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument()
  })

  it("shows the Submit CTA once the response is confirmed", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    expect(
      screen.getByText(/submitting the response will be implemented in/i),
    ).toBeInTheDocument()
  })

  it("hides the Submit CTA again when the response is edited", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Decline gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Edit response" }))

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument()
  })
})
