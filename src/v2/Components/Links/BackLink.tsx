import React from "react"
import { ChevronIcon, Flex, Text } from "@artsy/palette"
import { StyledLink } from "./StyledLink"

interface BackLinkProps {
  linkText: string
  path: string
}

export const BackLink: React.FC<BackLinkProps> = ({ linkText, path }) => {
  return (
    <>
      <Flex flexDirection="row" alignItems="center" my={3}>
        <ChevronIcon
          direction="left"
          color="black"
          height="18px"
          width="14px"
          top="-2px"
        />
        <Text variant="mediumText" ml="8px">
          <StyledLink to={path}>{linkText}</StyledLink>
        </Text>
      </Flex>
    </>
  )
}
