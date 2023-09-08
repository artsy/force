import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Button } from "@artsy/palette"

import userEvent from "@testing-library/user-event"
import {
  AddressFormValues,
  AddressFormWrapper,
  AddressInputs,
  EMPTY_ADDRESS,
} from "Components/Address/NewAddressForm"
import { Form } from "formik"

const mockOnSubmit = jest.fn()

const BasicAddressForm = props => {
  return (
    <AddressFormWrapper<AddressFormValues>
      initialValues={EMPTY_ADDRESS}
      onSubmit={mockOnSubmit}
      {...props}
    >
      <Form>
        <AddressInputs />
        <Button type="submit">Submit</Button>
      </Form>
    </AddressFormWrapper>
  )
}

beforeEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

describe("AddressForm with context", () => {
  describe("Basic usage", () => {
    it("renders the form with initial values", () => {
      render(
        <BasicAddressForm
          initialValues={{
            name: "Erik",
            country: "US",
            addressLine1: "123 Main St",
            city: "New York",
            region: "NY",
            postalCode: "10001",
          }}
        />
      )
      const name = screen.getByPlaceholderText("Enter name")
      expect(name).toHaveValue("Erik")

      const country = screen.getByTestId("address-country-select")
      expect(country).toHaveValue("US")

      const line1 = screen.getByPlaceholderText("Add street address")
      expect(line1).toHaveValue("123 Main St")

      const line2 = screen.getByPlaceholderText("Add apt, floor, suite, etc.")
      expect(line2).toHaveValue("")

      const postalCode = screen.getByPlaceholderText("Add postal code")
      expect(postalCode).toHaveValue("10001")

      const city = screen.getByPlaceholderText("Add city")
      expect(city).toHaveValue("New York")

      const region = screen.getByPlaceholderText(
        "Add state, province, or region"
      )
      expect(region).toHaveValue("NY")
    })

    it("submits the form with the filled-in values", async () => {
      render(<BasicAddressForm initialValues={EMPTY_ADDRESS} />)

      const name = screen.getByPlaceholderText("Enter name")

      // Required when filling formik inputs: https://github.com/testing-library/user-event/issues/539#issuecomment-754646096
      await userEvent.type(name, "Erik", { delay: 1 })
      expect(name).toHaveValue("Erik")

      const country = screen.getByTestId("address-country-select")
      act(() => userEvent.selectOptions(country, "US"))
      expect(country).toHaveValue("US")

      const line1 = screen.getByPlaceholderText("Add street address")
      await userEvent.type(line1, "123 Main St", { delay: 1 })

      const line2 = screen.getByPlaceholderText("Add apt, floor, suite, etc.")
      await userEvent.type(line2, "Apt. 1", { delay: 1 })

      const postalCode = screen.getByPlaceholderText("Add postal code")
      await userEvent.type(postalCode, "10001", { delay: 1 })

      const city = screen.getByPlaceholderText("Add city")
      await userEvent.type(city, "New York", { delay: 1 })

      const region = screen.getByPlaceholderText(
        "Add state, province, or region"
      )
      await userEvent.type(region, "NY", { delay: 1 })
      expect(region).toHaveValue("NY")

      // UserEvent doesn't work with Palette's Button component or Formik's Form component
      const submit = screen.getByText("Submit")
      fireEvent.click(submit)

      await waitFor(() =>
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            addressLine1: "123 Main St",
            addressLine2: "Apt. 1",
            city: "New York",
            country: "US",
            name: "Erik",
            postalCode: "10001",
            region: "NY",
          },
          expect.anything()
        )
      )
    })

    it("validates the form with a custom function", async () => {
      render(
        <BasicAddressForm
          initialValues={EMPTY_ADDRESS}
          validate={values => {
            if (values.name !== "Erik") {
              return { name: "Name must be Erik" }
            }
            return {}
          }}
        />
      )

      const name = screen.getByPlaceholderText("Enter name")

      fireEvent.change(name, { target: { value: "Adam" } })
      fireEvent.blur(name)

      // UserEvent doesn't work with Palette's Button component or Formik's Form component
      const submit = screen.getByText("Submit")
      fireEvent.click(submit)

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled()
        screen.getByText("Name must be Erik")
      })

      fireEvent.change(name, { target: { value: "Erik" } })
      fireEvent.blur(name)

      fireEvent.click(submit)

      await waitFor(() => {
        expect(screen.queryByText("Name must be Erik")).not.toBeInTheDocument()
        // TODO: figure out why this isn't working. In fact multiple things
        // Aren't happening in jest which should - clicking submit should
        // automatically touch all fields but it isn't, which causes default
        // untouched form validation to fail too, which is why we have to
        // manually touch and blur with fireEvent.

        // expect(mockOnSubmit).toHaveBeenCalled()
      })
    })
  })
})
