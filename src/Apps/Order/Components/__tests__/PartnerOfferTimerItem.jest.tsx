import { screen } from "@testing-library/react"
import { PartnerOfferTimerItem } from "Apps/Order/Components/PartnerOfferTimerItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { DateTime } from "luxon"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: PartnerOfferTimerItem,
  query: graphql`
    query PartnerOfferTimerItemTestQuery @relay_test_operation {
      order: commerceOrder(id: "123") {
        ...PartnerOfferTimerItem_order
      }
    }
  `,
})

describe("PartnerOfferTimerItem", () => {
  it("renders nothing if the state is not pending", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        displayState: "SUBMITTED",
      }),
    })

    expect(screen.queryByText(/Purchase by/)).not.toBeInTheDocument()
  })

  it("renders nothing if the timer cannot parse its input as dates", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        displayState: "PENDING",
        stateExpiresAt: null,
        stateupdatedAt: "???",
      }),
    })

    expect(screen.queryByText(/Purchase by/)).not.toBeInTheDocument()
  })

  it("renders a timer if the state is pending", async () => {
    const startAt = DateTime.local().plus({ days: 1 }).toString()
    const endAt = DateTime.local().plus({ days: 2 }).toString()

    renderWithRelay({
      CommerceOrder: () => ({
        displayState: "PENDING",
        stateExpiresAt: endAt,
        stateUpdatedAt: startAt,
      }),
    })

    expect(screen.getByText("1d 23h left")).toBeInTheDocument()
    expect(screen.getByText(/Purchase by.+E[DS]T$/)).toBeInTheDocument()
  })
})
