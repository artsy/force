import * as React from "react"
import { BoxProps, Clickable, Flex, Text } from "@artsy/palette"
interface PrivateArtworkDefinitionListProps extends BoxProps {
  term: string
  children: React.ReactNode
  onTitleClick?: () => void
}

export const PrivateArtworkDefinitionList: React.FC<PrivateArtworkDefinitionListProps> = ({
  term,
  children,
  onTitleClick,
  ...rest
}) => {
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
              color="black60"
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
          color="black60"
        >
          {term}
        </Text>
      )}

      <Text as="dd" variant="xs" color="black60" flex={1}>
        {children}
      </Text>
    </Flex>
  )
}
