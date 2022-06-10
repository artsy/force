import { screen, render } from "@testing-library/react"
import { WireTransferDetails } from "../WireTransferDetails"

describe("WireTransferDetails", () => {
  it("renders a title", () => {
    render(<WireTransferDetails />)
    expect(screen.queryByText("Wire transfer")).toBeInTheDocument()
  })

  it("renders 2 description texts when no props passed", () => {
    render(<WireTransferDetails />)
    expect(
      screen.queryByText("• Your bank may charge a fee for the transaction.")
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        "• To pay by wire transfer, complete checkout and a member of the Artsy team will contact you with next steps by email."
      )
    ).toBeInTheDocument()
  })

  it("does not render description texts when withDescription dictates otherwise", () => {
    render(<WireTransferDetails withDescription={false} />)
    expect(
      screen.queryByText("• Your bank may charge a fee for the transaction.")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        "• To pay by wire transfer, complete checkout and a member of the Artsy team will contact you with next steps by email."
      )
    ).not.toBeInTheDocument()
  })
})
