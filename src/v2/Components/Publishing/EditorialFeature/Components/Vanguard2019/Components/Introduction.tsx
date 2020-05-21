import { Box, color, Flex, media, Sans, Serif } from "@artsy/palette"
import { Byline, BylineContainer } from "v2/Components/Publishing/Byline/Byline"
import { VanguardCredits } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Components/VanguardCredits"
import { Text } from "v2/Components/Publishing/Sections/Text"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { VanguardVideoHeader } from "./VideoHeader"

export const VanguardIntroduction: React.SFC<{
  article: ArticleData
  isMobile: boolean
}> = props => {
  const { isMobile } = props
  const { description } = props.article.series
  const { hero_section } = props.article
  const url = ((hero_section && hero_section.url) || "") as string
  const isVideo = url.includes("mp4")

  return (
    <IntroContainer>
      <Box minHeight="calc(100vw * 0.53)" pt={[100, 100, 50, 50]}>
        {isVideo && <VanguardVideoHeader url={url} />}

        <Media greaterThan="xs">
          <HeaderText
            pt={70}
            size={["12", "12", "14", "16"]}
            textAlign="center"
          >
            The Artsy
          </HeaderText>
        </Media>
      </Box>

      <Box background={color("white100")} pt={[80, 100, 150]}>
        <Box mx="auto" maxWidth={980} px={4}>
          <Flex flexDirection="column" alignItems="center" pb={50}>
            <Media greaterThanOrEqual="xl">
              <LargeTitle size="12" element="h1" textAlign="center" pb={1}>
                The Artists To Know Right Now
              </LargeTitle>
            </Media>

            <Media lessThan="xl">
              <Title
                size={["8", "10", "12", "12"]}
                element="h1"
                textAlign="center"
                pb={1}
              >
                The Artists To Know Right Now
              </Title>
            </Media>

            <Byline {...props} />

            {!isMobile && <VanguardCredits isMobile={isMobile} />}
          </Flex>

          <Box pb={12}>
            <Text layout="standard" html={description} width="800px" />
          </Box>
        </Box>
      </Box>
    </IntroContainer>
  )
}

const HeaderText = styled(Sans)`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  color: ${color("white100")};
  mix-blend-mode: difference;
  will-change: color;
`

const IntroContainer = styled(Box)`
  ${BylineContainer} {
    div::before {
      display: none;
    }
  }

  ${media.xs`
    ${BylineContainer} {
      flex-direction: column;
      align-items: center;
    }
  `}
`

const Title = styled(Serif)`
  text-transform: uppercase;
  line-height: 1em;
`

const LargeTitle = styled(Title)`
  font-size: 90px;
`
