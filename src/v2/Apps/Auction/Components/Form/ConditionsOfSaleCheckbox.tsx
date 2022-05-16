import { Checkbox, Spacer, Text } from "@artsy/palette"
import { useFormContext } from "v2/Apps/Auction/Hooks/useFormContext"
import { RouterLink } from "v2/System/Router/RouterLink"

export const ConditionsOfSaleCheckbox: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
  } = useFormContext()

  const showErrorMessage = !!(touched.agreeToTerms && errors.agreeToTerms)

  const handleCheckboxSelect = value => {
    setFieldTouched("agreeToTerms")
    setFieldValue("agreeToTerms", value)
  }

  return (
    <>
      <Checkbox selected={values.agreeToTerms} onSelect={handleCheckboxSelect}>
        <Text variant="sm-display" ml={0.5}>
          Agree to{" "}
          <RouterLink
            display="inline"
            color="black100"
            to="/conditions-of-sale"
            target="_blank"
          >
            Conditions of Sale
          </RouterLink>
        </Text>
      </Checkbox>

      <Spacer my={1} />

      {showErrorMessage && (
        <Text variant="xs" my={1} color="red100">
          {errors.agreeToTerms}
        </Text>
      )}
    </>
  )
}
