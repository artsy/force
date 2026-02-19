import { LabeledInput } from "@artsy/palette"
import { useField } from "formik"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

export interface OfferInputProps {
  name: string
  order: OfferInput_order$key
  onBlur?: (value: number | undefined) => void
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
}

const getCurrencySymbol = (currencyCode: string): string => {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode
}

export const OfferInput: FC<OfferInputProps> = ({ name, order, onBlur }) => {
  const [field, meta, helpers] = useField<number>(name)
  const orderData = useFragment(FRAGMENT, order)

  const formatValueForDisplay = (val: number | undefined) => {
    if (val !== undefined && val > 0) {
      return val.toLocaleString("en-US")
    }
    return ""
  }

  const handleBlur = () => {
    if (onBlur) {
      onBlur(field.value)
    }
  }

  return (
    <LabeledInput
      title="Your offer"
      type="text"
      pattern="[0-9]"
      error={!!meta.error}
      inputMode={"numeric"}
      onBlur={handleBlur}
      value={formatValueForDisplay(field.value)}
      label={currencySymbol}
      variant="prefix"
      data-testid="offer-input"
      onChange={event => {
        const currentValue = event.currentTarget.value
        const cleanedValue = currentValue.replace(/[^\d]/g, "") // Remove non-digits
        helpers.setValue(Number(cleanedValue))
      }}
    />
  )
}

const FRAGMENT = graphql`
  fragment OfferInput_order on CommerceOrder {
    currencySymbol
  }
`
