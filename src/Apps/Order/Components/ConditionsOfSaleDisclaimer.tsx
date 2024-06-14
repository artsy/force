import { Text, TextProps } from "@artsy/palette"
import * as React from "react"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface Props {
  textProps?: Partial<TextProps>
  orderSource?: string | null
}

export const ConditionsOfSaleDisclaimer: React.FC<Props> = ({
  textProps,
  orderSource,
}) => {
  const showNewDisclaimer = useFeatureFlag("diamond_new-terms-and-conditions")

  if (orderSource === "private_sale") {
    return (
      <Text variant="sm" color="black60" {...textProps}>
        By clicking Complete Purchase, I agree to the{" "}
        <RouterLink
          inline
          color="black100"
          textDecoration="underline"
          to="/private-sales-conditions-of-sale"
          target="_blank"
          rel="noopener noreferrer"
        >
          Artsy Private Sales LLC Conditions of Sale
        </RouterLink>{" "}
        and any Additional Conditions of Sale specified on this page and in the
        order confirmation email.
      </Text>
    )
  }

  return showNewDisclaimer ? (
    <Text variant="xs" color="black60" {...textProps}>
      By clicking Submit, I agree to Artsy’s{" "}
      <RouterLink inline to="/terms" target="_blank">
        General Terms and Conditions of Sale.
      </RouterLink>
    </Text>
  ) : (
    <Text variant="xs" color="black60" {...textProps}>
      By clicking Submit, I agree to Artsy’s{" "}
      <RouterLink inline to="/conditions-of-sale" target="_blank">
        Conditions of Sale.
      </RouterLink>
    </Text>
  )
}
