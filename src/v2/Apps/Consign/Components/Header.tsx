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

export const Header: React.FC = () => {
  return (
    <SectionContainer background="black5" height={[415, 546]} constrain={false}>
      <HeaderImageContainer>
        <Flex width="100%" justifyContent="space-between" m="auto">
          <Media greaterThan="md">
            <LeftImage>
              <ResponsiveImage
                src="https://d32dm0rphc51dk.cloudfront.net/-_sLkPLUzeqj55jCDVXokA/large.jpg"
                style={{
                  backgroundPosition: "left",
                  transformOrigin: "left",
                }}
              />
            </LeftImage>
          </Media>
          <CenterImage>
            <ResponsiveImage src="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=438&height=300&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FQWFS4DMaS6a7qYextLx0yw%2Flarge.jpg" />
          </CenterImage>
          <Media greaterThan="md">
            <RightImage>
              <ResponsiveImage src="https://d32dm0rphc51dk.cloudfront.net/_5zMF8NB0M49MMqCqVBcSg/large.jpg" />
            </RightImage>
          </Media>
        </Flex>
      </HeaderImageContainer>

      <Box textAlign="center" width={350} position="relative" zIndex={3}>
        <Sans size="14">Sell with Artsy</Sans>
        <Spacer mt={5} />
        <Button size="large">Get a free valuation</Button>
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
