import { type BoxProps, Clickable, Flex, Text } from "@artsy/palette"
import type * as React from "react"
interface PrivateArtworkDefinitionListProps extends BoxProps {
  term: string
  children: React.ReactNode
  onTitleClick?: () => void
}

export const PrivateArtworkDefinitionList: React.FC<
  React.PropsWithChildren<PrivateArtworkDefinitionListProps>
> = ({ term, children, onTitleClick, ...rest }) => {
  const hasPlainTextChildren =
    typeof children === "string" || typeof children === "number"

  return (
    <Flex as="dl" flexDirection="row" {...rest}>
      <Text
        as="dt"
        variant="xs"
        width={150}
        flexShrink={0}
        mr={2}
        color="mono60"
      >
        {onTitleClick ? (
          <Clickable textDecoration="underline" onClick={onTitleClick}>
            <Text as="span" variant="xs" color="mono60">
              {term}
            </Text>
          </Clickable>
        ) : (
          term
        )}
      </Text>

      <Flex as="dd" m={0} minWidth={0} flex={1}>
        {hasPlainTextChildren ? (
          <Text variant="xs" color="mono60">
            {children}
          </Text>
        ) : (
          children
        )}
      </Flex>
    </Flex>
  )
}
