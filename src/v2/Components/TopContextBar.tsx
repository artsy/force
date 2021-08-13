import React from "react"
import { Flex, FullBleed, Separator } from "@artsy/palette"

export const TopContextBar: React.FC = ({ children }) => {
  return (
    <>
      <Flex height={50} flexDirection="column" justifyContent="center">
        {children}
      </Flex>

      <FullBleed>
        <Separator as="hr" color="black15" />
      </FullBleed>
    </>
  )
}
