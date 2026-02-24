import {
  type BoxProps,
  Clickable,
  Flex,
  SkeletonText,
  Text,
} from "@artsy/palette"
import type * as React from "react"

interface ArtworkDefinitionListProps extends BoxProps {
  term: string
  children: React.ReactNode
  onTitleClick?: () => void
  asRow?: boolean
  termColor?: string
}

export const ArtworkDefinitionList: React.FC<
  React.PropsWithChildren<ArtworkDefinitionListProps>
> = ({ term, children, onTitleClick, ...rest }) => {
  const { asRow = false, termColor, ...containerProps } = rest
  const hasPlainTextChildren =
    typeof children === "string" || typeof children === "number"

  return (
    <Flex
      as={asRow ? "div" : "dl"}
      flexDirection={["column", "row"]}
      {...containerProps}
    >
      <Text
        as="dt"
        variant="xs"
        width={150}
        flexShrink={0}
        mr={2}
        color={termColor}
      >
        {onTitleClick ? (
          <Clickable textDecoration="underline" onClick={onTitleClick}>
            <Text as="span" variant="xs" color={termColor}>
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

export const ArtworkDefinitionListSkeleton: React.FC<
  React.PropsWithChildren<BoxProps>
> = ({ children, ...rest }) => {
  return (
    <Flex as="dl" flexDirection={["column", "row"]} {...rest}>
      <SkeletonText variant="xs" width={150} flexShrink={0} mr={2} />
      <SkeletonText variant="xs" flex={1}>
        {children}
      </SkeletonText>
    </Flex>
  )
}
