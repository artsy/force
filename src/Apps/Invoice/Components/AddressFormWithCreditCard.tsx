import { ContextModule } from "@artsy/cohesion"
import { Join, Spacer } from "@artsy/palette"
import { useFormContext } from "Apps/Invoice/Hooks/useFormContext"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import type { Address } from "Components/Address/utils"
import { CreditCardInput } from "Components/CreditCardInput"

export interface AddressFormValues {
  address: Address
  creditCard?: boolean
}
export const AddressFormWithCreditCard: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { setFieldValue, setFieldTouched, setFieldError, errors, touched } =
    useFormContext()

  return (
    <Join separator={<Spacer y={2} />}>
      <CreditCardInput
        error={touched.creditCard && errors.creditCard}
        onChange={event => {
          setFieldTouched("creditCard", true)

          if (event.error?.message) {
            setFieldValue("creditCard", false)
            setFieldError("creditCard", event.error?.message)
            return
          }
          if (!event.complete) {
            setFieldValue("creditCard", false)
            return
          }
          if (event.complete) {
            setFieldValue("creditCard", true)
            return
          }
        }}
        required
      />

      {/* TODO: switch to a dedicated `invoice` ContextModule once one is
          added to @artsy/cohesion. Keeping `auctionRegistration` preserves
          the existing (incorrect) analytics value until then so we don't
          churn the dimension twice. */}
      <AddressFormFields<AddressFormValues>
        contextModule={ContextModule.auctionRegistration}
      />
    </Join>
  )
}
