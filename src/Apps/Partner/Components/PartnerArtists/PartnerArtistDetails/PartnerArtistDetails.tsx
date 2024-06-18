import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PartnerArtistDetails_partnerArtist$data } from "__generated__/PartnerArtistDetails_partnerArtist.graphql"
import { PartnerArtistDetailsQuery } from "__generated__/PartnerArtistDetailsQuery.graphql"
import {
  Column,
  GridColumns,
  HTML,
  Join,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { RouterLink } from "System/Components/RouterLink"
import { PartnerArtistDetailsPlaceholder } from "./PartnerArtistDetailsPlaceholder"
import { PartnerArtistArtworksFragmentContainer } from "./PartnerArtistArtworksRail"

export interface PartnerArtistDetailsProps {
  partnerArtist: PartnerArtistDetails_partnerArtist$data
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
    <GridColumns gridRowGap={[2, 4]}>
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
            <FollowArtistButtonQueryRenderer
              id={partnerArtist.node.internalID}
              contextModule={ContextModule.artistHeader}
              width="100%"
            />
          </Column>
        </GridColumns>
      </Column>

      <Column span={6}>
        {biographyBlurb && (
          <Join separator={<Spacer y={2} />}>
            {biographyBlurb.text && (
              <HTML variant="sm">
                <ReadMore maxChars={320} content={biographyBlurb.text} />
              </HTML>
            )}

            {biographyBlurb.credit && (
              <HTML color="black60" variant="sm">
                <ReadMore
                  maxChars={320}
                  content={`— ${biographyBlurb.credit}`}
                />
              </HTML>
            )}
          </Join>
        )}
      </Column>

      <Column span={12}>
        <PartnerArtistArtworksFragmentContainer
          partnerId={partnerId}
          artistId={partnerArtist.node.slug}
          partnerArtist={partnerArtist}
        />
      </Column>
    </GridColumns>
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
          internalID
          slug
          name
          href
          formattedNationalityAndBirthday
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
