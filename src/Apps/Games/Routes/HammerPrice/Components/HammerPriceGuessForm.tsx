import { Box, Button, Input } from "@artsy/palette"
import {
  currencyPrefix,
  formatDigitsWithSeparators,
} from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import { useState } from "react"

export interface HammerPriceGuessFormProps {
  digitCount: number
  currency: string
  /** Normalized digit string (no separators), filled left to right */
  value: string
  disabled?: boolean
  onChange: (digits: string) => void
  onSubmit: () => void
}

/**
 * Accessible price entry: a standard numeric input with formatted
 * presentation. Thousands separators are display-only — the value is a
 * normalized digit string — and submission is explicit via the button or
 * the Enter key on a complete entry.
 */
export const HammerPriceGuessForm: React.FC<
  React.PropsWithChildren<HammerPriceGuessFormProps>
> = ({ digitCount, currency, value, disabled, onChange, onSubmit }) => {
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)

    const digits = event.currentTarget.value
      .replace(/\D/g, "")
      .slice(0, digitCount)

    onChange(digits)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (disabled) {
      return
    }

    if (value.length !== digitCount) {
      setError(
        `Enter all ${digitCount} digits before submitting — leading zeroes count.`,
      )

      return
    }

    setError(null)
    onSubmit()
  }

  const placeholder = formatDigitsWithSeparators({
    digits: "0".repeat(digitCount),
  })

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate>
      <Input
        title={`Your guess (${currencyPrefix(currency).trim()})`}
        description={`The realized price is a ${digitCount}-digit amount in ${currency}.`}
        name="guess"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        value={formatDigitsWithSeparators({ digits: value, digitCount })}
        onChange={handleChange}
        error={error ?? undefined}
        disabled={disabled}
      />

      <Button
        type="submit"
        variant="primaryBlack"
        width="100%"
        mt={2}
        disabled={disabled}
      >
        Submit guess
      </Button>
    </Box>
  )
}
