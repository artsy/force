import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Clickable,
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Text,
} from "@artsy/palette"
import type { ArtistInsightAchievements_artist$data } from "__generated__/ArtistInsightAchievements_artist.graphql"
import { type FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistInsightAchievementsProps {
  artist: ArtistInsightAchievements_artist$data
}

export const ArtistInsightAchievements: FC<
  React.PropsWithChildren<ArtistInsightAchievementsProps>
> = ({ artist }) => {
  if (artist.insightAchievements.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg-display" mb={2}>
        Career Highlights
      </Text>
      <GridColumns>
        {artist.insightAchievements.map(insight => {
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

export const ArtistInsightAchievementsFragmentContainer =
  createFragmentContainer(ArtistInsightAchievements, {
    artist: graphql`
      fragment ArtistInsightAchievements_artist on Artist {
        slug
        insightAchievements: insights(
          kind: [
            SOLO_SHOW
            GROUP_SHOW
            COLLECTED
            REVIEWED
            BIENNIAL
            AWARDS
            PRIVATE_COLLECTIONS
            RESIDENCIES
          ]
        ) {
          label
          entities
        }
      }
    `,
  })

export const ArtistInsightAchievementsPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <Text variant="lg-display" mb={2}>
        Career Highlights
      </Text>

      <GridColumns>
        <Column span={6}>
          <SkeletonText variant="sm">
            Solo show at a major institution
          </SkeletonText>

          <SkeletonText variant="sm">
            Example Exhibition Title and 10 more
          </SkeletonText>
        </Column>

        <Column span={6}>
          <SkeletonText variant="sm">
            Group show at a major institution
          </SkeletonText>

          <SkeletonText variant="sm">
            Museum of Example Art (Example), and 33 more
          </SkeletonText>
        </Column>

        <Column span={6}>
          <SkeletonText variant="sm">
            Collected by a major institution
          </SkeletonText>

          <SkeletonText variant="sm">Example, and 5 more</SkeletonText>
        </Column>
      </GridColumns>
    </Skeleton>
  )
}

interface ArtistAchievementProps {
  label: string
  entities: readonly string[]
}

const ArtistAchievement: FC<
  React.PropsWithChildren<ArtistAchievementProps>
> = ({ label, entities }) => {
  const { trackEvent } = useTracking()
  const [expanded, setExpanded] = useState(false)

  const [first, ...remaining] = entities

  return (
    <>
      <Text variant="sm" color="mono100">
        {label}
      </Text>
      <Text variant="sm" color="mono60" data-testid="expandable-dropdownlist">
        {expanded ? (
          entities.join(", ").replace(/,\s([^,]+)$/, ", and $1")
        ) : (
          <>
            {first}
            {remaining.length > 0 && (
              <>
                {`, and `}
                <Clickable
                  onClick={() => {
                    setExpanded(true)

                    trackEvent({
                      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                      subject: "Read more",
                      type: "Link",
                    })
                  }}
                  color="mono100"
                  textDecoration="underline"
                >
                  {remaining.length} more
                </Clickable>
              </>
            )}
          </>
        )}
      </Text>
    </>
  )
}
