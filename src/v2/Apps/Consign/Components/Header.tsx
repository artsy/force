import React from "react"
import styled from "styled-components"

import {
  Box,
  Button,
  Flex,
  ResponsiveImage,
  Sans,
  Spacer,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { SectionContainer } from "./SectionContainer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export const Header: React.FC = () => {
  return (
    <SectionContainer background="black5" height={[415, 546]} constrain={false}>
      <HeaderImageContainer>
        <Flex width="100%" justifyContent="space-between" m="auto">
          <Media greaterThan="md">
            <LeftImage>
              <ResponsiveImage
                src="https://files.artsy.net/consign/header-1.jpg"
                style={{
                  backgroundPosition: "left",
                  transformOrigin: "left",
                }}
              />
            </LeftImage>
          </Media>
          <CenterImage>
            <ResponsiveImage src="https://files.artsy.net/consign/header-2.jpg" />
          </CenterImage>
          <Media greaterThan="md">
            <RightImage>
              <ResponsiveImage src="https://files.artsy.net/consign/header-3.jpg" />
            </RightImage>
          </Media>
        </Flex>
      </HeaderImageContainer>

      <Box textAlign="center" width={350} position="relative" zIndex={3}>
        <Sans size="14">Sell with Artsy</Sans>
        <Spacer mt={5} />

        <RouterLink to="/consign/submission">
          <Button size="large">Get a free valuation</Button>
        </RouterLink>
      </Box>
    </SectionContainer>
  )
}

const HeaderImageContainer = styled(Flex).attrs({
  flexDirection: "column",
  justifyContent: "center",
})`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
`

const LeftImage = styled(Box)`
  left: 9%;
  position: absolute;
  transform-origin: center;
  transform: translateY(-50%);
  width: 31%;
`

const CenterImage = styled(Box)`
  position: absolute;
  left: 50%;
  transform-origin: center;
  transform: translateX(-50%) translateY(-50%);
  width: 670px;
  height: auto;
  z-index: 2;
`

const RightImage = styled(Box)`
  position: absolute;
  right: 3%;
  transform-origin: center;
  transform: translateY(-50%);
  width: 31%;
`
