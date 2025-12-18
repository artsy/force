import { render, screen, fireEvent } from "@testing-library/react"
import { StripePaymentCheckboxes } from "../StripePaymentCheckboxes"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"

describe("StripePaymentCheckboxes", () => {
  const mockOnSavePaymentMethodChange = jest.fn()
  const mockOnBillingAddressSameAsShippingChange = jest.fn()
  const mockOnBillingFormValuesChange = jest.fn()

  const defaultBillingFormValues: FormikContextWithAddress = {
    address: {
      name: "",
      country: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
      phoneNumber: "",
    },
  }

  const defaultProps = {
    savePaymentMethod: false,
    activeFulfillmentDetailsTab: "SHIP" as string | null,
    billingAddressSameAsShipping: true,
    billingFormValues: defaultBillingFormValues,
    onSavePaymentMethodChange: mockOnSavePaymentMethodChange,
    onBillingAddressSameAsShippingChange:
      mockOnBillingAddressSameAsShippingChange,
    onBillingFormValuesChange: mockOnBillingFormValuesChange,
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Credit Card Options", () => {
    it("shows save checkbox when stripe-card is selected", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
        />,
      )

      // Verify collapse is actually open. toBeVisible() alone is not sufficient
      // because it returns true even when Collapse is closed (height: 0px + overflow: hidden)
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      expect(creditCardCollapse).not.toHaveStyle({ height: "0px" })

      // Also check content is visible (checks display, visibility, opacity)
      expect(screen.getByText("Save credit card for later use")).toBeVisible()
    })

    it("does not show credit card options when stripe-card is not selected", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-ach"
        />,
      )

      // Collapse component hides content with height: 0px + overflow: hidden
      // toBeVisible() doesn't detect this, so we check the collapse container directly
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      expect(creditCardCollapse).toHaveStyle({ height: "0px" })
    })

    it("shows billing address same as shipping checkbox when not PICKUP", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
          activeFulfillmentDetailsTab="SHIP"
        />,
      )

      // Verify collapse is actually open. toBeVisible() alone is not sufficient
      // because it returns true even when Collapse is closed (height: 0px + overflow: hidden)
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      expect(creditCardCollapse).not.toHaveStyle({ height: "0px" })

      expect(screen.getByText("Billing address same as shipping")).toBeVisible()
    })

    it("does not show billing address same as shipping checkbox for PICKUP", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
          activeFulfillmentDetailsTab="PICKUP"
        />,
      )

      // Not rendered at all for PICKUP, so use queryBy + not.toBeInTheDocument
      expect(
        screen.queryByText("Billing address same as shipping"),
      ).not.toBeInTheDocument()
    })

    it("calls onSavePaymentMethodChange when save checkbox is toggled", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
        />,
      )

      const checkbox = screen.getByText("Save credit card for later use")
      fireEvent.click(checkbox)

      expect(mockOnSavePaymentMethodChange).toHaveBeenCalledWith(true)
    })

    it("calls onBillingAddressSameAsShippingChange when billing address checkbox is toggled", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
          activeFulfillmentDetailsTab="SHIP"
        />,
      )

      const checkbox = screen.getByText("Billing address same as shipping")
      fireEvent.click(checkbox)

      expect(mockOnBillingAddressSameAsShippingChange).toHaveBeenCalledWith(
        false,
      )
    })

    it("shows billing address form when billingAddressSameAsShipping is false", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
          billingAddressSameAsShipping={false}
        />,
      )

      // Verify collapse is actually open. toBeVisible() alone is not sufficient
      // because it returns true even when Collapse is closed (height: 0px + overflow: hidden)
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      expect(creditCardCollapse).not.toHaveStyle({ height: "0px" })

      expect(screen.getByText("Billing address")).toBeVisible()
    })

    it("shows billing address form for PICKUP fulfillment", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
          activeFulfillmentDetailsTab="PICKUP"
          billingAddressSameAsShipping={true}
        />,
      )

      // Verify collapse is actually open. toBeVisible() alone is not sufficient
      // because it returns true even when Collapse is closed (height: 0px + overflow: hidden)
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      expect(creditCardCollapse).not.toHaveStyle({ height: "0px" })

      expect(screen.getByText("Billing address")).toBeVisible()
    })

    it("does not show billing address form when billingAddressSameAsShipping is true and not PICKUP", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-card"
          billingAddressSameAsShipping={true}
          activeFulfillmentDetailsTab="SHIP"
        />,
      )

      expect(screen.queryByText("Billing address")).not.toBeInTheDocument()
    })
  })

  describe("Bank Debit Options (ACH)", () => {
    it("shows save checkbox when stripe-ach is selected", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-ach"
        />,
      )

      // Verify collapse is actually open. toBeVisible() alone is not sufficient
      // because it returns true even when Collapse is closed (height: 0px + overflow: hidden)
      const achCollapse = screen.getByTestId("stripe-ach-collapse")
      expect(achCollapse).not.toHaveStyle({ height: "0px" })

      expect(screen.getByText("Save bank account for later use.")).toBeVisible()
    })

    it("shows info icon with tooltip for ACH", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-ach"
        />,
      )

      // Verify collapse is actually open. toBeVisible() alone is not sufficient
      // because it returns true even when Collapse is closed (height: 0px + overflow: hidden)
      const achCollapse = screen.getByTestId("stripe-ach-collapse")
      expect(achCollapse).not.toHaveStyle({ height: "0px" })

      const infoIcon = screen.getByRole("button")
      expect(infoIcon).toBeVisible()
    })

    it("calls onSavePaymentMethodChange when ACH save checkbox is toggled", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-ach"
        />,
      )

      const checkbox = screen.getByText("Save bank account for later use.")
      fireEvent.click(checkbox)

      expect(mockOnSavePaymentMethodChange).toHaveBeenCalledWith(true)
    })
  })

  describe("SEPA Payment Method", () => {
    it("does not show bank debit options for stripe-sepa", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="stripe-sepa"
        />,
      )

      // Both card and ACH collapses should be closed for SEPA
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      const achCollapse = screen.getByTestId("stripe-ach-collapse")
      expect(creditCardCollapse).toHaveStyle({ height: "0px" })
      expect(achCollapse).toHaveStyle({ height: "0px" })
    })
  })

  describe("No Payment Method Selected", () => {
    it("does not show any options when selectedPaymentMethod is null", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod={null}
        />,
      )

      // Both collapses should be closed when no payment method is selected
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      const achCollapse = screen.getByTestId("stripe-ach-collapse")
      expect(creditCardCollapse).toHaveStyle({ height: "0px" })
      expect(achCollapse).toHaveStyle({ height: "0px" })
    })
  })

  describe("Wire Transfer", () => {
    it("does not show any checkboxes for wire transfer", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="wire"
        />,
      )

      // Both collapses should be closed for wire transfer
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      const achCollapse = screen.getByTestId("stripe-ach-collapse")
      expect(creditCardCollapse).toHaveStyle({ height: "0px" })
      expect(achCollapse).toHaveStyle({ height: "0px" })
    })
  })

  describe("Saved Payment Method", () => {
    it("does not show any checkboxes for saved payment method", () => {
      render(
        <StripePaymentCheckboxes
          {...defaultProps}
          selectedPaymentMethod="saved"
        />,
      )

      // Both collapses should be closed for saved payment method
      const creditCardCollapse = screen.getByTestId("stripe-card-collapse")
      const achCollapse = screen.getByTestId("stripe-ach-collapse")
      expect(creditCardCollapse).toHaveStyle({ height: "0px" })
      expect(achCollapse).toHaveStyle({ height: "0px" })
    })
  })
})
