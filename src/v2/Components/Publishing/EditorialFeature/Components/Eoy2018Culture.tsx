import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { unica } from "v2/Assets/Fonts"
import { media, pMedia } from "v2/Components/Helpers"
import { Author, StyledAuthor } from "v2/Components/Publishing/Byline/Author"
import { Date, DateContainer } from "v2/Components/Publishing/Byline/Date"
import { Share } from "v2/Components/Publishing/Byline/Share"
import { getArticleFullHref } from "v2/Components/Publishing/Constants"
import { EditorialFeaturesProps } from "v2/Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav, NavContainer } from "v2/Components/Publishing/Nav/Nav"
import { ArticleCards } from "v2/Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import { CaptionContainer } from "v2/Components/Publishing/Sections/Caption"
import {
  ImageCollection,
  ImageCollectionItem,
} from "v2/Components/Publishing/Sections/ImageCollection"
import {
  ImageSetContainer,
  ImageSetPreview,
} from "v2/Components/Publishing/Sections/ImageSetPreview"
import {
  SlideshowCta,
  SlideshowTitle,
} from "v2/Components/Publishing/Sections/ImageSetPreview/ImageSetLabel"
import { SocialEmbed } from "v2/Components/Publishing/Sections/SocialEmbed"
import { StyledText } from "v2/Components/Publishing/Sections/StyledText"
import { Text } from "v2/Components/Publishing/Sections/Text"
import { ToolTipContainer } from "v2/Components/Publishing/ToolTip/ToolTip"
import { SectionData } from "v2/Components/Publishing/Typings"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"

interface State {
  stickyHeader: SectionData | null
}

export class Eoy2018Culture extends React.Component<
  EditorialFeaturesProps,
  State
  > {
  state = {
    stickyHeader: null,
  }

  sectionText = (section, i, isDark) => {
    const {
      showTooltips,
      article: { layout },
    } = this.props
    return (
      <TextContainer key={i} px={[10, 10, 55]} py={30} mx="auto">
        <Box width={["100%", "100%", "70%"]} mx="auto" maxWidth={1000}>
          <Serif size="5">
            <Text
              html={section.body}
              layout={layout}
              showTooltips={showTooltips}
              color={isDark ? "white" : color("black100")}
            />
          </Serif>
        </Box>
      </TextContainer>
    )
  }

  sectionHeaderText = (section, i) => {
    return (
      <SectionHeader key={i} pt={10} pb={[10, 10, 20]} px={[10, 10, 55]}>
        <div dangerouslySetInnerHTML={{ __html: section.body }} />
      </SectionHeader>
    )
  }

  sectionSocialEmbed = (section, i) => {
    return (
      <SectionWrapper key={i} px={[10, 10, 55]} py={40}>
        <SocialEmbed section={section} />
      </SectionWrapper>
    )
  }

  sectionImageCollection = (section, i) => {
    return (
      <ImageWrapper key={i}>
        <ImageCollection
          sectionLayout={section.layout}
          articleLayout="feature"
          images={section.images}
          targetHeight={500}
          gutter={10}
        />
      </ImageWrapper>
    )
  }

  sectionImageSet = (section, i) => {
    return (
      <ImageSetWrapper key={i} px={[0, 0, 55]}>
        <ImageSetPreview section={section} />
      </ImageSetWrapper>
    )
  }

  sectionIsHeader = section => {
    const isText = section.type === "text"
    const isHeader = isText && section.body.includes("<h1>")
    return isHeader
  }

  makeSectionArrays = sections => {
    const chapters = []
    let currentChapter = null

    sections.map((section, i) => {
      if (this.sectionIsHeader(section)) {
        if (currentChapter === null) {
          currentChapter = 0
        } else {
          currentChapter += 1
        }
      }

      if (i !== 0) {
        if (chapters.length && chapters[currentChapter]) {
          chapters[currentChapter].push(section)
        } else {
          chapters[currentChapter] = [section]
        }
      }
    })
    return chapters
  }

  getSections = (sections, isDark) => {
    return sections.map((section, i) => {
      if (this.sectionIsHeader(section)) {
        return this.sectionHeaderText(section, i)
      } else {
        switch (section.type) {
          case "text": {
            return this.sectionText(section, i, isDark)
          }
          case "image_collection": {
            return this.sectionImageCollection(section, i)
          }
          case "image_set": {
            return this.sectionImageSet(section, i)
          }
          case "social_embed": {
            return this.sectionSocialEmbed(section, i)
          }
          default: {
            return null
          }
        }
      }
    })
  }

  render() {
    const { article } = this.props
    const chapters = this.makeSectionArrays(article.sections)
    const introText =
      article.sections && article.sections[0] && article.sections[0].body

    return (
      <ArticleWrapper>
        <Nav canFix color="black" backgroundColor="white">
          {this.state.stickyHeader && (
            <StickyHeader>
              {this.sectionHeaderText(this.state.stickyHeader, 0)}
            </StickyHeader>
          )}
        </Nav>
        <SectionWrapper>
          <ArticleTitle
            size="16"
            weight="medium"
            px={[10, 10, 55]}
            pb={10}
            pt={20}
          >
            <div>Year In Visual Culture</div>
            <div>2018</div>
          </ArticleTitle>
          <HeaderImg src={article.hero_section.url} />
        </SectionWrapper>

        <TextContainer px={[10, 10, 55]} py={30} mx="auto">
          <Box maxWidth={1400} mx="auto">
            <Flex
              pb={20}
              alignItems="center"
              flexDirection={["row-reverse", "row"]}
            >
              <Box width={["100%", "100%", "15%"]}>
                <Share
                  url={getArticleFullHref(article.slug)}
                  title={article.social_title || article.thumbnail_title}
                />
              </Box>
              <Flex width={["100%", "100%", "70%"]} maxWidth={1000}>
                <Author authors={article.authors} />
                <Date date={article.published_at} />
              </Flex>
            </Flex>

            <Box width={["100%", "100%", "70%"]} maxWidth={1000} mx="auto">
              {introText && (
                <div dangerouslySetInnerHTML={{ __html: introText }} />
              )}
            </Box>
          </Box>
          <Waypoint
            onEnter={({ previousPosition }) => {
              if (previousPosition === "above") {
                this.setState({ stickyHeader: null })
              }
            }}
          />
        </TextContainer>

        {chapters.map((chapter, i) => {
          const isDark = i % 2 === 0
          return (
            <ChapterWrapper isDark={isDark} key={i}>
              <Waypoint
                onLeave={({ currentPosition, previousPosition }) => {
                  if (
                    previousPosition === "inside" &&
                    currentPosition === "above"
                  ) {
                    this.setState({ stickyHeader: chapter[0] })
                  }
                }}
              />
              {this.getSections(chapter, isDark)}
              <Waypoint
                onEnter={({ previousPosition }) => {
                  if (previousPosition === "above") {
                    this.setState({ stickyHeader: chapter[0] })
                  }
                }}
              />
            </ChapterWrapper>
          )
        })}

        {article.relatedArticles && (
          <Box px={[10, 10, 55]} my={40} mx="auto">
            <ArticleCards relatedArticles={article.relatedArticles} />
          </Box>
        )}
      </ArticleWrapper>
    )
  }
}

const BORDER_WIDTH = 6

const ArticleWrapper = styled.div`
  ${NavContainer} {
    border-bottom-width: ${BORDER_WIDTH}px;
    border-top: ${BORDER_WIDTH}px solid black;
  }
  ${DateContainer} {
    margin-top: 0;
  }
  ${StyledAuthor} {
    margin-top: 0;

    ${media.xs`
      width: max-content;
    `};
  }
`

const ChapterWrapper = styled.div<{ isDark?: boolean }>`
  ${props =>
    props.isDark &&
    `
      color: white;
      background-color: ${color("black100")};
  `};

  ${ToolTipContainer} {
    color: ${color("black100")};
  }
`

const SectionWrapper = styled(Box)`
  border-bottom: ${BORDER_WIDTH}px solid;
  position: relative;
`

const TextContainer = styled(SectionWrapper)`
  blockquote {
    ${unica("s34")};
    padding: 20px 0;
    line-height: 1.25em;
    margin: 0;
    font-weight: inherit;
  }

  ${StyledText} {
    p,
    .paragraph {
      font-size: 24px;
      text-indent: 2em;
      padding: 0;

      &:first-child {
        text-indent: 0;
      }
    }
  }

  ${media.sm`
    blockquote {
      font-size: 24px;
    }
  `};
`

const ArticleTitle = styled(Sans)`
  text-transform: uppercase;
  border-bottom: ${BORDER_WIDTH}px solid;
  font-size: 7.5vw;
  line-height: 1em;
`

const SectionHeader = styled(Box) <{ isDark?: boolean }>`
  border-bottom: ${BORDER_WIDTH}px solid;

  > div {
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }

  h1 {
    ${unica("s65", "medium")};
    text-transform: uppercase;
    flex: 2;
    margin: 0;
    font-weight: inherit;
  }
  h2 {
    font-size: 50px;
    width: fit-content;
    line-height: 1em;
    text-align: right;
    margin: 0;
    font-weight: inherit;
  }

  ${media.md`
    h1 {
      font-size: 45px;;
    }
    h2 {
      font-size: 30px;
    }
  `};

  ${media.xs`
    h1 {
      font-size: 30px;;
    }
    h2 {
      font-size: 20px;
    }
`};
`

const HeaderImg = styled.img`
  height: calc(100vh - 50px);
  min-height: 400px;
  object-fit: cover;
  object-position: center;
  width: 100%;
`

const ImageWrapper = styled(SectionWrapper)`
  img {
    max-height: calc(100vh - 50px);
    min-height: 400px;
    object-fit: cover;
    object-position: center;

    ${media.md`
      min-height: unset;
    `};
  }

  ${ImageCollectionItem} {
    ${pMedia.xs`
      margin-bottom: 0;
      min-height: unset;
    `};
  }

  ${CaptionContainer} {
    position: absolute;
    bottom: 0;
    left: 5px;

    p {
      font-size: 10px;
      color: white;
      opacity: 0.6;
      text-shadow: 0 0 5px black;
    }
  }
`
const ImageSetWrapper = styled(SectionWrapper)`
  ${ImageSetContainer} {
    width: 70%;
    max-width: 1000px;
    margin: 0 auto;
    color: black;

    img {
      width: 100%;
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
    ${media.md`
      width: 100%;
    `};
  }
`

const StickyHeader = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background: white;
  border-top: ${BORDER_WIDTH}px solid;

  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 35px;
  }

  ${SectionHeader} {
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 14px;
  }

  ${media.sm`
    h1 {
      font-size: 30px;;
    }
    h2 {
      font-size: 20px;
    }
  `};
`
