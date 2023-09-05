import { screen, render, fireEvent } from "@testing-library/react"
import { AddressForm } from "Components/Address/AddressForm"
import { FC, useState } from "react"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(() => {
    return {
      key: "smarty-api-key",
    }
  }),
}))

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

  describe("address autocomplete is enabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        featureName => featureName === "address_autocomplete_us"
      )

      const mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          suggestions: [
            {
              city: "New York",
              entries: 0,
              secondary: "Fl 25",
              state: "NY",
              street_line: "401 Broadway",
              zipcode: "10013",
            },
          ],
        }),
      })

      // @ts-ignore
      global.fetch = mockFetch
    })

    afterAll(() => {
      jest.resetAllMocks()
    })

    describe("address line 1", () => {
      it("shows suggestions", async () => {
        render(<AddressForm onChange={jest.fn()} errors={{}} touched={{}} />)

        const input = screen.getByPlaceholderText("Street address")
        fireEvent.change(input, { target: { value: "401 Broadway" } })

        const listbox = await screen.findByRole("listbox", { hidden: true })

        expect(listbox).toHaveTextContent(
          "401 Broadway Fl 25 New York, NY 10013"
        )
      })
    })
  })
})
