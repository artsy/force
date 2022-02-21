import {
  EntityHeader,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import { ArtistInfo_artist$data } from "v2/__generated__/ArtistInfo_artist.graphql"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistBioFragmentContainer as ArtistBio } from "v2/Components/ArtistBio"
import { ArtistMarketInsightsFragmentContainer as ArtistMarketInsights } from "v2/Components/ArtistMarketInsights"
import { SelectedExhibitionFragmentContainer as SelectedExhibitions } from "v2/Components/SelectedExhibitions"
import { ContextModule } from "@artsy/cohesion"
import { Component } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import Events from "v2/Utils/Events"

interface ArtistInfoProps {
  artist: ArtistInfo_artist$data
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
          totalExhibitions={artist.counts?.partner_shows}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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

import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtistInfoQuery } from "v2/__generated__/ArtistInfoQuery.graphql"
import { useSystemContext } from "v2/System"

const PLACEHOLDER = (
  <Skeleton>
    <StackableBorderBox flexDirection="column">
      <SkeletonBox width="100%" height={90} />
      <Spacer my={1} />
      <SkeletonText variant="sm">
        Perhaps the most influential artist of the 20th century, Pablo Picasso
        may be best known for pioneering Cubism and fracturing the
        two-dimensional picture plane in order to convey three-dimensional
        space. Inspired by African and Iberian art, he also contributed to the
        rise of Surrealism and Expressionism. Picasso’s sizable oeuvre grew to
        include over 20,000 paintings, prints, drawings, sculptures,ceramics,
        theater sets, and costume designs. He painted his most famous work,
        Guernica (1937), in response to the Spanish Civil War; the totemic
        grisaille canvas remains a definitive work of anti-war art. At auction,
        a number of Picasso’s paintings have sold for more than $100 million.
        The indefatigable artist has been the subject of exhibitions at the
        world’s most prestigious institutions, from the Museum of Modern Art and
        Centre Pompidou to the Stedelijk Museum and Tate Modern.
      </SkeletonText>
    </StackableBorderBox>
  </Skeleton>
)

export const ArtistInfoQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtistInfoQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistInfoQuery($slug: String!) {
          artist(id: $slug) {
            ...ArtistInfo_artist
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
        if (props.artist) {
          return <ArtistInfoFragmentContainer artist={props.artist} />
        }
      }}
    />
  )
}
