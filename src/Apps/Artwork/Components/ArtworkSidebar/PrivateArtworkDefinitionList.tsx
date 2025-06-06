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
  return (
    <Flex as="dl" flexDirection="row" {...rest}>
      {onTitleClick ? (
        <>
          <Clickable textDecoration="underline" onClick={onTitleClick}>
            <Text
              as="dt"
              variant="xs"
              width={150}
              flexShrink={0}
              mr={2}
              color="mono60"
            >
              {term}
            </Text>
          </Clickable>
        </>
      ) : (
        <Text
          as="dt"
          variant="xs"
          width={150}
          flexShrink={0}
          mr={2}
          color="mono60"
        >
          {term}
        </Text>
      )}

      <Text as="dd" variant="xs" color="mono60" flex={1}>
        {children}
      </Text>
    </Flex>
  )
}
