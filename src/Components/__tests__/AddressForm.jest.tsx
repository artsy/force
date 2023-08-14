import { screen, render, fireEvent } from "@testing-library/react"
import { AddressForm } from "Components/AddressForm"
import { FC, useState } from "react"

describe("AddressForm", () => {
  it("preserves updated value from props after user input", () => {
    const Page: FC = () => {
      const [address, setAddress] = useState({ addressLine1: "Before update" })
      const updateAddress = () => {
        setAddress({ addressLine1: "After update" })
      }

      return (
        <>
          <AddressForm
            value={address}
            errors={{}}
            touched={{}}
            onChange={address => {
              setAddress(address)
            }}
          />
          <button onClick={updateAddress}>Update</button>
        </>
      )
    }

    render(<Page />)

    const line1 = screen.getByPlaceholderText(
      "Street address"
    ) as HTMLInputElement
    expect(line1.value).toBe("Before update")

    fireEvent.click(screen.getByText("Update"))
    expect(line1.value).toBe("After update")

    const city = screen.getByPlaceholderText("City")
    fireEvent.change(city, { target: { value: "New York" } })
    expect(line1.value).toBe("After update")
  })
})
