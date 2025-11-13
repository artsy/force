import {
  ADDRESS_FORM_INPUTS,
  fillAddressFormFields,
  hasCorrectAddressFormFields,
} from "Components/Address/__tests__/utils"
import {
  AddressFormFields,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { type Address, emptyAddress } from "Components/Address/utils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { Button } from "@artsy/palette"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Formik } from "formik"
import * as Yup from "yup"

describe("AddressFormFields", () => {
  const mockOnSubmit = jest.fn()
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  describe("without phone number input", () => {
    beforeEach(() => {
      render(
        <Formik
          onSubmit={mockOnSubmit}
          initialValues={{
            address: emptyAddress,
          }}
          validationSchema={Yup.object().shape({
            ...addressFormFieldsValidator({ withLegacyPhoneInput: false }),
          })}
        >
          {formikBag => (
            <>
              <AddressFormFields />
              <Button type="submit" onClick={() => formikBag.handleSubmit()}>
                Submit
              </Button>
            </>
          )}
        </Formik>
      )
    })

    it("renders the correct components with label & placeholder copy", () => {
      expect(hasCorrectAddressFormFields({ withLegacyPhoneInput: false })).toBe(
        true
      )
    })

    it("can be filled out with valid values", async () => {
      const address: Address = {
        name: "Mr Art Collector",
        country: "US",
        postalCode: "10013",
        addressLine1: "123 Main St",
        addressLine2: "Apt 23",
        city: "New York",
        region: "NY",
      }

      await fillAddressFormFields(address)

      await userEvent.click(screen.getByText("Submit"))

      await flushPromiseQueue()
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          address: {
            addressLine1: "123 Main St",
            addressLine2: "Apt 23",
            city: "New York",
            country: "US",
            name: "Mr Art Collector",
            phoneNumber: "",
            postalCode: "10013",
            region: "NY",
          },
        },
        expect.anything()
      )
    })

    it("validates required fields", async () => {
      await userEvent.click(screen.getByText("Submit"))

      await flushPromiseQueue()
      expect(mockOnSubmit).not.toHaveBeenCalled()

      screen.getByText("Full name is required")
      screen.getByText("Country is required")
      screen.getByText("Street address is required")
      screen.getByText("City is required")
      expect(
        screen.queryByText("Phone number is required")
      ).not.toBeInTheDocument()
      expect(screen.queryByText("State is required")).not.toBeInTheDocument()
    })
  })

  describe("with rich phone number input", () => {
    beforeEach(() => {
      render(
        <Formik
          onSubmit={mockOnSubmit}
          initialValues={{
            address: emptyAddress,
            phoneNumber: "",
          }}
          validationSchema={Yup.object().shape({
            ...addressFormFieldsValidator({ withPhoneNumber: true }),
          })}
        >
          {formikBag => (
            <>
              <AddressFormFields withPhoneNumber />
              <Button type="submit" onClick={() => formikBag.handleSubmit()}>
                Submit
              </Button>
            </>
          )}
        </Formik>
      )
    })

    it("renders the correct components with label & placeholder copy", () => {
      expect(hasCorrectAddressFormFields({ withLegacyPhoneInput: false })).toBe(
        true
      )

      const countryCodeInput = screen.getByTestId("country-picker")
      expect(countryCodeInput).toBeInTheDocument()

      const phoneNumberInput = screen.getByTestId(
        "addressFormFields.phoneNumber"
      )
      expect(phoneNumberInput).toBeInTheDocument()

      Object.values(ADDRESS_FORM_INPUTS).forEach(({ label, placeholder }) => {
        // This is for the legacy phone number input only
        if (label === "Phone number") {
          return
        }
        const input = screen.getByLabelText(label)
        expect(input).toBeInTheDocument()
        if (placeholder) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(input).toHaveAttribute("placeholder", placeholder)
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(input).not.toHaveAttribute("placeholder")
        }
      })
    })
  })
  describe("with legacy phone number input", () => {
    beforeEach(() => {
      render(
        <Formik
          onSubmit={mockOnSubmit}
          initialValues={{
            address: emptyAddress,
            phoneNumber: "",
          }}
          validationSchema={Yup.object().shape({
            ...addressFormFieldsValidator({ withLegacyPhoneInput: true }),
          })}
        >
          {formikBag => (
            <>
              <AddressFormFields withLegacyPhoneInput />
              <Button type="submit" onClick={() => formikBag.handleSubmit()}>
                Submit
              </Button>
            </>
          )}
        </Formik>
      )
    })

    it("renders the correct components with label & placeholder copy", () => {
      expect(hasCorrectAddressFormFields({ withLegacyPhoneInput: true })).toBe(
        true
      )
      Object.values(ADDRESS_FORM_INPUTS).forEach(({ label, placeholder }) => {
        const input = screen.getByLabelText(label)
        expect(input).toBeInTheDocument()
        if (placeholder) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(input).toHaveAttribute("placeholder", placeholder)
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(input).not.toHaveAttribute("placeholder")
        }
      })
    })

    it("can be filled out with valid values", async () => {
      const address: Address = {
        name: "Mr Art Collector",
        country: "US",
        postalCode: "10013",
        addressLine1: "123 Main St",
        addressLine2: "Apt 23",
        city: "New York",
        region: "NY",
        phoneNumber: "5555937743",
      }

      await fillAddressFormFields(address)

      await userEvent.click(screen.getByText("Submit"))

      await flushPromiseQueue()
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          address: {
            addressLine1: "123 Main St",
            addressLine2: "Apt 23",
            city: "New York",
            country: "US",
            name: "Mr Art Collector",
            phoneNumber: "",
            postalCode: "10013",
            region: "NY",
          },
          phoneNumber: "5555937743",
        },
        expect.anything()
      )
    })

    it("validates required fields", async () => {
      await userEvent.click(screen.getByText("Submit"))

      await flushPromiseQueue()
      expect(mockOnSubmit).not.toHaveBeenCalled()

      await screen.findByText("Full name is required")
      screen.getByText("Country is required")
      screen.getByText("Street address is required")
      screen.getByText("City is required")
      screen.getByText("Phone number is required")
      expect(screen.queryByText("State is required")).not.toBeInTheDocument()
      expect(screen.queryByText("ZIP code is required")).not.toBeInTheDocument()

      await fillAddressFormFields({ country: "US" })
      await userEvent.click(screen.getByText("Submit"))

      await waitFor(() => {
        expect(
          screen.queryByText("Country is required")
        ).not.toBeInTheDocument()
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
      screen.getByText("State is required")
      screen.getByText("ZIP code is required")
    })
  })
})
