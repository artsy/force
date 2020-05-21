import { Box } from "@artsy/palette"
import { targetingData } from "v2/Components/Publishing/Display/DisplayTargeting"
import { getSlideshowImagesFromArticle } from "v2/Components/Publishing/Layouts/ArticleWithFullScreen"
import { AdDimension, AdUnit } from "v2/Components/Publishing/Typings"
import { clone, compact, findLastIndex, get, once } from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { DisplayAd } from "../Display/DisplayAd"
import { ArticleData } from "../Typings"
import { Authors } from "./Authors"
import { Embed } from "./Embed"
import { ImageCollection } from "./ImageCollection"
import { ImageSetPreview } from "./ImageSetPreview"
import { SectionContainer } from "./SectionContainer"
import { SocialEmbed } from "./SocialEmbed"
import { Text } from "./Text"
import { Video } from "./Video"

interface Props {
  DisplayPanel?: any
  article: ArticleData
  color?: string
  isMobile?: boolean
  showTooltips?: boolean
  isSponsored?: boolean
  isSuper?: boolean
  customWidth?: number
  isTruncatedAt?: number
  hideAds?: boolean
}

interface State {
  shouldInjectMobileDisplay: boolean
}

/**
 * When isMobile, hide sidebar and inject DisplayAd into the body of the
 * article at a specific paragraph index.
 */
const MOBILE_DISPLAY_INJECT_INDEX = 1
const MOBILE_DISPLAY_INJECT_ID_PREFIX = "__mobile_display_inject__"

export class Sections extends Component<Props, State> {
  static defaultProps = {
    isMobile: false,
  }

  displayInjectId: string

  state = {
    shouldInjectMobileDisplay: false,
  }

  UNSAFE_componentWillMount() {
    const {
      article: { layout },
      isMobile,
    } = this.props

    this.injectDisplayPanelMarker = once(this.injectDisplayPanelMarker)
    const shouldInjectMobileDisplay = isMobile && layout !== "feature"

    this.setState({
      shouldInjectMobileDisplay,
    })
  }

  componentDidMount() {
    if (this.state.shouldInjectMobileDisplay) {
      this.mountDisplayToMarker()
    }
  }

  componentDidUpdate(prevProps) {
    const { isMobile } = this.props

    if (prevProps.isMobile !== isMobile) {
      this.setState(
        {
          shouldInjectMobileDisplay: isMobile,
        },
        () => {
          if (isMobile && this.state.shouldInjectMobileDisplay) {
            this.mountDisplayToMarker()
          }
        }
      )
    }
  }

  /**
   * Inject DisplayAd after a specific paragraph index
   */
  injectDisplayPanelMarker(body) {
    const articleId = this.props.article.id
    const tag = "</p>"
    const updatedBody = compact(body.split(tag))
      .map(p => p + tag)
      .reduce((arr, block, paragraphIndex) => {
        if (paragraphIndex === MOBILE_DISPLAY_INJECT_INDEX) {
          this.displayInjectId = `${MOBILE_DISPLAY_INJECT_ID_PREFIX}${articleId}`
          return arr.concat([block, `<div id="${this.displayInjectId}"></div>`])
        } else {
          return arr.concat([block])
        }
      }, [])
      .join("")

    return updatedBody
  }

  mountDisplayToMarker() {
    const { DisplayPanel } = this.props
    const displayMountPoint = document.getElementById(this.displayInjectId)

    if (displayMountPoint) {
      ReactDOM.render(<DisplayPanel />, displayMountPoint)
    } else {
      console.error(
        "(reaction/Sections.tsx) Error mounting Display: DOM node ",
        "not found",
        displayMountPoint
      )
    }
  }

  getContentStartIndex = () => {
    const {
      article: { layout, sections },
    } = this.props

    if (layout === "feature") {
      const firstText = sections.findIndex(section => {
        return section.type === "text"
      })
      return firstText
    }
  }

  getContentEndIndex = () => {
    const {
      article: { layout, sections },
    } = this.props

    if (["feature", "standard"].includes(layout)) {
      const lastText = findLastIndex(sections, section => {
        return section.type === "text"
      })
      return lastText
    }
  }

  getSection(section, index) {
    const { article, color, customWidth, isMobile, showTooltips } = this.props
    const targetHeight =
      customWidth && customWidth > 750 && !isMobile ? 750 : 500
    const size = customWidth && { width: customWidth }
    const fullscreenImages = getSlideshowImagesFromArticle(article)

    const sections = {
      image_collection: (
        <ImageCollection
          color={color}
          sectionLayout={section.layout}
          articleLayout={article.layout}
          images={section.images}
          targetHeight={targetHeight}
          gutter={10}
          size={size}
          fullscreenImages={fullscreenImages}
        />
      ),
      image_set: (
        <ImageSetPreview
          section={section}
          color={color}
          fullscreenImages={fullscreenImages}
        />
      ),
      video: <Video section={section} color={color} />,
      embed: <Embed section={section} />,
      social_embed: <SocialEmbed section={section} />,
      text: (
        <Text
          color={color}
          html={section.body}
          layout={article.layout}
          isContentStart={index === this.getContentStartIndex()}
          isContentEnd={index === this.getContentEndIndex()}
          showTooltips={showTooltips}
        />
      ),
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    return sectionComponent
  }

  getAdUnit(
    index: number,
    indexAtFirstAd: number,
    isStandard: boolean
  ): AdUnit {
    const { isMobile } = this.props

    if (isStandard) {
      return AdUnit.Desktop_RightRail1
    }

    if (index === indexAtFirstAd) {
      return isMobile
        ? AdUnit.Mobile_Feature_InContentLeaderboard1
        : AdUnit.Desktop_Feature_Leaderboard1
    }

    if (index === 6) {
      return isMobile
        ? AdUnit.Mobile_Feature_InContentLeaderboard2
        : AdUnit.Desktop_Feature_Leaderboard2
    }

    return isMobile
      ? AdUnit.Mobile_Feature_InContentLeaderboard3
      : AdUnit.Desktop_Feature_LeaderboardRepeat
  }

  /**
   * Add a margin top when to the ad when the section is any of the following:
   * 1) Text section without <br> tags wrapping the <p> or <h2> content
   * 3) Image set section
   * 4) Image collection with a caption/title
   */
  getAdMarginTop(section) {
    const shouldAddTopMargin = () => {
      switch (section.type) {
        case "image_set":
          return true
        case "image_collection":
          get(section, ["images", "[0]", "caption"])
          return true
        case "text":
          section.body.includes("<br>")
          return true
        default:
          return false
      }
    }

    return shouldAddTopMargin() ? "calc(100% - 96%)" : null
  }

  getAdDimension(isStandard: boolean): AdDimension {
    const { isMobile, isSponsored } = this.props

    if (isStandard) {
      return AdDimension.Desktop_RightRail1
    }

    if (isMobile) {
      if (isSponsored) {
        return AdDimension.Mobile_Sponsored_Feature_InContentLeaderboard1
      }
      return AdDimension.Mobile_Feature_InContentLeaderboard1
    }

    return AdDimension.Desktop_NewsLanding_Leaderboard1
  }

  renderSections() {
    const {
      article,
      customWidth,
      isSponsored,
      isSuper,
      isTruncatedAt,
      hideAds,
    } = this.props

    const { layout: articleType } = article
    const { shouldInjectMobileDisplay } = this.state
    let quantityOfAdsRendered = 0
    let firstAdInjected = false
    let placementCount = 1
    let displayMarkerInjected = false
    let indexAtFirstAd = null
    let textAndImageSection = 0
    const isStandardArticle = articleType === "standard"

    const articleSections = isTruncatedAt
      ? clone(article.sections).slice(0, isTruncatedAt)
      : article.sections

    const renderedSections = articleSections.map((sectionItem, index) => {
      let section = sectionItem
      let ad = null
      const prevSection = articleSections[index - 1]
      const shouldInject =
        shouldInjectMobileDisplay &&
        sectionItem.type === "text" &&
        !displayMarkerInjected

      /**
       *  Possible data types for "sectionItem.type" are : callout, embed, social_embed,
       *  text, slideshow, image_set, and image_collection.
       *  Depending on the article type we inject an ad after the first text + image_collection OR image_set
       *  section (on Features) and after the 2nd text + image_collection OR image_set on Standard Articles.
       * */

      // calculate if a section is a text + image set/collection/social_embed
      if (
        prevSection?.type === "text" &&
        (sectionItem.type === "image_collection" ||
          sectionItem.type === "image_set" ||
          sectionItem.type === "social_embed")
      ) {
        textAndImageSection++
      }

      let shouldInjectNewAds =
        articleType === "feature" &&
        (sectionItem.type === "image_collection" ||
          sectionItem.type === "image_set") &&
        !firstAdInjected &&
        !isSuper &&
        !hideAds

      if (firstAdInjected) {
        placementCount++
      }

      // only render 2 ads on Features
      if (
        placementCount % 6 === 0 &&
        quantityOfAdsRendered < 2 &&
        articleType !== "standard"
      ) {
        shouldInjectNewAds = true
      }

      // render one ad on Standard articles after the 2nd image + text section
      if (
        textAndImageSection === 2 &&
        quantityOfAdsRendered < 1 &&
        !isSuper &&
        isStandardArticle
      ) {
        shouldInjectNewAds = true
      }

      if (shouldInjectNewAds) {
        quantityOfAdsRendered++

        const adDimension = this.getAdDimension(isStandardArticle)
        const marginTop = this.getAdMarginTop(section)

        firstAdInjected = true
        indexAtFirstAd = indexAtFirstAd === null ? index : indexAtFirstAd // only set this value once; after the index where 1st ad injection is found

        ad = (
          <AdWrapper mt={marginTop} layout={articleType}>
            <DisplayAd
              adUnit={this.getAdUnit(
                placementCount,
                indexAtFirstAd,
                isStandardArticle
              )}
              adDimension={adDimension}
              targetingData={targetingData(
                article,
                isSponsored ? "sponsorfeature" : "feature"
              )}
              articleSlug={article.slug}
            />
          </AdWrapper>
        )
      }

      if (shouldInject) {
        try {
          section = clone(sectionItem)
          section.body = this.injectDisplayPanelMarker(section.body)
          displayMarkerInjected = true
        } catch (error) {
          console.error(
            "(reaction/Sections.jsx) Error injecting Display:",
            error
          )
        }
      }

      const child = this.getSection(section, index)

      if (child) {
        return (
          <SectionContainer
            key={index}
            articleLayout={articleType}
            section={section}
            customWidth={customWidth}
          >
            {child}
            {ad}
          </SectionContainer>
        )
      }
    })

    return renderedSections
  }

  renderAuthors() {
    const {
      color,
      article: { authors },
    } = this.props

    if (authors) {
      return (
        <SectionContainer>
          <Authors authors={authors} color={color} />
        </SectionContainer>
      )
    }
  }

  renderPostScript() {
    const { article, color } = this.props
    const { layout, postscript } = article

    if (postscript) {
      return (
        <SectionContainer>
          <Text
            color={color}
            html={postscript}
            layout={layout}
            postscript={Boolean(postscript)}
          />
        </SectionContainer>
      )
    }
  }

  render() {
    const { article } = this.props

    return (
      <StyledSections layout={article.layout}>
        {this.renderSections()}
        {this.renderAuthors()}
        {this.renderPostScript()}
      </StyledSections>
    )
  }
}

const chooseMargin = layout => {
  if (layout === "standard") {
    return "0;"
  } else if (layout === "feature") {
    return "80px auto 0 auto;"
  }
}

export const StyledSections = styled.div<{ layout: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${({ layout }) => chooseMargin(layout)};
  max-width: ${({ layout }) => (layout === "standard" ? "780px" : "auto")};

  ${({ layout }) => pMedia.xl`
    max-width: ${layout === "standard" ? "680px" : "auto"};
    ${layout === "feature" ? "margin: 80px auto 0 auto" : ""}
  `}

  ${({ layout }) => pMedia.md`
    max-width: ${layout === "standard" ? "780px" : "auto"};
  `}

  ${({ layout }) => pMedia.xs`
    max-width: ${layout === "standard" ? "780px" : "auto"};
    ${layout === "feature" ? "margin: 30px auto 0 auto" : ""}
  `}
`
const AdWrapper = styled(Box) <{ layout: string }>`
  width: ${p => (p.layout === "standard" ? "100%" : "100vw")};
  margin-left: ${p => (p.layout === "standard" ? "0" : "calc(-50vw + 50%)")};
`
