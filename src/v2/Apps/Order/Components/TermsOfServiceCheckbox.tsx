import { Checkbox, Text, TextVariant, useThemeConfig } from "@artsy/palette"
import React from "react"

export const TermsOfServiceCheckbox = props => {
  const styles = useThemeConfig({
    v2: {
      variant: "mediumText" as TextVariant,
    },
    v3: {
      variant: "sm" as TextVariant,
    },
  })

  return (
    <Checkbox {...props}>
      <Text variant={styles.variant} color="black60">
        {"Agree to "}
        <a href="https://www.artsy.net/terms" target="_blank">
          Terms & Conditions
        </a>
        {". All sales are final."}
      </Text>
    </Checkbox>
  )
}
