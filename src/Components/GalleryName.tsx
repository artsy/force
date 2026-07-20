import { Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"

interface GalleryNameProps extends React.ComponentProps<typeof Text> {
  name?: string | null
  href?: string | null
}

export const GalleryName: React.FC<GalleryNameProps> = ({
  name,
  href,
  ...rest
}) => {
  if (!name) {
    return null
  }

  return (
    <Text
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
