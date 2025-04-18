import { type BoxProps, Clickable, Flex, Text } from "@artsy/palette"
import type * as React from "react"
interface ArtworkDefinitionListProps extends BoxProps {
  term: string
  children: React.ReactNode
  onTitleClick?: () => void
}

export const ArtworkDefinitionList: React.FC<
  React.PropsWithChildren<ArtworkDefinitionListProps>
> = ({ term, children, onTitleClick, ...rest }) => {
  return (
    <Flex as="dl" flexDirection={["column", "row"]} {...rest}>
      {onTitleClick ? (
        <>
          <Clickable textDecoration="underline" onClick={onTitleClick}>
            <Text as="dt" variant="xs" width={150} flexShrink={0} mr={2}>
              {term}
            </Text>
          </Clickable>
        </>
      ) : (
        <Text as="dt" variant="xs" width={150} flexShrink={0} mr={2}>
          {term}
        </Text>
      )}

      <Text as="dd" variant="xs" color="mono60" flex={1}>
        {children}
      </Text>
    </Flex>
  )
}
