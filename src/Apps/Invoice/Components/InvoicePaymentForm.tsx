import { Button, Spacer } from "@artsy/palette"
import { AddressFormValues } from "Apps/Invoice/Components/AddressForm"
import { AddressFormWithCreditCard } from "Apps/Invoice/Components/AddressFormWithCreditCard"
import { useCreateTokenAndSubmit } from "Apps/Invoice/Hooks/useCreateTokenAndSubmit"
import { emptyAddress } from "Components/Address/AddressForm"
import { Formik, Form } from "formik"
import { useRouter } from "System/Hooks/useRouter"

export interface InvoicePaymentFormProps {
  invoiceID: string
  invoiceToken: string
  amountMinor: number
}

export const InvoicePaymentForm: React.FC<InvoicePaymentFormProps> = props => {
  const { match, router } = useRouter()
  const token = match.params.token
  const invoiceRoute = `/invoice/${token}`
  const onSuccess = () => {
    router.push(invoiceRoute)
  }
  const { createToken: handleSubmit } = useCreateTokenAndSubmit({
    onSuccess,
    ...props,
  })

  return (
    <Formik<AddressFormValues>
      onSubmit={handleSubmit}
      initialValues={{ address: emptyAddress, creditCard: false }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <AddressFormWithCreditCard />

            <Spacer y={2} />

            <Button
              mt={2}
              size="large"
              width="100%"
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
            >
              Pay now
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
