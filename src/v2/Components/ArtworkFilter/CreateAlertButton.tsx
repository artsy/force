import React from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { BellIcon, Button, Flex, Spacer, Text } from "@artsy/palette"

const StyledCreateAlertButton = styled(Button).attrs({
  variant: "secondaryOutline",
  size: "small",
})`
  padding: 0 10px;
  border-color: ${themeGet("colors.blue100")};
  div {
    color: ${themeGet("colors.blue100")};
  }
  svg {
    fill: ${themeGet("colors.blue100")};
  }
  &:hover {
    div {
      color: ${themeGet("colors.white100")};
    }
    svg {
      fill: ${themeGet("colors.white100")};
    }
  }
`

export const CreateAlertButton = () => {
  return (
    <StyledCreateAlertButton>
      <Flex justifyContent="space-between" alignItems="center">
        <BellIcon width="16px" height="16px" />
        <Spacer mr={0.5} />
        <Text>Create an Alert</Text>
      </Flex>
    </StyledCreateAlertButton>
  )
}
