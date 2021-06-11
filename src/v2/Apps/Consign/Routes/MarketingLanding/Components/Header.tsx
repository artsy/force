import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { SectionContainer } from "./SectionContainer"
import { RouterLink } from "v2/System/Router/RouterLink"

import {
  Box,
  Button,
  Flex,
  ResponsiveImage,
  Sans,
  Spacer,
  Image,
} from "@artsy/palette"

export const Header: React.FC = () => {
  return (
    <SectionContainer background="black5" height={[415, 546]} constrain={false}>
      <HeaderImageContainer>
        <Flex
          width="100%"
          justifyContent="space-between"
          m="auto"
          maxWidth={1280}
        >
          <Media greaterThan="xs">
            <Image
              src="https://files.artsy.net/consign/header-1.jpg"
              width={380}
              height={550}
            />
          </Media>
          <CenterImage>
            <ResponsiveImage src="https://files.artsy.net/consign/header-2.jpg" />
          </CenterImage>
          <Media greaterThan="xs">
            <Image
              src="https://files.artsy.net/consign/header-3.jpg"
              width={380}
              height={550}
            />
          </Media>
        </Flex>
      </HeaderImageContainer>

      <Box textAlign="center" width={350} position="relative" zIndex={3}>
        <Sans size="14" element="h1">
          Sell with Artsy
        </Sans>
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
  max-width: 1670px;
`

const CenterImage = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center;
  transform: translateX(-50%) translateY(-50%);
  width: 670px;
  height: auto;
  z-index: 2;
`

CenterImage.displayName = "CenterImage"
