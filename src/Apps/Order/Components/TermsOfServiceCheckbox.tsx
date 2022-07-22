import { Checkbox, Text } from "@artsy/palette"

export const TermsOfServiceCheckbox = props => {
  return (
    <Checkbox {...props}>
      <Text variant="sm-display" color="black60">
        {"Agree to "}
        <a href="https://www.artsy.net/terms" target="_blank">
          Terms & Conditions
        </a>
        {". All sales are final."}
      </Text>
    </Checkbox>
  )
}
