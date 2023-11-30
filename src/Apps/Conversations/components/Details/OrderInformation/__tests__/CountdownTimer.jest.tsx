import { render, screen } from "@testing-library/react"
import { CountdownTimer } from "Apps/Conversations/components/Details/OrderInformation/CountdownTimer"
import { add } from "date-fns"

describe("CountdownTimer", () => {
  it("does not render if offer has expired", () => {
    render(
      <CountdownTimer
        stateExpiresAt="2021-12-05T12:00:00+00:00"
        stateUpdatedAt={new Date().toISOString()}
        expiryText="until offer expires"
        respondByText={`Respond by Dec 5, 2021 12:00 PM`}
      />
    )
    expect(screen.queryByText("until offer expires")).not.toBeInTheDocument()
    expect(
      screen.queryByText("Respond by Dec 5, 2021 12:00 PM")
    ).not.toBeInTheDocument()
  })
  it("shows the right time until counterOffer expires", () => {
    const now = new Date()
    const twoDays = add(now, { days: 2, hours: 5, minutes: 41 }).toISOString()

    render(
      <CountdownTimer
        stateExpiresAt={twoDays}
        stateUpdatedAt={new Date().toISOString()}
        expiryText="until counteroffer expires"
        respondByText="Awaiting response by Dec 5, 2023 12:00 PM"
      />
    )

    expect(
      screen.getByText("2d 5h until counteroffer expires")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Awaiting response by Dec 5, 2023 12:00 PM")
    ).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toHaveStyle({
      color: "green100",
    })
  })
  it("correctly displays percentage elapsed", () => {
    const now = new Date()
    const dayFromNow = add(now, { days: 1 }).toISOString()
    const dayAgo = add(now, { days: -1 }).toISOString()

    render(
      <CountdownTimer
        stateExpiresAt={dayFromNow}
        stateUpdatedAt={dayAgo}
        expiryText="until counteroffer expires"
        respondByText="Awaiting response by Dec 5, 2023 12:00 PM"
      />
    )

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50"
    )
  })
  it("displays as imminent if state expires in 5 hours or less", () => {
    const now = new Date()
    const lessThanFive = add(now, { hours: 3, minutes: 3 }).toISOString()

    render(
      <CountdownTimer
        stateExpiresAt={lessThanFive}
        stateUpdatedAt={new Date().toISOString()}
        expiryText="until counteroffer expires"
        respondByText="Awaiting response by Dec 5, 2023 12:00 PM"
      />
    )

    expect(screen.getByRole("progressbar")).toHaveStyle({
      color: "orange150",
    })
  })
})
