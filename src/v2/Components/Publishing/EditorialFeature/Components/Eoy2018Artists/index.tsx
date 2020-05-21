import { Box, color, Flex, media, Sans, Serif, space } from "@artsy/palette"
import { compact, find, map } from "lodash"
import React from "react"
import styled from "styled-components"

import { unica } from "v2/Assets/Fonts"
import { Byline, BylineContainer } from "v2/Components/Publishing/Byline/Byline"
import { EditorialFeaturesProps } from "v2/Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav, NavContainer } from "v2/Components/Publishing/Nav/Nav"
import { ArticleCardContainer } from "v2/Components/Publishing/RelatedArticles/ArticleCards/ArticleCard"
import {
  ArticleCards,
  ArticlesWrapper,
} from "v2/Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import {
  FullLabel,
  ImageSetContainer,
  ImageSetPreview,
  ImgContainer,
} from "v2/Components/Publishing/Sections/ImageSetPreview"
import {
  LabelWrapper,
  SlideshowCta,
  SlideshowTitle,
} from "v2/Components/Publishing/Sections/ImageSetPreview/ImageSetLabel"
import { StyledText } from "v2/Components/Publishing/Sections/StyledText"
import { Text } from "v2/Components/Publishing/Sections/Text"
import { resize } from "v2/Utils/resizer"
import { Eoy2018ArticleHeader } from "./ArticleHeader"

export class Eoy2018Artists extends React.Component<EditorialFeaturesProps> {
  getHeaderSections = () => {
    const { sections } = this.props.article
    const headers = []

    sections.map((section, index) => {
      let headerSection
      const sectionAfter = sections[index + 1]
      const sectionAfterisImage =
        sectionAfter && sectionAfter.type === "image_collection"

      if (this.sectionIsHeader(section)) {
        headerSection = {
          index,
          section,
        }
        if (sectionAfterisImage) {
          headerSection.imageSection = sectionAfter
        }
        headers.push(headerSection)
      }
    })
    return headers
  }

  sectionIsHeader = section => {
    const isText = section.type === "text"
    const isHeader = isText && section.body.includes("<h1>")
    return isHeader
  }

  sectionArtistHeader = (section, i) => {
    const headerSections = this.getHeaderSections()
    const { imageSection } = find(headerSections, ["section", section])
    const src = imageSection && imageSection.images[0].url
    const caption = imageSection && imageSection.images[0].caption

    return (
      <ArtistHeaderSection
        key={i}
        mb={40}
        flexDirection={["column", "column", "row", "row"]}
      >
        <ArtistHeaderTitle dangerouslySetInnerHTML={{ __html: section.body }} />
        <ArtistHeaderImg
          src={src && resize(src, { width: 700 })}
          alignItems="flex-end"
        >
          {caption && (
            <Sans size="1" color="white" px={10} py={5}>
              <div dangerouslySetInnerHTML={{ __html: caption }} />
            </Sans>
          )}
        </ArtistHeaderImg>
      </ArtistHeaderSection>
    )
  }

  sectionText = (section, i) => {
    const {
      article: { sections, layout },
      showTooltips,
    } = this.props
    const isChapterStart =
      sections[i - 1] && sections[i - 1].type === "image_collection"

    return (
      <Box maxWidth={["100%", "75%", "75%"]} ml="auto" px={[20, 0]} key={i}>
        <TextSection size="5" pb={[40, 60]} isChapterStart={isChapterStart}>
          <Text
            html={section.body}
            layout={layout}
            showTooltips={showTooltips}
          />
        </TextSection>
      </Box>
    )
  }

  sectionImageSet = (section, i) => {
    return (
      <ImageSetWrapper
        key={i}
        mb={60}
        maxWidth={["100%", "100%", "100%", "75%"]}
      >
        <ImageSetPreview section={section}>
          <CaptionWrapper size={["3", "4"]}>
            <ImageSetCaption
              dangerouslySetInnerHTML={{ __html: section.images[0].caption }}
            />
          </CaptionWrapper>
        </ImageSetPreview>
      </ImageSetWrapper>
    )
  }

  getSections = () => {
    const {
      article: { sections },
    } = this.props
    const headerSections = this.getHeaderSections()
    const headerTextIndexes = map(headerSections, "index")
    const headerImages = map(headerSections, "image")

    const renderedSections = sections.map((section, i) => {
      const isHeader = headerTextIndexes.includes(i)
      const isHeaderImage = headerImages.includes(section)

      if (isHeader) {
        return this.sectionArtistHeader(section, i)
      } else if (isHeaderImage) {
        return null
      } else {
        if (section.type === "text" && i !== 0) {
          return this.sectionText(section, i)
        } else if (section.type === "image_set") {
          return this.sectionImageSet(section, i)
        } else {
          return null
        }
      }
    })
    return renderedSections
  }

  render() {
    const { article, isMobile, isTablet, isTest } = this.props
    const introText = this.sectionText(article.sections[0], 0)
    const headerImages = map(
      compact(map(this.getHeaderSections(), "imageSection")),
      "images"
    )

    return (
      <AricleWrapper>
        <Nav canFix color={color("black100")} backgroundColor="white">
          <NavBorder />
        </Nav>

        <Box px={[10, 10, 55]} maxWidth={1600} mx="auto">
          <Eoy2018ArticleHeader
            images={headerImages}
            isMobile={isMobile}
            isTablet={isTablet}
            isTest={isTest}
          />

          <ArticleContent py={40}>
            <IntroSection
              alignItems="flex-start"
              flexDirection={["column", "row"]}
              pl={[0, 20]}
            >
              <Byline article={article} />
              {introText}
            </IntroSection>
            {this.getSections()}
          </ArticleContent>
        </Box>

        {article.relatedArticles && (
          <Box px={[10, 10, 55]} mb={40} mx="auto">
            <RelatedArticleWrapper>
              <ArticleCards relatedArticles={article.relatedArticles} />
            </RelatedArticleWrapper>
          </Box>
        )}
      </AricleWrapper>
    )
  }
}

const BORDER_WIDTH = 6

const AricleWrapper = styled.div`
  ${NavContainer} {
    border-bottom: none;
  }
`

const NavBorder = styled.div`
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
  position: absolute;
  top: 100%;
  left: 55px;
  right: 55px;
  max-width: calc(1600px - 110px);
  margin: 0 auto;

  ${media.md`
    left: 10px;
    right: 10px;
  `};
`

const ArticleContent = styled(Box)`
  border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};

  blockquote {
    ${unica("s34")};
    line-height: 1.3em;
    margin: 0;
    font-weight: inherit;

    ${media.sm`
      ${unica("s25")};
      line-height: 1.3em;
    `};
  }
`

export const ArtistHeaderSection = styled(Flex)`
  height: 60vh;
  min-height: 450px;
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left-width: 0;

  ${media.md`
    height: fit-content;
  `};
`

const ArtistHeaderTitle = styled.div`
  flex: 1;
  border-right: ${BORDER_WIDTH}px solid ${color("purple100")};
  overflow: hidden;
  min-height: min-content;

  h1 {
    ${unica("s65")};
    width: 100%;
    height: 50%;
    min-height: fit-content;
    padding: ${space(2)}px;
    border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
    margin: 0;
    font-weight: inherit;

    ${media.md`
      width: 60%;
      float: right;
      height: 100%;
      border-bottom: none;
      border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
    `};

    ${media.xs`
      ${unica("s45")};
      border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
      border-left: none;
      width: 100%;
      height: 50%;
      float: none;
    `};
  }

  h2 {
    ${unica("s25")};
    width: 50%;
    height: 50%;
    min-height: fit-content;
    display: inline-flex;
    padding: ${space(2)}px;
    margin: 0;
    font-weight: inherit;

    &:last-child {
      border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
    }

    ${media.md`
      width: 40%;
      float: left;
      &:last-child {
        border-left: none;
        border-top: ${BORDER_WIDTH}px solid ${color("purple100")};
      }
    `};

    ${media.xs`
      ${unica("s19")};
      width: 50%;
      float: none;
      &:last-child {
        border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
        border-top: none;
      }
    `};
  }

  ${media.md`
    height: 65vh;
    border-right: none;
    border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
  `};
`

const ArtistHeaderImg = styled(Flex) <{ src?: string }>`
  flex: 1;
  background: ${color("purple100")};

  p {
    text-shadow: 0 0 5px black;
    opacity: 0.6;
  }

  ${props =>
    props.src &&
    `
    background: url(${props.src});
    background-size: cover;
    background-position: center;
  `};

  ${media.md`
    min-height: 70vw;
  `};
`

const IntroSection = styled(Flex)`
  ${BylineContainer} {
    flex-direction: column;
    align-items: flex-start;
    ${media.md`
      padding: 0 20px 20px;
    `};
  }
`

const TextSection = styled(Serif) <{ isChapterStart?: boolean }>`
  ${StyledText} {
    blockquote {
      padding: 0;
    }

    p,
    .paragraph {
      font-size: 24px;
      text-indent: 2em;
      padding: 0;

      ${props =>
    props.isChapterStart &&
    `
        &:first-child {
          text-indent: 0;
        }
    `};
    }
  }
`

const CaptionWrapper = styled(Sans)`
  flex: 1;

  ${media.sm`
    min-width: 50%;
  `};
`

const ImageSetCaption = styled.div`
  height: 100%;
  padding: ${space(2)}px;
  background: white;
  color: black;
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};

  ${media.sm`
    border-bottom: none;
    border-right: ${BORDER_WIDTH}px solid ${color("purple100")};
  `};
`

const ImageSetWrapper = styled(Box)`
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left: none;

  ${ImageSetContainer} {
    display: flex;
    flex-direction: row-reverse;

    ${media.sm`
      flex-direction: column-reverse;
    `};
  }

  ${FullLabel} {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    left: auto;
    bottom: auto;
    max-width: inherit;
    border-radius: 0;
    box-shadow: none;

    &:hover {
      background-color: ${color("purple100")};
    }
    ${media.sm`
      flex-direction: row-reverse;

      ${LabelWrapper} {
        max-width: 50%;
      }
    `};
  }

  ${SlideshowTitle} {
    display: none;
  }

  ${SlideshowCta} {
    flex-direction: column;

    > div {
      padding: 0;
    }
  }

  ${ImgContainer} {
    flex: 3;
    border-right: ${BORDER_WIDTH}px solid ${color("purple100")};

    img {
      object-fit: cover;
      object-position: center;
      height: 100%;
    }

    ${media.sm`
      border-right: none;
      border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
    `};
  }
`

const RelatedArticleWrapper = styled.div`
  border-right: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};

  ${ArticlesWrapper} {
    margin-bottom: 0;
    margin-top: 0;
  }

  ${ArticleCardContainer} {
    border: none;
  }
`
