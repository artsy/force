import {
  BorderBox,
  Box,
  HTML,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  StackableBorderBox,
  Tab,
  Tabs,
} from "@artsy/palette"
import { Component } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer } from "./ArtworkDetailsAboutTheWorkFromPartner"
import { ArtworkDetailsAdditionalInfoFragmentContainer } from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticlesFragmentContainer } from "./ArtworkDetailsArticles"
import { ArtworkDetails_artwork } from "v2/__generated__/ArtworkDetails_artwork.graphql"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import Events from "v2/Utils/Events"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkDetailsQuery } from "v2/__generated__/ArtworkDetailsQuery.graphql"
import { useSystemContext } from "v2/System"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

@track(
  {
    context_module: Schema.ContextModule.ArtworkTabs,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class ArtworkDetails extends Component<ArtworkDetailsProps> {
  @track((_props, _state, [{ data }]) => {
    return {
      action_type: Schema.ActionType.Click,
      flow: Schema.Flow.ArtworkAboutTheArtist,
      label: data.trackingLabel,
      type: Schema.Type.Tab,
    }
  })
  trackTabChange() {
    // noop
  }

  render() {
    const { artwork } = this.props

    return (
      <ArtworkDetailsContainer data-test="artworkDetails">
        <Tabs onChange={this.trackTabChange.bind(this)}>
          <Tab name="About the work" data={{ trackingLabel: "about_the_work" }}>
            <ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer
              artwork={artwork}
            />
            <ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer
              artwork={artwork}
            />
            <ArtworkDetailsAdditionalInfoFragmentContainer artwork={artwork} />
          </Tab>

          {artwork.articles && artwork.articles.length && (
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
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(
  ArtworkDetails,
  {
    artwork: graphql`
      fragment ArtworkDetails_artwork on Artwork {
        ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
        ...ArtworkDetailsAboutTheWorkFromPartner_artwork
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
  }
)

const TabContainer = styled(Box)``
const ArtworkDetailsContainer = TabContainer
const ExhibitionHistory = TabContainer
const Literature = TabContainer
const Provenance = TabContainer

const PLACEHOLDER = (
  <Skeleton>
    <ArtworkDetailsContainer>
      <Tabs>
        <Tab name="About the work">
          <StackableBorderBox>
            <SkeletonBox width="100%" height={90} />
          </StackableBorderBox>
          <StackableBorderBox flexDirection="column">
            <SkeletonText variant="xs">Medium</SkeletonText>
            <SkeletonText variant="xs">Condition</SkeletonText>
            <SkeletonText variant="xs">Signature</SkeletonText>
            <SkeletonText variant="xs">
              Certificate of authenticity
            </SkeletonText>
            <SkeletonText variant="xs">Frame</SkeletonText>
          </StackableBorderBox>
        </Tab>
      </Tabs>
    </ArtworkDetailsContainer>
  </Skeleton>
)

export const ArtworkDetailsQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworkDetailsQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtworkDetailsQuery($slug: String!) {
          artwork(id: $slug) {
            ...ArtworkDetails_artwork
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props) {
          return PLACEHOLDER
        }
        if (props.artwork) {
          return <ArtworkDetailsFragmentContainer artwork={props.artwork} />
        }
      }}
    />
  )
}
