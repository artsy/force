import { Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"

interface SellerNameProps extends React.ComponentProps<typeof Text> {
  name?: string | null
  href?: string | null
}

export const SellerName: React.FC<SellerNameProps> = ({
  name,
  href,
  variant = "sm",
  color = "mono60",
  ...rest
}) => {
  if (!name) {
    return null
  }

  return (
    <Text
      variant={variant}
      color={color}
      {...rest}
      {...(href
        ? {
            as: RouterLink,
            to: href,
            target: "_blank",
            textDecoration: "none",
          }
        : {})}
    >
      {name}
    </Text>
  )
}
