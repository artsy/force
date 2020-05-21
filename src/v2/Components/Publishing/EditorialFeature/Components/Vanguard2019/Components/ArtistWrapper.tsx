import { Box, color, Flex, FlexProps, Sans, Serif } from "@artsy/palette"
import { Share, ShareContainer } from "v2/Components/Publishing/Byline/Share"
import { Emerging } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/Emerging"
import { GettingTheirDue } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/GettingTheirDue"
import { NewlyEstablished } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/NewlyEstablished"
import ArticleWithFullScreen from "v2/Components/Publishing/Layouts/ArticleWithFullScreen"
import { StyledArtworkCaption } from "v2/Components/Publishing/Sections/ArtworkCaption"
import { CaptionContainer } from "v2/Components/Publishing/Sections/Caption"
import { FullScreenProvider } from "v2/Components/Publishing/Sections/FullscreenViewer/FullScreenProvider"
import { SectionContainer } from "v2/Components/Publishing/Sections/SectionContainer"
import {
  Sections,
  StyledSections,
} from "v2/Components/Publishing/Sections/Sections"
import { StyledText } from "v2/Components/Publishing/Sections/StyledText"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { random } from "lodash"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { Media } from "v2/Utils/Responsive"

// "Emerging" has 20 SVG possibilities while Newly Established
// and "Getting Their Due" have 15
export function totalSVGsForSection(section: string) {
  return section === "emerging" ? 20 : 15
}

export interface SVGBackgroundProps extends FlexProps {
  url?: string
}
export interface TextProps extends FlexProps {
  isMobile?: boolean
  isExpanded?: boolean
}
export class VanguardArtistWrapper extends React.Component<
  {
    article: ArticleData
    isExpanded?: boolean
    section?: string
    isMobile: boolean
    onSlideshowStateChange?: (state: boolean) => void
    isTest?: boolean
  },
  {
    isExpanded: boolean
  }
  > {
  state = {
    isExpanded: this.props.isExpanded || false,
  }
  artistWrapper = null

  componentDidMount() {
    const {
      article: { title },
    } = this.props
    const slug = slugify(title)

    if (window.location.pathname.includes(slug)) {
      this.onExpand()
    }
  }

  onExpand() {
    const { isExpanded } = this.state

    if (isExpanded) {
      window.scrollTo({
        behavior: "smooth",
        top: this.artistWrapper.getBoundingClientRect().top + window.scrollY,
      })
    }

    this.setState({ isExpanded: !isExpanded })
  }

  getRandomSVG(section) {
    return random(totalSVGsForSection(section))
  }

  getSVGBackground(index, section, isTest) {
    const i = isTest ? 1 : index

    switch (section) {
      case "emerging":
        return Emerging(i)
      case "newly-established":
        return NewlyEstablished(i)
      case "getting-their-due":
        return GettingTheirDue(i)
    }
  }

  render() {
    const {
      article,
      section,
      isMobile,
      onSlideshowStateChange,
      isTest,
    } = this.props

    const { hero_section, title } = article
    const { isExpanded } = this.state

    const background = this.getSVGBackground(
      this.getRandomSVG(section),
      section,
      isTest
    )
    const backgroundColor = isExpanded ? color("black100") : color("white100")
    const slugifiedTitle = slugify(article.title)
    const shareTitle = article.social_title || article.thumbnail_title

    return (
      <FullScreenProvider onSlideshowStateChange={onSlideshowStateChange}>
        <ArtistWrapper
          background={backgroundColor}
          pt={50}
          isExpanded={isExpanded}
          id={slugifiedTitle}
          ref={artistWrapper => (this.artistWrapper = artistWrapper)}
        >
          <BackgroundContainer backgroundColor={backgroundColor}>
            {background}
          </BackgroundContainer>
          <ArticleWithFullScreen article={article}>
            <ArtistContainer
              pb={4}
              maxWidth={["100vw", 1000]}
              px={["10vw", "10vw", "10vw", "10vw", 4]}
              mx="auto"
              isMobile={isMobile}
              isExpanded={isExpanded}
            >
              <Box textAlign="center" pb={30}>
                <Media greaterThanOrEqual="xl">
                  <ArtistTitle size="12" element="h3">
                    {title}
                  </ArtistTitle>
                </Media>

                <Media lessThan="xl">
                  <InvertedSerif
                    size={["8", "10", "12", "12"]}
                    element="h3"
                    isMobile={isMobile}
                    isExpanded={isExpanded}
                    lineHeight="1.1em"
                    mb={5}
                  >
                    {title}
                  </InvertedSerif>
                </Media>

                <Box position="relative">
                  {hero_section && (
                    <InvertedSans
                      size={["3", "3", "4", "4", "4"]}
                      weight="medium"
                      isMobile={isMobile}
                      isExpanded={isExpanded}
                      lineHeight="1.1em"
                    >
                      {hero_section.deck}
                    </InvertedSans>
                  )}
                  <Flex justifyContent={["center", "flex-start"]}>
                    <Box position={["relative", "absolute"]} top={0}>
                      <Share
                        url={`${sd.APP_URL}/artsy-vanguard-2019/${slugifiedTitle}`}
                        title={`Artsy Vanguard 2019: ${shareTitle}`}
                        color={color("white100")}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Box>

              <Sections
                hideAds
                article={article}
                customWidth={920}
                isTruncatedAt={!isExpanded && 2}
              />

              <ReadMoreButton
                size="5"
                weight="medium"
                textAlign="center"
                onClick={this.onExpand.bind(this)}
                isMobile={isMobile}
                isExpanded={isExpanded}
              >
                <ReadMoreText>
                  {isExpanded ? "Close" : "Read More"}
                </ReadMoreText>
              </ReadMoreButton>
            </ArtistContainer>
          </ArticleWithFullScreen>
        </ArtistWrapper>
      </FullScreenProvider>
    )
  }
}

export const InvertedSerif = styled(Serif) <TextProps>`
  mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
  color: ${color("white100")};
  will-change: color;
`

export const InvertedSans = styled(Sans) <TextProps>`
  mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
  color: ${color("white100")};
  will-change: color;
`

const ArtistTitle = styled(InvertedSerif)`
  font-size: 95px;
  line-height: 1em;
`

const ReadMoreText = styled(Box)`
  display: inline-flex;
  border-bottom: solid;
  line-height: normal;
`
export const ReadMoreButton = styled(InvertedSans) <{ onClick: () => void }>`
  text-transform: uppercase;
  cursor: pointer;
  color: ${p =>
    p.isMobile && p.isExpanded
      ? color("white100")
      : p.isMobile && !p.isExpanded
        ? color("black100")
        : color("white100")};
`

const ArtistContainer = styled(Box) <TextProps>`
  position: relative;

  /* override feature text drop-caps */
  p:first-child::first-letter,
  .paragraph:first-child::first-letter {
    font-family: inherit;
    font-size: inherit;
    float: none;
    line-height: inherit;
    margin-right: 0;
    margin-top: 0;
    text-transform: none;
  }

  ${StyledSections} {
    margin-top: 0;
  }

  ${SectionContainer} {
    padding: ${p => p.isMobile && 0};
  }

  ${ShareContainer},
  ${StyledText} {
    mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
    will-change: color;
    color: ${p =>
    p.isMobile && p.isExpanded
      ? color("white100")
      : p.isMobile && !p.isExpanded
        ? color("black100")
        : color("white100")};
  }

  ${CaptionContainer} {
    p {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
    p.isMobile && !p.isExpanded ? color("black100") : color("white100")};
    }

    a {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
    p.isMobile && !p.isExpanded ? color("black100") : color("white100")};
      background-image: linear-gradient(
        to bottom,
        transparent 0,
        #fff 1px,
        transparent 0
      );
      background-size: 1.25px 4px;
      background-repeat: repeat-x;
      background-position: bottom;
    }
  }

  ${StyledArtworkCaption} {
    mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
    color: ${p => (p.isMobile ? color("black100") : color("white100"))};
    will-change: color;
    max-width: 100vw;
    overflow: hidden;

    a {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
    p.isMobile && !p.isExpanded ? color("black100") : color("white100")};
    }
  }

  ${StyledText} {
    a {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
    p.isMobile && p.isExpanded
      ? color("white100")
      : p.isMobile && !p.isExpanded
        ? color("black100")
        : color("white100")};
      background-image: linear-gradient(
        to bottom,
        transparent 0,
        #fff 1px,
        transparent 0
      );
      background-size: 1.25px 4px;
      background-repeat: repeat-x;
      background-position: bottom;
    }
  }
`

const BackgroundContainer = styled(Box) <{ backgroundColor: string }>`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ backgroundColor }) => backgroundColor};
`

export const ArtistWrapper = styled(Flex) <{ isExpanded: boolean }>`
  flex-direction: column;
  position: relative;
  padding-bottom: 100px;
  min-height: 100vh;
  z-index: 0;

  /* Border instead of margin to prevent interruption of frame text inversion */
  ${({ isExpanded }) =>
    isExpanded &&
    `
    border-bottom: 100px solid ${color("white100")};
  `}
`
