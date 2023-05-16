import { Column, Expandable, GridColumns, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist$data } from "__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/useSystemContext"
import { ArtistInsightAchievementsPlaceholder } from "Apps/Artist/Components/ArtistInsights/ArtistInsightAchievements"
import { RouterLink } from "System/Router/RouterLink"
// import { useTranslation } from "react-i18next"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist$data
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  // const { t } = useTranslation()

  const insights = artist.insights
  const hasCareerHighlights = insights.length > 0

  if (!hasCareerHighlights) {
    return null
  }

  return (
    <>
      <GridColumns gridRowGap={2} gridColumnGap={[0, 4]}>
        <Column span={6}>
          <Text variant="lg" color="black100">
            Highlights and Achievements Continued
          </Text>
        </Column>
        {hasCareerHighlights && (
          <Column span={4} start={8}>
            {insights.slice(0, 6).map((insight, index) => {
              return (
                <Expandable
                  key={insight.kind ?? index}
                  label={insight.label}
                  pb={1}
                >
                  <Text variant="xs">
                    {insight.entities.length > 0
                      ? insight.entities.join(", ")
                      : insight.description}
                  </Text>
                </Expandable>
              )
            })}
            <RouterLink inline to={`/artist/${artist.slug}/cv`}>
              View {artist.name}'s CV
            </RouterLink>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const ArtistCareerHighlightsFragmentContainer = createFragmentContainer(
  ArtistCareerHighlights,
  {
    artist: graphql`
      fragment ArtistCareerHighlights_artist on Artist {
        insights {
          entities
          description
          label
          kind
        }
        internalID
        name
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
