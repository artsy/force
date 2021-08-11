import { EntityHeader, Spacer, StackableBorderBox } from "@artsy/palette"
import { ArtistInfo_artist } from "v2/__generated__/ArtistInfo_artist.graphql"
import { ArtistInfoQuery } from "v2/__generated__/ArtistInfoQuery.graphql"
import { SystemContextConsumer } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistBioFragmentContainer as ArtistBio } from "v2/Components/ArtistBio"
import { ArtistMarketInsightsFragmentContainer as ArtistMarketInsights } from "v2/Components/ArtistMarketInsights"
import { SelectedExhibitionFragmentContainer as SelectedExhibitions } from "v2/Components/SelectedExhibitions"
import { ContextModule } from "@artsy/cohesion"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import Events from "v2/Utils/Events"

interface ArtistInfoProps {
  artist: ArtistInfo_artist
}

const Container = ({ children }) => (
  <StackableBorderBox p={2}>{children}</StackableBorderBox>
)

@track(
  { context_module: Schema.ContextModule.Biography },
  { dispatch: data => Events.postEvent(data) }
)
export class ArtistInfo extends Component<ArtistInfoProps> {
  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheArtist,
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
  })
  trackArtistBioReadMoreClick() {
    // Tracking
  }

  render() {
    const { artist } = this.props
    const { biographyBlurb, image } = this.props.artist
    const showArtistBio = !!biographyBlurb?.text

    return (
      <>
        <StackableBorderBox flexDirection="column" data-test="artistInfo">
          <EntityHeader
            name={artist.name!}
            href={artist.href!}
            meta={artist.formatted_nationality_and_birthday!}
            image={{
              src: image?.cropped?.src,
              srcSet: image?.cropped?.srcSet,
              lazyLoad: true,
            }}
            FollowButton={
              <FollowArtistButton
                artist={artist}
                contextModule={ContextModule.aboutTheWork}
                buttonProps={{ size: "small", variant: "secondaryOutline" }}
              />
            }
          />
          {showArtistBio && (
            <>
              <Spacer mt={2} />

              <ArtistBio
                bio={artist}
                onReadMoreClicked={this.trackArtistBioReadMoreClick.bind(this)}
              />
            </>
          )}
        </StackableBorderBox>

        <ArtistMarketInsights
          artist={artist}
          border={false}
          Container={Container}
        />

        <SelectedExhibitions
          artistID={artist.internalID}
          border={false}
          // @ts-expect-error STRICT_NULL_CHECK
          totalExhibitions={artist.counts?.partner_shows}
          // @ts-expect-error STRICT_NULL_CHECK
          exhibitions={artist.exhibition_highlights}
          ViewAllLink={
            <a href={`${sd.APP_URL}/artist/${artist.slug}/cv`}>View all</a>
          }
          Container={Container}
        />
      </>
    )
  }
}

export const ArtistInfoFragmentContainer = createFragmentContainer(
  ArtistInfo as React.ComponentType<ArtistInfoProps>,
  {
    artist: graphql`
      fragment ArtistInfo_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
        internalID
        slug
        name
        href
        image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
        formatted_nationality_and_birthday: formattedNationalityAndBirthday
        counts {
          partner_shows: partnerShows
        }
        exhibition_highlights: exhibitionHighlights(size: 3) {
          ...SelectedExhibitions_exhibitions
        }
        collections
        highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: $partnerCategory
          ) {
            edges {
              node {
                __typename
              }
            }
          }
        }
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              __typename
            }
          }
        }
        ...ArtistBio_bio
        ...ArtistMarketInsights_artist
        ...FollowArtistButton_artist
        # The below data is only used to determine whether a section
        # should be rendered
        biographyBlurb: biographyBlurb(format: HTML, partnerBio: false) {
          text
        }
      }
    `,
  }
)

export const ArtistInfoQueryRenderer = ({ artistID }: { artistID: string }) => {
  return (
    <SystemContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtistInfoQuery>
            environment={relayEnvironment}
            variables={{ artistID }}
            query={graphql`
              query ArtistInfoQuery($artistID: String!) {
                artist(id: $artistID) {
                  ...ArtistInfo_artist
                }
              }
            `}
            render={renderWithLoadProgress(ArtistInfoFragmentContainer)}
          />
        )
      }}
    </SystemContextConsumer>
  )
}
