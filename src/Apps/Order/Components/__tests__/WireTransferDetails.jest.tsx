import { screen, render } from "@testing-library/react"
import { WireTransferDetails } from "Apps/Order/Components/WireTransferDetails"

describe("WireTransferDetails", () => {
  it("renders a title", () => {
    render(<WireTransferDetails />)
    expect(screen.queryByText("Wire transfer")).toBeInTheDocument()
  })

  it("renders 2 description texts when no props passed", () => {
    render(<WireTransferDetails />)
    expect(
      screen.queryByText(
        "• Please inform your bank that you will be responsible for all wire transfer fees."
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        "• To pay by wire transfer, complete checkout and a member of the Artsy team will contact you with next steps by email."
      )
    ).toBeInTheDocument()
  })

  it("does not render description texts when withDescription dictates so", () => {
    render(<WireTransferDetails withDescription={false} />)
    expect(
      screen.queryByText(
        "• Please inform your bank that you will be responsible for all wire transfer fees."
      )
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        "• To pay by wire transfer, complete checkout and a member of the Artsy team will contact you with next steps by email."
      )
    ).not.toBeInTheDocument()
  })

  it("renders correct explanation content for private sale orders", () => {
    render(<WireTransferDetails orderSource="private_sale" />)

    expect(
      screen.queryByText(
        "• To pay by wire transfer, complete checkout to view banking details"
      )
    ).not.toBeInTheDocument()
  })
})
