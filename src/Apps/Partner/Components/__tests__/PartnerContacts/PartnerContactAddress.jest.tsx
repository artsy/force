import { PartnerContactAddress } from "Apps/Partner/Components/PartnerContacts/PartnerContactAddress"
import type { PartnerContactAddress_location$data } from "__generated__/PartnerContactAddress_location.graphql"
import { render, screen } from "@testing-library/react"

describe("PartnerContactAddress", () => {
  it("displays partner contact address", () => {
    render(
      <PartnerContactAddress
        location={
          {
            address: "address",
            phone: "123",
          } as PartnerContactAddress_location$data
        }
      />,
    )

    expect(screen.getByText("address")).toBeInTheDocument()
    expect(screen.getByText("Tel: 123")).toBeInTheDocument()
  })

  it("doesn't display partner contact phone number", () => {
    render(
      <PartnerContactAddress
        location={
          {
            address: "address",
          } as PartnerContactAddress_location$data
        }
      />,
    )

    expect(screen.getByText("address")).toBeInTheDocument()
    expect(screen.queryByText(/Tel:/)).not.toBeInTheDocument()
  })
})
