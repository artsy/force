import { fireEvent, screen } from "@testing-library/react"
import { OfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/OfferInput"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { Formik } from "formik"
import { graphql } from "react-relay"
import type { OfferInputTestQuery } from "__generated__/OfferInputTestQuery.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<OfferInputTestQuery>({
  Component: ({ me, initialValue = 0, onBlur }: any) => (
    <Formik initialValues={{ offerValue: initialValue }} onSubmit={() => {}}>
      <OfferInput name="offerValue" order={me.order} onBlur={onBlur} />
    </Formik>
  ),
  query: graphql`
    query OfferInputTestQuery @relay_test_operation {
      me {
        order(id: "test") {
          ...OfferInput_order
        }
      }
    }
  `,
})

const setInputValue = (input: HTMLInputElement, value: string) => {
  fireEvent.change(input, { target: { value } })
}

describe("OfferInput", () => {
  describe("placeholder", () => {
    it("shows the currency symbol as a placeholder", () => {
      renderWithRelay({ Me: () => ({ order: { currencySymbol: "$" } }) })
      expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "$0")
    })

    it("shows no placeholder when the currency symbol is an empty string", () => {
      renderWithRelay({ Me: () => ({ order: { currencySymbol: "" } }) })
      expect(screen.getByRole("textbox")).not.toHaveAttribute("placeholder")
    })
  })

  describe("value display", () => {
    it("shows an empty input when the value is 0", () => {
      renderWithRelay(
        { Me: () => ({ order: { currencySymbol: "$" } }) },
        { initialValue: 0 },
      )
      expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("")
    })

    it("displays values with comma separators at thousands", () => {
      renderWithRelay(
        { Me: () => ({ order: { currencySymbol: "$" } }) },
        { initialValue: 4200 },
      )
      expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
        "4,200",
      )
    })

    it("displays large values with multiple comma separators", () => {
      renderWithRelay(
        { Me: () => ({ order: { currencySymbol: "$" } }) },
        { initialValue: 2389274922 },
      )
      expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
        "2,389,274,922",
      )
    })
  })

  describe("input handling", () => {
    it("updates the displayed value when the user enters numbers", () => {
      renderWithRelay({ Me: () => ({ order: { currencySymbol: "$" } }) })
      const input = screen.getByRole("textbox") as HTMLInputElement

      setInputValue(input, "1")
      expect(input.value).toBe("1")

      setInputValue(input, "12")
      expect(input.value).toBe("12")

      setInputValue(input, "2389274922")
      expect(input.value).toBe("2,389,274,922")
    })

    it("ignores non-numeric characters", () => {
      renderWithRelay({ Me: () => ({ order: { currencySymbol: "$" } }) })
      const input = screen.getByRole("textbox") as HTMLInputElement

      setInputValue(input, "1d")
      expect(input.value).toBe("1")

      setInputValue(input, "1d2")
      expect(input.value).toBe("12")

      setInputValue(input, "2139hello8729")
      expect(input.value).toBe("21,398,729")
    })

    it("calls onBlur with the current field value when blurred", () => {
      const onBlur = jest.fn()
      renderWithRelay(
        { Me: () => ({ order: { currencySymbol: "$" } }) },
        { onBlur },
      )
      const input = screen.getByRole("textbox") as HTMLInputElement

      setInputValue(input, "500")
      fireEvent.blur(input)

      expect(onBlur).toHaveBeenCalledWith(500)
    })
  })
})
