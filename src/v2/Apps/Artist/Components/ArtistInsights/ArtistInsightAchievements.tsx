import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  Clickable,
  Column,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { ArtistInsightAchievements_artist } from "v2/__generated__/ArtistInsightAchievements_artist.graphql"
interface ArtistInsightAchievementsProps {
  artist: ArtistInsightAchievements_artist
}

interface ArtistAchievementProps {
  label: string
  entities: readonly string[]
}

const ArtistAchievement: FC<ArtistAchievementProps> = ({ label, entities }) => {
  const [expanded, setExpanded] = useState(false)

  const [first, ...remaining] = entities

  return (
    <Box>
      <Text variant="sm" color="black100">
        {label}
      </Text>

      <Box>
        <Text
          variant="sm"
          color="black60"
          data-testid="expandable-dropdownlist"
        >
          {entities.length > 1 ? `${first}, and ` : `${first}`}
          {expanded ? (
            `${remaining.join(", ")}`
          ) : (
            <Clickable
              onClick={() => setExpanded(true)}
              color="black100"
              textDecoration="underline"
            >
              {remaining.length} more
            </Clickable>
          )}
        </Text>
      </Box>
    </Box>
  )
}

export const ArtistInsightAchievements: FC<ArtistInsightAchievementsProps> = ({
  artist,
}) => {
  if (!artist.insightsList) {
    return null
  }

  return (
    <>
      <Text variant="lg">Career Highlights</Text>
      <Spacer mb={4} />
      <GridColumns>
        {artist.insightsList.map(insight => {
          return (
            <Column key={insight.label} span={6}>
              <ArtistAchievement
                label={insight.label}
                entities={insight.entities}
              />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ArtistInsightAchievementsFragmentContainer = createFragmentContainer(
  ArtistInsightAchievements,
  {
    artist: graphql`
      fragment ArtistInsightAchievements_artist on Artist {
        slug
        insightsList: insights(
          kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]
        ) {
          type
          label
          entities
          kind
          description
        }
      }
    `,
  }
)
