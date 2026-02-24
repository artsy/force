import { ContextModule } from "@artsy/cohesion"
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
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { PartnerArtistDetailsQuery } from "__generated__/PartnerArtistDetailsQuery.graphql"
import type { PartnerArtistDetails_partner$data } from "__generated__/PartnerArtistDetails_partner.graphql"
import type { PartnerArtistDetails_partnerArtist$data } from "__generated__/PartnerArtistDetails_partnerArtist.graphql"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerArtistArtworksFragmentContainer } from "./PartnerArtistArtworksRail"
import { PartnerArtistDetailsPlaceholder } from "./PartnerArtistDetailsPlaceholder"

export interface PartnerArtistDetailsProps {
  partnerArtist: PartnerArtistDetails_partnerArtist$data
  partner: PartnerArtistDetails_partner$data
}

export const PartnerArtistDetails: React.FC<
  React.PropsWithChildren<PartnerArtistDetailsProps>
> = ({ partnerArtist, partner }) => {
  if (!partnerArtist || !partnerArtist.node) return null

  const {
    node: { name, href, formattedNationalityAndBirthday },
    biographyBlurb,
  } = partnerArtist

  const {
    match: {
      location: { pathname, hash },
    },
  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  } = useRouter()

  const artist = partnerArtist.node
  const isArtistDetailsPath =
    pathname === `${partner.href}/artists` && hash === `#${artist.slug}`

  return (
    <>
      {isArtistDetailsPath && (
        <Meta
          name="description"
          content={`Discover and buy artworks by ${name}, available through ${partner.name} on Artsy. Browse paintings, prints, and more offered by the gallery.`}
        />
      )}

      <GridColumns gridRowGap={[2, 4]}>
        <Column span={6}>
          <GridColumns gridRowGap={2}>
            <Column span={12}>
              <RouterLink to={href} textDecoration="none">
                <Text variant="xl">{name}</Text>
              </RouterLink>

              <Text color="mono60" variant="lg-display">
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
                  <ReadMore maxLines={6} content={biographyBlurb.text} />
                </HTML>
              )}

              {biographyBlurb.credit && (
                <HTML color="mono60" variant="sm">
                  <ReadMore
                    maxLines={6}
                    content={`— ${biographyBlurb.credit}`}
                  />
                </HTML>
              )}
            </Join>
          )}
        </Column>

        <Column span={12}>
          <PartnerArtistArtworksFragmentContainer
            partnerId={partner.internalID}
            artistId={partnerArtist.node.slug}
            partnerArtist={partnerArtist}
          />
        </Column>
      </GridColumns>
    </>
  )
}

export const PartnerArtistDetailsFragmentContainer = createFragmentContainer(
  PartnerArtistDetails,
  {
    partner: graphql`
      fragment PartnerArtistDetails_partner on Partner {
        internalID
        name
        href
      }
    `,
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
  },
)

export const PartnerArtistDetailsRenderer: React.FC<
  React.PropsWithChildren<{
    partnerId: string
    artistId: string
  }>
> = ({ partnerId, artistId, ...rest }) => {
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
            ...PartnerArtistDetails_partner
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

        if (!props?.partner?.artistsConnection?.edges?.[0] || !props?.partner) {
          return null
        }

        return (
          <PartnerArtistDetailsFragmentContainer
            {...rest}
            {...props}
            partner={props.partner}
            partnerArtist={props.partner.artistsConnection.edges[0]}
          />
        )
      }}
    />
  )
}
