import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { Share } from "v2/Components/Publishing/Byline/Share"
import { VanguardVideoHeader } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Components/VideoHeader"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { VanguardArtistWrapper } from "./ArtistWrapper"

export const VanguardSeriesWrapper: React.SFC<{
  article: ArticleData
  index: number
  isMobile: boolean
  onSlideshowStateChange?: (state: boolean) => void
  isTest?: boolean
}> = props => {
  const { article, isMobile, onSlideshowStateChange, isTest } = props
  const { relatedArticles, title, series } = article
  const slugifiedTitle = slugify(title)
  const shareTitle = article.social_title || article.thumbnail_title
  const { hero_section } = props.article
  const url = ((hero_section && hero_section.url) || "") as string
  const isVideo = url.includes("mp4")

  return (
    <Box id={slugifiedTitle} position="relative">
      <Box
        pt={50}
        background={color("white100")}
        zIndex={-10}
        position="relative"
      // prevents overlapping nav on jump-link
      />
      <Box>
        <SubSeriesHeaderText
          mx="auto"
          maxWidth={["90vw", "80vw", "80vw", 1400]}
          px={4}
        >
          <Title size={["8", "10", "12", "16"]} textAlign="center" element="h2">
            {title}
          </Title>
        </SubSeriesHeaderText>
        {isVideo && <VanguardVideoHeader svg={slugifiedTitle} url={url} />}
      </Box>

      <Box background={color("white100")}>
        <Box
          mx="auto"
          maxWidth={["90vw", "80vw", "80vw", "65%"]}
          px={4}
          pb={150}
          pt={60}
        >
          <Flex flexDirection="column" alignItems="center">
            {series && (
              <SubTitle size={["8", "10", "12", "12"]} element="h3" pb={2}>
                {series.sub_title}
              </SubTitle>
            )}
            <Share
              url={`${sd.APP_URL}/artsy-vanguard-2019/${slugifiedTitle}`}
              title={`Artsy Vanguard 2019: ${shareTitle}`}
            />
          </Flex>
        </Box>
      </Box>
      {/** map sub-series artist articles */}
      {relatedArticles &&
        relatedArticles.map((artistArticle, i) => (
          <VanguardArtistWrapper
            key={i}
            article={artistArticle}
            section={slugifiedTitle}
            isMobile={isMobile}
            onSlideshowStateChange={onSlideshowStateChange}
            isTest={isTest}
          />
        ))}
    </Box>
  )
}

const SubSeriesHeaderText = styled(Box)`
  position: absolute;
  left: 0;
  top: 50px;
  right: 0;
  mix-blend-mode: difference;
  color: ${color("white100")};
  will-change: color;
  z-index: -1;
`

const Title = styled(Sans)`
  text-transform: uppercase;
  text-align: center;
`

const SubTitle = styled(Serif)`
  text-transform: uppercase;
  text-align: center;
`
