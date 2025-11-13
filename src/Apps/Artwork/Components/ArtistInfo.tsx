import { ArtistBioFragmentContainer } from "Components/ArtistBio"
import { ArtistMarketInsightsFragmentContainer } from "Components/ArtistMarketInsights"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { SelectedExhibitionFragmentContainer } from "Components/SelectedExhibitions"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ContextModule } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import type { ArtistInfo_artist$data } from "__generated__/ArtistInfo_artist.graphql"
import type { ArtistInfoQuery } from "__generated__/ArtistInfoQuery.graphql"
import { compact } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistInfoProps {
  artist: ArtistInfo_artist$data
}

const ArtistInfo: React.FC<ArtistInfoProps> = ({ artist }) => {
  const tracking = useTracking()
  const { biographyBlurb } = artist
  const showArtistBio = !!biographyBlurb?.text

  const handleReadMoreClick = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      context_module: DeprecatedSchema.ContextModule.Biography,
      flow: DeprecatedSchema.Flow.ArtworkAboutTheArtist,
      subject: DeprecatedSchema.Subject.ReadMore,
      type: DeprecatedSchema.Type.Button,
    })
  }

  return (
    <>
      <StackableBorderBox flexDirection="column" data-test="artistInfo">
        <EntityHeaderArtistFragmentContainer
          artist={artist}
          FollowButton={
            <FollowArtistButtonQueryRenderer
              id={artist.internalID}
              contextModule={ContextModule.aboutTheWork}
              size="small"
            />
          }
        />

        {showArtistBio && (
          <>
            <Spacer y={2} />
            <ArtistBioFragmentContainer
              bio={artist}
              onReadMoreClicked={handleReadMoreClick}
            />
          </>
        )}
      </StackableBorderBox>

      <ArtistMarketInsightsFragmentContainer
        artist={artist}
        border={false}
        Container={Container}
      />

      <SelectedExhibitionFragmentContainer
        artistID={artist.internalID}
        border={false}
        totalExhibitions={artist.counts?.partnerShows ?? 0}
        exhibitions={compact(artist.exhibitionHighlights)}
        ViewAllLink={
          <RouterLink inline to={`/artist/${artist.slug}/cv`}>
            View all
          </RouterLink>
        }
        Container={Container}
      />
    </>
  )
}

export const ArtistInfoFragmentContainer = createFragmentContainer(ArtistInfo, {
  artist: graphql`
    fragment ArtistInfo_artist on Artist
    @argumentDefinitions(
      partnerCategory: {
        type: "[String]"
        defaultValue: ["blue-chip", "top-established", "top-emerging"]
      }
    ) {
      ...EntityHeaderArtist_artist
      internalID
      slug
      image {
        cropped(width: 45, height: 45) {
          src
          srcSet
        }
      }
      counts {
        partnerShows
      }
      exhibitionHighlights(size: 3) {
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
      # The below data is only used to determine whether a section
      # should be rendered
      biographyBlurb: biographyBlurb(format: HTML) {
        text
      }
    }
  `,
})

const PLACEHOLDER = (
  <Skeleton>
    <StackableBorderBox flexDirection="column">
      <SkeletonBox width="100%" height={90} />

      <Spacer y={1} />

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

export const ArtistInfoQueryRenderer: React.FC<
  React.PropsWithChildren<{
    slug: string
  }>
> = ({ slug }) => {
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

const Container = ({ children }) => (
  <StackableBorderBox p={2}>{children}</StackableBorderBox>
)
