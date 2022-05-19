import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { PartnerArtistDetails_partnerArtist } from "v2/__generated__/PartnerArtistDetails_partnerArtist.graphql"
import { PartnerArtistDetailsQuery } from "v2/__generated__/PartnerArtistDetailsQuery.graphql"
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
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { PartnerArtistDetailsPlaceholder } from "./PartnerArtistDetailsPlaceholder"
import { PartnerArtistArtworksRailPaginationContainer } from "./PartnerArtistArtworksRail"

export interface PartnerArtistDetailsProps {
  partnerArtist: PartnerArtistDetails_partnerArtist
  partnerId: string
}

export const PartnerArtistDetails: React.FC<PartnerArtistDetailsProps> = ({
  partnerArtist,
  partnerId,
}) => {
  if (!partnerArtist || !partnerArtist.node) return null

  const {
    node: { name, href, formattedNationalityAndBirthday },
    biographyBlurb,
  } = partnerArtist

  return (
    <Box>
      <Separator id="jump--PartnerArtistDetails" mt={4} />
      <GridColumns gridRowGap={[2, 4]} my={4}>
        <Column span={6}>
          <GridColumns gridRowGap={2}>
            <Column span={12}>
              <RouterLink to={href} textDecoration="none">
                <Text variant="xl">{name}</Text>
              </RouterLink>
              <Text color="black60" variant="lg-display">
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
        <Column span={12} maxWidth="100%">
          <PartnerArtistArtworksRailPaginationContainer
            partnerId={partnerId}
            artistId={partnerArtist.node.slug}
            partnerArtist={partnerArtist}
          ></PartnerArtistArtworksRailPaginationContainer>
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
        ...PartnerArtistArtworksRail_partnerArtist
        node {
          slug
          name
          href
          formattedNationalityAndBirthday
          ...FollowArtistButton_artist
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
    <SystemQueryRenderer<PartnerArtistDetailsQuery>
      lazyLoad
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
      placeholder={<PartnerArtistDetailsPlaceholder />}
      render={({ error, props }) => {
        if (error || !props) return <PartnerArtistDetailsPlaceholder />

        return (
          <PartnerArtistDetailsFragmentContainer
            {...rest}
            {...props}
            partnerId={partnerId}
            partnerArtist={props?.partner?.artistsConnection?.edges?.[0]!}
          />
        )
      }}
    />
  )
}
