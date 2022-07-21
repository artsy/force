import * as React from "react";
import { Flex, Text } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

const Separator = styled(Flex)`
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${themeGet("colors.black10")};
  }

  &:not(:empty)::before {
    margin-right: 45px;
  }

  &:not(:empty)::after {
    margin-left: 45px;
  }
`

export const NewMessageMarker: React.FC = () => (
  <Separator alignItems="center" my={1}>
    <Text color="black60">New</Text>
  </Separator>
)
