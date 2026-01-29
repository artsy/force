import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  BorderBox,
  Box,
  HTML,
  Skeleton,
  SkeletonText,
  StackableBorderBox,
  Tab,
  type TabInfo,
  Tabs,
} from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtworkDetailsQuery } from "__generated__/ArtworkDetailsQuery.graphql"
import type { ArtworkDetails_artwork$data } from "__generated__/ArtworkDetails_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import {
  ArtworkDetailsAdditionalInfoFragmentContainer,
  ArtworkDetailsAdditionalInfoSkeleton,
} from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticlesFragmentContainer } from "./ArtworkDetailsArticles"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork$data
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork }) => {
  const tracking = useTracking()

  const handleTabChange = ({ data }: TabInfo) => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      flow: DeprecatedSchema.Flow.ArtworkAboutTheArtist,
      label: data.trackingLabel,
      type: DeprecatedSchema.Type.Tab,
    })
  }

  return (
    <ArtworkDetailsContainer data-test="artworkDetails">
      <Tabs onChange={handleTabChange}>
        <Tab name="About the work" data={{ trackingLabel: "about_the_work" }}>
          <ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer
            artwork={artwork}
          />

          <ArtworkDetailsAdditionalInfoFragmentContainer artwork={artwork} />
        </Tab>

        {artwork.articles && artwork.articles.length > 0 && (
          <Tab name="Articles" data={{ trackingLabel: "articles" }}>
            <ArtworkDetailsArticlesFragmentContainer artwork={artwork} />
          </Tab>
        )}

        {artwork.exhibition_history && (
          <Tab
            name="Exhibition history"
            data={{ trackingLabel: "exhibition_history" }}
          >
            <ExhibitionHistory>
              <BorderBox>
                <HTML variant="sm" html={artwork.exhibition_history} />
              </BorderBox>
            </ExhibitionHistory>
          </Tab>
        )}

        {artwork.literature && (
          <Tab name="Bibliography" data={{ trackingLabel: "bibliography" }}>
            <Literature>
              <BorderBox>
                <HTML variant="sm" html={artwork.literature} />
              </BorderBox>
            </Literature>
          </Tab>
        )}

        {artwork.provenance && (
          <Tab name="Provenance" data={{ trackingLabel: "provenance" }}>
            <Provenance>
              <BorderBox>
                <HTML variant="sm" html={artwork.provenance} />
              </BorderBox>
            </Provenance>
          </Tab>
        )}
      </Tabs>
    </ArtworkDetailsContainer>
  )
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(
  ArtworkDetails,
  {
    artwork: graphql`
      fragment ArtworkDetails_artwork on Artwork {
        ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
        ...ArtworkDetailsAdditionalInfo_artwork
        ...ArtworkDetailsArticles_artwork
        articles(size: 10) {
          slug
        }
        literature(format: HTML)
        exhibition_history: exhibitionHistory(format: HTML)
        provenance(format: HTML)
      }
    `,
  },
)

const TabContainer = styled(Box)``
const ArtworkDetailsContainer = TabContainer
const ExhibitionHistory = TabContainer
const Literature = TabContainer
const Provenance = TabContainer

const PLACEHOLDER = (
  <Skeleton>
    <Tabs>
      <Tab name="About the work">
        <StackableBorderBox>
          <SkeletonText variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            omnis explicabo nam architecto voluptatem dolores impedit cum
            inventore.
          </SkeletonText>
        </StackableBorderBox>

        <BorderBox>
          <ArtworkDetailsAdditionalInfoSkeleton />
        </BorderBox>
      </Tab>
    </Tabs>
  </Skeleton>
)

interface ArtworkDetailsQueryRendererProps {
  slug: string
}

export const ArtworkDetailsQueryRenderer: React.FC<
  ArtworkDetailsQueryRendererProps
> = ({ slug }) => {
  return (
    <SystemQueryRenderer<ArtworkDetailsQuery>
      lazyLoad
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtworkDetailsQuery($slug: String!) {
          artwork(id: $slug) {
            ...ArtworkDetails_artwork
          }
        }
      `}
      variables={{ slug }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.artwork) {
          return PLACEHOLDER
        }

        return <ArtworkDetailsFragmentContainer artwork={props.artwork} />
      }}
    />
  )
}
