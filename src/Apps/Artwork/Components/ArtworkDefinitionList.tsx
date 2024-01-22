import * as React from "react"
import { BoxProps, Flex, Text, Clickable } from "@artsy/palette"
// import { useState } from "react"

interface ArtworkDefinitionListProps extends BoxProps {
  term: string
  children: React.ReactNode
  // modalComponent?: React.ReactNode
}

export const ArtworkDefinitionList: React.FC<ArtworkDefinitionListProps> = ({
  term,
  children,
  ...rest
}) => {
  // const [showModal, setShowModal] = useState(false)

  return (
    <Flex as="dl" flexDirection={["column", "row"]} {...rest}>
      {/* <Clickable textDecoration="underline"> */}
      <Text as="dt" variant="xs" width={150} flexShrink={0} mr={2}>
        {term}
      </Text>
      {/* </Clickable> */}

      <Text as="dd" variant="xs" color="black60" flex={1}>
        {children}
      </Text>
    </Flex>
  )
}
