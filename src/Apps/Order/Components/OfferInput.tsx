import { Input } from "@artsy/palette"
import { FC } from "react"

export interface OfferInputProps {
  id: string
  noTitle?: boolean
  showError?: boolean
  onChange: (value: number) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const OfferInput: FC<OfferInputProps> = ({
  id,
  noTitle,
  showError,
  onFocus,
  onBlur,
  onChange,
}) => {
  return (
    <Input
      id={id}
      title={noTitle ? "" : "Your offer"}
      type="text"
      pattern="[0-9]"
      error={showError ? "Offer amount missing or invalid." : false}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={ev => {
        const currentValue = ev.currentTarget.value
        const nonDigitMatch = currentValue.match(/\D/)

        if (nonDigitMatch) {
          const cursorOffset = currentValue.indexOf(nonDigitMatch[0])
          const nextValue = currentValue.replace(/\D/g, "")
          ev.currentTarget.value = nextValue
          ev.currentTarget.setSelectionRange(cursorOffset, cursorOffset)
        }

        onChange(Number(ev.currentTarget.value || "0"))
      }}
    />
  )
}
