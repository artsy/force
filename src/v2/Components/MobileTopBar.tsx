import { BorderBox, Flex } from "@artsy/palette"
import { ReactNode, SFC } from "react";
import styled from "styled-components"

interface MobileTopBarProps {
  children: ReactNode
}

export const MobileTopBar: SFC<MobileTopBarProps> = ({ children }) => {
  return (
    <Container px={2} py={1}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        {children}
      </Flex>
    </Container>
  )
}

const Container = styled(BorderBox)`
  position: fixed;
  width: 100%;
  background: white;
  ${/* offset border*/ ""};
  margin-top: -2px;
  z-index: 1;
`
