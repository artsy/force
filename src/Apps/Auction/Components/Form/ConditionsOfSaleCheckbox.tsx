import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { RouterLink } from "System/Components/RouterLink"
import { Checkbox, Spacer, Text } from "@artsy/palette"

export const ConditionsOfSaleCheckbox: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { values, touched, errors, setFieldTouched, setFieldValue } =
    useAuctionFormContext()

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
        <Text variant="sm-display" ml={0.5}>
          I agree to Artsy's{" "}
          <RouterLink
            inline
            display="inline"
            color="mono100"
            to="/terms"
            target="_blank"
          >
            General Terms and Conditions of Sale
          </RouterLink>
          . I understand that all bids are binding and may not be retracted.
        </Text>
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
