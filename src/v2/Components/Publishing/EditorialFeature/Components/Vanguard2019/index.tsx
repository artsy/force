import { Box } from "@artsy/palette"
import { VanguardCredits } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Components/VanguardCredits"
import { EditorialFeaturesProps } from "v2/Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav, NavContainer } from "v2/Components/Publishing/Nav/Nav"
import { last } from "lodash"
import React from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { ArtistWrapper } from "./Components/ArtistWrapper"
import { VanguardFooter } from "./Components/Footer"
import { VanguardFrameText } from "./Components/FrameText"
import { VanguardIntroduction } from "./Components/Introduction"
import { VanguardSeriesWrapper } from "./Components/SeriesWrapper"
import { VanguardTableOfContents } from "./Components/TableOfContents"

export class Vanguard2019 extends React.Component<
  EditorialFeaturesProps,
  {
    isSlideOpen: boolean
    isTest?: boolean
  }
  > {
  state = {
    isSlideOpen: false,
  }
  public validSlugs

  onChangeSection = slug => {
    const scrollTarget = document.getElementById(slug)
    scrollTarget &&
      scrollTarget.scrollIntoView({
        behavior: "smooth",
      })
  }

  componentDidMount() {
    this.getValidPaths()
    window.addEventListener("load", this.handleScrollOnLoad.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleScrollOnLoad)
  }

  handleScrollOnLoad() {
    const scrollSlugs = window.location.pathname
      .split("/series/artsy-vanguard-2019/")
      .filter(({ length }) => length)
    const scrollToSlug = scrollSlugs.length && last(scrollSlugs)

    if (this.validSlugs.includes(scrollToSlug)) {
      this.onChangeSection(scrollToSlug)
    }
    // remove slug from pathname
    window.history.replaceState({}, "", "/series/artsy-vanguard-2019")
  }

  getValidPaths = () => {
    const validPaths = []

    this.props.article.relatedArticles.forEach(series => {
      // get subSeries slug
      validPaths.push(slugify(series.title))
      series.relatedArticles.map(artist => {
        // get artist slug
        validPaths.push(slugify(artist.title))
      })
    })
    this.validSlugs = validPaths
  }

  onFullScreenProviderStateChange = (state: boolean) => {
    this.setState({ isSlideOpen: !state })
  }

  render() {
    const { article, isMobile, isTest } = this.props
    const { isSlideOpen } = this.state
    const { relatedArticles } = article

    return (
      <VanguardWrapper isSlideOpen={isSlideOpen}>
        <Nav
          canFix
          color="black"
          backgroundColor="white"
          title={article.title}
          isSlideOpen={isSlideOpen}
        />

        {/** floating title text */}
        <VanguardFrameText isSlideOpen={isSlideOpen} />

        {/** header landing video & intro text */}
        <VanguardIntroduction article={article} isMobile={isMobile} />

        {/** table of contents */}
        <VanguardTableOfContents
          article={article}
          onChangeSection={this.onChangeSection}
        />

        {/** map 3 sub-series articles */}
        {relatedArticles &&
          relatedArticles.map((subSeries, i) => (
            <VanguardSeriesWrapper
              key={subSeries.id}
              article={subSeries}
              index={i}
              isMobile={isMobile}
              onSlideshowStateChange={this.onFullScreenProviderStateChange}
              isTest={isTest}
            />
          ))}

        {/** display credits at end of article series on mobile */}
        {isMobile && <VanguardCredits isMobile={isMobile} />}
        <VanguardFooter />
      </VanguardWrapper>
    )
  }
}

const VanguardWrapper = styled(Box) <{ isSlideOpen: boolean }>`
  overflow: ${({ isSlideOpen }) => isSlideOpen && "hidden"};

  ${ArtistWrapper} {
    z-index: unset;
  }

  ${NavContainer} {
    position: fixed;
  }
`
