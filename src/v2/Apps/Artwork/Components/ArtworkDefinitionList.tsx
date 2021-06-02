import React from "react"
import { BoxProps, Flex, Text } from "@artsy/palette"

interface ArtworkDefinitionListProps extends BoxProps {
  term: string
  children: React.ReactNode
}

export const ArtworkDefinitionList: React.FC<ArtworkDefinitionListProps> = ({
  term,
  children,
  ...rest
}) => {
  return (
    <Flex as="dl" flexDirection={["column", "row"]} {...rest}>
      <Text as="dt" variant="xs" width={150} flexShrink={0} mr={2}>
        {term}
      </Text>

      <Text as="dd" variant="xs" color="black60" flex={1}>
        {children}
      </Text>
    </Flex>
  )
}
