import { Input } from "@artsy/palette"
import type { FC } from "react"

export interface OfferInputProps {
  id: string
  noTitle?: boolean
  showError?: boolean
  onChange: (value: number) => void
  onFocus?: () => void
  onBlur?: () => void
  value?: number
}

export const OfferInput: FC<React.PropsWithChildren<OfferInputProps>> = ({
  id,
  noTitle,
  showError,
  onFocus,
  onBlur,
  onChange,
  value,
}) => {
  const formatValueForDisplay = (val: number | undefined) => {
    if (val !== undefined && val > 0) {
      return val.toLocaleString("en-US")
    }
    return ""
  }

  return (
    <Input
      id={id}
      title={noTitle ? "" : "Your offer"}
      type="text"
      pattern="[0-9]"
      error={showError ? "Offer amount missing or invalid." : false}
      inputMode={"numeric"}
      onFocus={onFocus}
      onBlur={onBlur}
      value={formatValueForDisplay(value)}
      data-testid={showError ? "offer-input-error" : "offer-input"}
      onChange={ev => {
        const currentValue = ev.currentTarget.value
        const cleanedValue = currentValue.replace(/[^\d]/g, "") // Remove non-digits
        onChange(Number(cleanedValue))
      }}
    />
  )
}
