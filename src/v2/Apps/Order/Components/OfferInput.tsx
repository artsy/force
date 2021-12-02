import { Input } from "@artsy/palette"
import { Component } from "react"

export interface OfferInputProps {
  id: string
  showError?: boolean
  onChange: (value: number) => void
  onFocus?: () => void
}

export class OfferInput extends Component<OfferInputProps> {
  render() {
    const { id, showError, onFocus } = this.props

    return (
      <Input
        id={id}
        type="text"
        pattern="[0-9]"
        error={showError ? "Offer amount missing or invalid." : false}
        onFocus={onFocus}
        onChange={ev => {
          const currentValue = ev.currentTarget.value
          const nonDigitMatch = currentValue.match(/\D/)

          if (nonDigitMatch) {
            const cursorOffset = currentValue.indexOf(nonDigitMatch[0])
            const nextValue = currentValue.replace(/\D/g, "")
            ev.currentTarget.value = nextValue
            ev.currentTarget.setSelectionRange(cursorOffset, cursorOffset)
          }

          this.props.onChange(Number(ev.currentTarget.value || "0"))
        }}
      />
    )
  }
}
