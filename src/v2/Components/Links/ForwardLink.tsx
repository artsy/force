import React from "react"
import { ChevronIcon, Flex, Text } from "@artsy/palette"
import { StyledLink } from "./StyledLink"

interface ForwardLinkProps {
  linkText: string
  path: string
}

export const ForwardLink: React.FC<ForwardLinkProps> = ({ linkText, path }) => {
  return (
    <Flex flexDirection="row" alignItems="center" mt={1}>
      <Text variant="mediumText" mr="3px">
        <StyledLink to={path}>{linkText}</StyledLink>
      </Text>
      <ChevronIcon
        direction="right"
        color="black"
        height="18px"
        width="14px"
        top="-1px"
      />
    </Flex>
  )
}
