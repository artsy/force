import { Column, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist$data } from "__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/useSystemContext"
import { ArtistInsightBadgesFragmentContainer } from "Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsFragmentContainer } from "Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsPlaceholder } from "Apps/Artist/Components/ArtistInsights/ArtistInsightAchievements"
import { ArtistInsightBadgesPlaceholder } from "Apps/Artist/Components/ArtistInsights/ArtistInsightBadges"
import { RouterLink } from "System/Router/RouterLink"
import { getENV } from "Utils/getENV"
import { useTranslation } from "react-i18next"
import { Jump } from "Utils/Hooks/useJump"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist$data
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const { t } = useTranslation()

  const { credit, partner, text } = artist.biographyBlurb!

  const showPartnerBio =
    Boolean(credit) && Boolean(text) && partner?.profile?.href

  const partnerHref = `${getENV("APP_URL")}/partner${partner?.profile?.href}`

  const displayInsightAchievements = artist.insightAchievements.length > 0
  const displayInsightBadges = artist.insightBadges.length > 0

  if (!displayInsightAchievements && !displayInsightBadges) {
    return null
  }

  return (
    <>
      {showPartnerBio && (
        <>
          <Text variant="xs" mb={1}>
            Bio
          </Text>

          <Text mb={1} variant="sm">
            <RouterLink to={partnerHref}>{credit}</RouterLink>
          </Text>

          <HTML html={text!} variant="sm" />

          <Spacer y={2} />

          <RouterLink to={`/artist/${artist.slug}/cv`}>
            {t("artistPage.overview.cvLink")}
          </RouterLink>

          <Spacer y={4} />
        </>
      )}

      <Jump id="ArtistCareerHighlights">
        <GridColumns gridRowGap={4}>
          {displayInsightAchievements && (
            <Column span={6}>
              <ArtistInsightAchievementsFragmentContainer artist={artist} />
            </Column>
          )}

          {displayInsightBadges && (
            <Column span={6}>
              <ArtistInsightBadgesFragmentContainer artist={artist} />
            </Column>
          )}
        </GridColumns>
      </Jump>
    </>
  )
}

export const ArtistCareerHighlightsFragmentContainer = createFragmentContainer(
  ArtistCareerHighlights,
  {
    artist: graphql`
      fragment ArtistCareerHighlights_artist on Artist {
        ...ArtistInsightBadges_artist
        ...ArtistInsightAchievements_artist
        insightAchievements: insights(
          kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]
        ) {
          __typename
        }
        insightBadges: insights(
          kind: [
            ACTIVE_SECONDARY_MARKET
            HIGH_AUCTION_RECORD
            ARTSY_VANGUARD_YEAR
            CRITICALLY_ACCLAIMED
          ]
        ) {
          __typename
        }
        artistHighlights: highlights {
          partnersConnection(first: 1, partnerCategory: ["blue-chip"]) {
            edges {
              node {
                __typename
              }
            }
          }
        }
        biographyBlurb(format: HTML, partnerBio: false) {
          partner {
            profile {
              href
            }
          }
          credit
          text
        }
        slug
      }
    `,
  }
)

const PLACEHOLDER = (
  <GridColumns gridRowGap={4}>
    <Column span={6}>
      <ArtistInsightAchievementsPlaceholder />
    </Column>
    <Column span={6}>
      <ArtistInsightBadgesPlaceholder />
    </Column>
  </GridColumns>
)

export const ArtistCareerHighlightsQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtistCareerHighlightsQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistCareerHighlightsQuery($slug: String!) {
          artist(id: $slug) {
            ...ArtistCareerHighlights_artist
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
          return (
            <ArtistCareerHighlightsFragmentContainer artist={props.artist} />
          )
        }
      }}
    />
  )
}
