import { Box, Sans, Serif } from "@artsy/palette"
import { Feature_viewer$data } from "v2/__generated__/Feature_viewer.graphql"
import { FeaturedArticlesFragmentContainer as FeaturedArticles } from "v2/Apps/FeatureAKG/Components/FeaturedArticles"
import { FeaturedArtists } from "v2/Apps/FeatureAKG/Components/FeaturedArtists"
import { FeaturedRailsFragmentContainer as FeaturedRails } from "v2/Apps/FeatureAKG/Components/FeaturedRails"
import { FeaturedThisWeek } from "v2/Apps/FeatureAKG/Components/FeaturedThisWeek"
import { SelectedWorksFragmentContainer as SelectedWorks } from "v2/Apps/FeatureAKG/Components/SelectedWorks"
import { AnalyticsSchema, ContextModule } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useSystemContext } from "v2/System/SystemContext"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { crop, resize } from "v2/Utils/resizer"
import { Media } from "v2/Utils/Responsive"

interface FeatureProps {
  viewer: Feature_viewer$data
}

const Feature: React.FC<FeatureProps> = props => {
  const { injectedData } = useSystemContext()

  if (!injectedData) {
    return null
  }

  const featuredThisWeek = injectedData.featured_this_week
  const editorial = injectedData.editorial
  const selectedWorks = injectedData.selected_works
  const featuredArtists = injectedData.featured_artists
  const featuredRails = injectedData.browse
  const heroVideo = injectedData.hero_video
  const video1 = injectedData.video_1
  const video2 = injectedData.video_2

  const showRails =
    !!featuredRails?.collections_rail?.items?.length ||
    !!featuredRails?.auctions_rail?.items?.length ||
    !!featuredRails?.fairs_rail?.items?.length

  const resizedSmallPlaceholder = resize(heroVideo.small_placeholder_src, {
    width: 600,
    convert_to: "jpg",
  })

  const resizedLargePlaceholder = resize(heroVideo.large_placeholder_src, {
    width: 1500,
    convert_to: "jpg",
  })

  return (
    <>
      <Media greaterThanOrEqual="sm">
        {heroVideo?.large_src && (
          <Box textAlign="center" mb={-1}>
            <Video
              src={heroVideo.large_src}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              placeholder={resizedLargePlaceholder}
            />
          </Box>
        )}
      </Media>
      <Media at="xs">
        {heroVideo?.small_src && (
          <Box textAlign="center" mb={-1}>
            <Video
              src={heroVideo.small_src}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              placeholder={resizedSmallPlaceholder}
            />
          </Box>
        )}
      </Media>
      <SectionSeparator />
      <Box pt="4" maxWidth="475px" m="0 auto">
        <Sans size="4" mx={[3, 0]} weight="medium">
          {injectedData.description}
        </Sans>
      </Box>

      {/* Featured this week */}
      <Section
        title={featuredThisWeek.title}
        subtitle={featuredThisWeek.subtitle}
      >
        <FeaturedThisWeek {...featuredThisWeek} />
      </Section>

      {/* Editorial */}
      {editorial?.article_ids?.length && (
        <Section title={editorial.title} subtitle={editorial.subtitle}>
          <FeaturedArticles {...editorial} articles={props.viewer.articles} />
        </Section>
      )}

      {/* Video 1 */}
      <Media greaterThanOrEqual="sm">
        {video1?.large_src && (
          <ImageSection
            src={video1.large_src}
            aspectRatio={video1.large_aspect_ratio}
          />
        )}
      </Media>
      <Media at="xs">
        {video1?.small_src && (
          <ImageSection
            src={video1.small_src}
            aspectRatio={video1.small_aspect_ratio}
          />
        )}
      </Media>

      {/* Selected works */}
      {selectedWorks?.set_id && (
        <Section title={selectedWorks.title} subtitle={selectedWorks.subtitle}>
          <SelectedWorks
            {...selectedWorks}
            selectedWorks={props.viewer.selectedWorks}
          />
        </Section>
      )}

      {/* Featured Artists */}
      {featuredArtists?.artists?.length && (
        <Section
          title={featuredArtists.title}
          subtitle={featuredArtists.subtitle}
        >
          <Box mb={-3} mx={[-1, 0]}>
            <FeaturedArtists {...featuredArtists} />
          </Box>
        </Section>
      )}

      {/* Video 2 */}
      <Media greaterThanOrEqual="sm">
        {video2?.large_src && (
          <ImageSection
            src={video2.large_src}
            aspectRatio={video2.large_aspect_ratio}
          />
        )}
      </Media>
      <Media at="xs">
        {video2?.small_src && (
          <ImageSection
            src={video2.small_src}
            aspectRatio={video2.small_aspect_ratio}
          />
        )}
      </Media>

      {/* Browse */}
      {showRails && (
        <Section title={featuredRails.title} subtitle={featuredRails.subtitle}>
          <FeaturedRails {...featuredRails} viewer={props.viewer} />
        </Section>
      )}
    </>
  )
}

export const FeatureFragmentContainer = createFragmentContainer(Feature, {
  viewer: graphql`
    fragment Feature_viewer on Viewer
      @argumentDefinitions(
        articleIDs: { type: "[String]!" }
        selectedWorksSetID: { type: "String!" }
        collectionRailItemIDs: { type: "[String!]" }
        auctionRailItemIDs: { type: "[String!]" }
        fairRailItemIDs: { type: "[String!]" }
        hasCollectionRailItems: { type: "Boolean!" }
        hasAuctionRailItems: { type: "Boolean!" }
        hasFairRailItems: { type: "Boolean!" }
      ) {
      articles: articles(ids: $articleIDs) {
        ...FeaturedArticles_articles
      }
      selectedWorks: orderedSet(id: $selectedWorksSetID) {
        ...SelectedWorks_selectedWorks
      }
      ...FeaturedRails_viewer
        @arguments(
          collectionRailItemIDs: $collectionRailItemIDs
          auctionRailItemIDs: $auctionRailItemIDs
          fairRailItemIDs: $fairRailItemIDs
          hasCollectionRailItems: $hasCollectionRailItems
          hasAuctionRailItems: $hasAuctionRailItems
          hasFairRailItems: $hasFairRailItems
        )
    }
  `,
})

interface SectionProps {
  title: string
  subtitle: string
}

const Section: React.FC<SectionProps> = props => {
  const { title, subtitle } = props

  return (
    <Box>
      <SectionSeparator my="4" />
      <Box px={["2", "3"]}>
        <Box mb={3}>
          {title && <TitleText size="3">{title}</TitleText>}
          {subtitle && (
            <Sans size="3" color="black60" my={1}>
              {subtitle}
            </Sans>
          )}
        </Box>
        {props.children}
      </Box>
    </Box>
  )
}

const Video: React.FC<{ src: string; placeholder: string }> = props => {
  return (
    <StyledVideo
      src={props.src}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      poster={props.placeholder}
    />
  )
}

const StyledVideo = styled("video")`
  width: 100%;
  height: auto;
`

const ImageSection: React.FC<{ src: string; aspectRatio: number }> = props => {
  return (
    <BorderedSection>
      <div
        style={{
          width: "100%",
          paddingBottom: `${props.aspectRatio * 100}%`,
          backgroundImage: `url(${props.src})`,
          backgroundSize: "contain",
        }}
      />
    </BorderedSection>
  )
}

const BorderedSection = styled(Box)`
  border-top: 1px solid black;
  margin-bottom: -40px;
  margin-top: 40px;
`

export interface FeaturedLinkType {
  image_src: string
  description: string
  subtitle: string
  title: string
  url: string
  byline?: string
  size?: "medium" | "large"
  contextModule: ContextModule
}

export const FeaturedContentLink: React.FC<FeaturedLinkType> = props => {
  const devicePixelRatio = 2
  const size = props.size ? props.size : "medium"

  const width = size === "medium" ? 350 : 470
  const height = size === "medium" ? 435 : 490

  const croppedUrl = crop(props.image_src, {
    width: width * devicePixelRatio,
    height: height * devicePixelRatio,
    convert_to: "jpg",
  })

  const tracking = useTracking()

  return (
    <StyledLink
      to={props.url}
      onClick={() =>
        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.Click,
          context_module: props.contextModule,
          destination_path: props.url,
        })
      }
    >
      <Box position="relative">
        <div
          style={{
            width: "100%",
            paddingBottom: `${(height / width) * 100}%`,
            backgroundImage: `url(${croppedUrl})`,
            backgroundSize: "contain",
          }}
        />

        <ImageOverlayText maxWidth="150px">
          <BlockText size="2" color="white">
            {props.title}
          </BlockText>
          {props.byline && (
            <Sans size="2" color="white">
              {props.byline}
            </Sans>
          )}
        </ImageOverlayText>
      </Box>
      <Sans size="2" my={1}>
        {props.subtitle}
      </Sans>
      <Serif size="2">{props.description}</Serif>
    </StyledLink>
  )
}

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`

const TitleText = styled(Sans)`
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 30px;
  font-size: 33px;
  max-width: 275px;
`

const BlockText = styled(Sans)`
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 24px;
  font-size: 27px;
  max-width: 220px;
`

const ImageOverlayText = styled(Box)`
  position: absolute;
  bottom: 20px;
  left: 20px;
`

const SectionSeparator = styled(Box)`
  border-top: 1px solid #000000;
`
