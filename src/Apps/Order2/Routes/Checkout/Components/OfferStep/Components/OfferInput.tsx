import { Input } from "@artsy/palette"
import type { OfferInput_order$key } from "__generated__/OfferInput_order.graphql"
import { useField } from "formik"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

export interface OfferInputProps {
  name: string
  order: OfferInput_order$key
  onBlur?: (value: number | undefined) => void
  showCurrencySymbol?: boolean
}

export const OfferInput: FC<OfferInputProps> = ({
  name,
  order,
  onBlur,
  showCurrencySymbol = false,
}) => {
  const [field, meta, helpers] = useField<number>(name)
  const { currencySymbol } = useFragment(FRAGMENT, order)

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
    <Input
      title={`Your offer${showCurrencySymbol && !!currencySymbol.length ? ` (${currencySymbol})` : ""}`}
      type="text"
      pattern="[0-9]"
      error={!!meta.error}
      inputMode={"numeric"}
      onBlur={handleBlur}
      value={formatValueForDisplay(field.value)}
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
  fragment OfferInput_order on Order {
    currencySymbol
  }
`
