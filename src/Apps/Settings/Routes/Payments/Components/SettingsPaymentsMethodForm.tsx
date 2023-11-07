import * as Yup from "yup"
import {
  Button,
  Column,
  GridColumns,
  Input,
  Message,
  ModalDialog,
  useToasts,
  VisuallyHidden,
} from "@artsy/palette"
import { Formik, Form } from "formik"
import { FC } from "react"
import { CountrySelect } from "Components/CountrySelect"
import { CreditCardInput } from "Components/CreditCardInput"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { useAddCreditCard } from "Apps/Settings/Routes/Payments/useAddCreditCard"

export const INITIAL_VALUES = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "US",
  name: "",
  postalCode: "",
  region: "",
}

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  name: Yup.string().required("Name is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  region: Yup.string().required("Region is required"),
})

interface SettingsPaymentsMethodFormProps {
  onClose(): void
}

export const SettingsPaymentsMethodForm: FC<SettingsPaymentsMethodFormProps> = ({
  onClose,
}) => {
  const { sendToast } = useToasts()

  const stripe = useStripe()
  const elements = useElements()

  const { submitMutation } = useAddCreditCard()

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={INITIAL_VALUES}
      onSubmit={async (values, { setStatus, resetForm }) => {
        if (!stripe || !elements) {
          return setStatus({ error: true, message: "Unable to load Stripe." })
        }

        try {
          const cardNumberElement = elements.getElement(CardNumberElement)
          const cardExpiryElement = elements.getElement(CardExpiryElement)
          const cardCvcElement = elements.getElement(CardCvcElement)

          if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            return setStatus({
              error: true,
              message: "Unable to locate card elements.",
            })
          }

          const { token, error } = await stripe.createToken(cardNumberElement, {
            name: values.name,
            address_line1: values.addressLine1,
            address_line2: values.addressLine2,
            address_city: values.city,
            address_state: values.region,
            address_zip: values.postalCode,
            address_country: values.country,
          })

          if (error || !token) {
            return setStatus({
              error: true,
              message: "Unable to tokenize card",
            })
          }

          await submitMutation({
            variables: { input: { token: token.id } },
            rejectIf: res => {
              return res.createCreditCard?.creditCardOrError?.mutationError
            },
          })

          sendToast({
            variant: "success",
            message: "Card added successfully.",
          })

          resetForm()
          onClose()
        } catch (err) {
          console.error(err)

          const error = Array.isArray(err) ? err[0] : err

          setStatus({ error: true, message: error.message })
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        isValid,
        isSubmitting,
        submitForm,
      }) => {
        return (
          <ModalDialog
            title="Add Credit Card"
            width={800}
            onClose={onClose}
            footer={
              <Button
                width="100%"
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Save
              </Button>
            }
          >
            <Form>
              <GridColumns>
                <Column span={12}>
                  <CreditCardInput required />
                </Column>

                <Column span={12}>
                  <Input
                    name="name"
                    title="Full Name"
                    placeholder="Enter name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                    required
                  />
                </Column>

                <Column span={6}>
                  <CountrySelect
                    title="Country"
                    name="country"
                    // TODO: Accept a value prop in Select
                    // @ts-ignore
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.country && errors.country}
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="postalCode"
                    title="Postal Code"
                    placeholder="Add postal code"
                    autoComplete="postal-code"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postalCode && errors.postalCode}
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="addressLine1"
                    title="Address Line 1"
                    placeholder="Add address"
                    autoComplete="address-line1"
                    value={values.addressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.addressLine1 && errors.addressLine1}
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="addressLine2"
                    title="Address Line 2"
                    placeholder="Add address line 2"
                    autoComplete="address-line2"
                    value={values.addressLine2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.addressLine2 && errors.addressLine2}
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="city"
                    title="City"
                    placeholder="Enter city"
                    autoComplete="address-level2"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="region"
                    title="State, Province, or Region"
                    placeholder="Add state, province, or region"
                    autoComplete="address-level1"
                    value={values.region}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.region && errors.region}
                    required
                  />
                </Column>

                {status?.error && (
                  <Column span={12}>
                    <Message variant="error">
                      {status.message ||
                        "Something went wrong. Please try again."}
                    </Message>
                  </Column>
                )}
              </GridColumns>

              {/* Modal footer button is outside the form element. Hidden button supports <enter> */}
              <VisuallyHidden>
                <button type="submit" tabIndex={-1} disabled={!isValid}>
                  Save
                </button>
              </VisuallyHidden>
            </Form>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}
