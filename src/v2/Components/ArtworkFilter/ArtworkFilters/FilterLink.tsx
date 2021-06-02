import React, { ReactNode } from "react"
import {
  BoxProps,
  Clickable,
  Text,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"

interface FilterLinkProps extends BoxProps {
  onClick: () => void
  children: ReactNode
}

export const FilterLink: React.FC<FilterLinkProps> = ({
  onClick,
  children,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: { variant: "small" as TextVariant },
    v3: { variant: "xs" as TextVariant },
  })

  return (
    <Clickable
      mt={1}
      textDecoration="underline"
      textAlign="left"
      onClick={onClick}
      {...rest}
    >
      <Text variant={tokens.variant}>{children}</Text>
    </Clickable>
  )
}
