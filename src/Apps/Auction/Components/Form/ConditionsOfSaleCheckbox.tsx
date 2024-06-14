import { Checkbox, Spacer, Text } from "@artsy/palette"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

export const ConditionsOfSaleCheckbox: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
  } = useFormContext()

  const showNewDisclaimer = useFeatureFlag("diamond_new-terms-and-conditions")

  const showErrorMessage = !!(touched.agreeToTerms && errors.agreeToTerms)

  const handleCheckboxSelect = value => {
    setFieldTouched("agreeToTerms")
    setFieldValue("agreeToTerms", value)
  }

  return (
    <>
      <Checkbox
        selected={values.agreeToTerms}
        onSelect={handleCheckboxSelect}
        data-testid="disclaimer"
      >
        {showNewDisclaimer ? (
          <Text variant="sm-display" ml={0.5}>
            I agree to Artsy's{" "}
            <RouterLink
              inline
              display="inline"
              color="black100"
              to="/terms"
              target="_blank"
            >
              General Terms and Conditions of Sale
            </RouterLink>
            . I understand that all bids are binding and may not be retracted.
          </Text>
        ) : (
          <Text variant="sm-display" ml={0.5}>
            I agree to the{" "}
            <RouterLink
              inline
              display="inline"
              color="black100"
              to="/conditions-of-sale"
              target="_blank"
            >
              Conditions of Sale
            </RouterLink>
            . I understand that all bids are binding and may not be retracted.
          </Text>
        )}
      </Checkbox>

      <Spacer y={1} />

      {showErrorMessage && (
        <Text variant="xs" my={1} color="red100">
          {errors.agreeToTerms}
        </Text>
      )}
    </>
  )
}
