import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { PartnerArtistDetails_artist } from "v2/__generated__/PartnerArtistDetails_artist.graphql"
import { PartnerArtistDetailsQuery } from "v2/__generated__/PartnerArtistDetailsQuery.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Column, GridColumns, ReadMore, Separator, Text } from "@artsy/palette"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerArtistDetailsPlaceholder } from "./PartnerArtistDetailsPlaceholder"

export interface PartnerArtistDetailsProps {
  artist: PartnerArtistDetails_artist
}

export const PartnerArtistDetails: React.FC<PartnerArtistDetailsProps> = ({
  artist,
}) => {
  const {
    name,
    filterArtworksConnection,
    href,
    formattedNationalityAndBirthday,
  } = artist

  return (
    <>
      <Separator id="jump--PartnerArtistDetails" mt={4} />
      <GridColumns gridRowGap={[2, 4]} my={4}>
        <Column span={6}>
          <GridColumns gridRowGap={2}>
            <Column span={12}>
              <RouterLink to={href} noUnderline>
                <Text variant="largeTitle">{name}</Text>
              </RouterLink>
              <Text color="black60" variant="title">
                {formattedNationalityAndBirthday}
              </Text>
            </Column>
            <Column span={[12, 6]}>
              <FollowArtistButton
                artist={artist}
                contextModule={ContextModule.artistHeader}
                buttonProps={{
                  variant: "secondaryOutline",
                  width: "100%",
                }}
              />
            </Column>
          </GridColumns>
        </Column>
        {artist.biographyBlurb?.text && (
          <Column span={6}>
            <Text>
              <ReadMore
                maxChars={320}
                content={artist.biographyBlurb.text}
              ></ReadMore>
            </Text>
          </Column>
        )}
        <Column span={12}>
          <Carousel arrowHeight={160}>
            {filterArtworksConnection.edges.map((artwork, i) => {
              return (
                <FillwidthItem
                  key={artwork.node.id}
                  artwork={artwork.node}
                  imageHeight={160}
                  lazyLoad
                />
              )
            })}
          </Carousel>
        </Column>
      </GridColumns>
    </>
  )
}

export const PartnerArtistDetailsFragmentContainer = createFragmentContainer(
  PartnerArtistDetails,
  {
    artist: graphql`
      fragment PartnerArtistDetails_artist on Artist {
        name
        href
        formattedNationalityAndBirthday
        biographyBlurb(format: HTML, partnerBio: true) {
          text
        }
        ...FollowArtistButton_artist
        filterArtworksConnection(first: 12, partnerIDs: [$partnerId]) {
          edges {
            node {
              id
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  }
)

export const PartnerArtistDetailsRenderer: React.FC<{
  partnerId: string
  artistId: string
}> = ({ partnerId, artistId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<PartnerArtistDetailsQuery>
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistDetailsQuery(
          $partnerId: String!
          $artistId: String!
        ) {
          artist(id: $artistId) {
            ...PartnerArtistDetails_artist
          }
        }
      `}
      variables={{ partnerId, artistId }}
      render={({ error, props }) => {
        if (error || !props) return <PartnerArtistDetailsPlaceholder />
        return <PartnerArtistDetailsFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
