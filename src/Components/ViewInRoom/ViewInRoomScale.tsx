import { Box, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import * as React from "react";
import styled from "styled-components"

export const EIGHT_FEET_PX = 567
export const EIGHT_FEET_CM = 243.84

export const ViewInRoomScale: React.FC = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: "translate(-50%, -50%)" }}
      textAlign="center"
    >
      <Box position="relative" top={70}>
        <Text variant="xs">8 ft</Text>
        <Scale />
      </Box>
    </Box>
  )
}

const Scale = styled.div`
  position: relative;
  width: ${EIGHT_FEET_PX}px;
  height: 10px;
  border-left: 1px solid;
  border-right: 1px solid;

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: ${themeGet("colors.black100")};
  }
`
