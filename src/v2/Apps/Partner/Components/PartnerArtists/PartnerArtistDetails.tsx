import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { PartnerArtistDetails_partnerArtist } from "v2/__generated__/PartnerArtistDetails_partnerArtist.graphql"
import { PartnerArtistDetailsQuery } from "v2/__generated__/PartnerArtistDetailsQuery.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import {
  Box,
  Column,
  GridColumns,
  ReadMore,
  Separator,
  Text,
} from "@artsy/palette"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerArtistDetailsPlaceholder } from "./PartnerArtistDetailsPlaceholder"

export interface PartnerArtistDetailsProps {
  partnerArtist: PartnerArtistDetails_partnerArtist
}

export const PartnerArtistDetails: React.FC<PartnerArtistDetailsProps> = ({
  partnerArtist,
}) => {
  if (!partnerArtist || !partnerArtist.node) return null

  const {
    node: {
      name,
      filterArtworksConnection,
      href,
      formattedNationalityAndBirthday,
    },
    biographyBlurb,
  } = partnerArtist

  return (
    <Box>
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
                artist={partnerArtist.node}
                contextModule={ContextModule.artistHeader}
                buttonProps={{
                  variant: "secondaryOutline",
                  width: "100%",
                }}
              />
            </Column>
          </GridColumns>
        </Column>
        <Column span={6}>
          {biographyBlurb?.text && (
            <Text>
              <ReadMore maxChars={320} content={biographyBlurb.text}></ReadMore>
            </Text>
          )}
          {biographyBlurb?.credit && (
            <Text mt={1} color="black60">
              <ReadMore
                maxChars={320}
                content={`— ${biographyBlurb.credit}`}
              ></ReadMore>
            </Text>
          )}
        </Column>
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
    </Box>
  )
}

export const PartnerArtistDetailsFragmentContainer = createFragmentContainer(
  PartnerArtistDetails,
  {
    partnerArtist: graphql`
      fragment PartnerArtistDetails_partnerArtist on ArtistPartnerEdge {
        biographyBlurb(format: HTML) {
          text
          credit
        }
        node {
          name
          href
          formattedNationalityAndBirthday
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
          partner(id: $partnerId) {
            artistsConnection(artistIDs: [$artistId], first: 1) {
              edges {
                ...PartnerArtistDetails_partnerArtist
              }
            }
          }
        }
      `}
      variables={{ partnerId, artistId }}
      render={({ error, props }) => {
        if (error || !props) return <PartnerArtistDetailsPlaceholder />
        return (
          <PartnerArtistDetailsFragmentContainer
            {...rest}
            {...props}
            partnerArtist={props?.partner?.artistsConnection?.edges[0]}
          />
        )
      }}
    />
  )
}
