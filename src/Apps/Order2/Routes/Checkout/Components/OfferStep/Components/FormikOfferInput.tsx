import { Input } from "@artsy/palette"
import { useField } from "formik"
import type { FC } from "react"

export interface FormikOfferInputProps {
  name: string
  onBlur?: (value: number | undefined) => void
}

export const FormikOfferInput: FC<FormikOfferInputProps> = ({ name, onBlur }) => {
  const [field, meta, helpers] = useField<number>(name)

  const formatValueForDisplay = (val: number | undefined) => {
    if (val !== undefined && val > 0) {
      return val.toLocaleString("en-US")
    }
    return ""
  }

  const showError = !!meta.error

  const handleBlur = () => {
    if (onBlur) {
      onBlur(field.value)
    }
  }

  return (
    <Input
      title="Your offer"
      type="text"
      pattern="[0-9]"
      error={showError ? meta.error : false}
      inputMode={"numeric"}
      onBlur={handleBlur}
      value={formatValueForDisplay(field.value)}
      data-testid={showError ? "offer-input-error" : "offer-input"}
      onChange={ev => {
        const currentValue = ev.currentTarget.value
        const cleanedValue = currentValue.replace(/[^\d]/g, "") // Remove non-digits
        helpers.setValue(Number(cleanedValue))
      }}
    />
  )
}
