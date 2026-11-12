import {
  ActionType,
  type ClickedCV,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Column,
  Expandable,
  GridColumns,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistAchievementsQuery } from "__generated__/ArtistAchievementsQuery.graphql"
import type { ArtistAchievements_artist$data } from "__generated__/ArtistAchievements_artist.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface AchievementItem {
  title: string
  subtitle?: string
}

interface AchievementGroup {
  id: string
  title: string
  items: AchievementItem[]
}

interface ArtistAchievementsProps {
  artist: ArtistAchievements_artist$data
}

export const ArtistAchievements: FC<ArtistAchievementsProps> = ({ artist }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const groups = getAchievementGroups(artist).filter(group => {
    return group.items.length > 0
  })

  if (groups.length === 0) {
    return null
  }

  const handleToggle = (group: AchievementGroup, isExpanded: boolean) => {
    trackEvent({
      action: ActionType.toggledAccordion,
      context_module: ContextModule.artistAchievements,
      context_owner_type: OwnerType.artist,
      subject: group.id,
      expand: isExpanded,
    })
  }

  const handleClickCV = () => {
    if (!contextPageOwnerId) return

    const payload: ClickedCV = {
      action: ActionType.clickedCV,
      context_module: ContextModule.artistAchievements,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
    }
    trackEvent(payload)
  }

  return (
    <GridColumns gridRowGap={4}>
      <Column span={[12, 5]}>
        <Text as="h2" variant="xl">
          Achievements
        </Text>
      </Column>

      <Column span={[12, 7]}>
        {groups.map(group => {
          return (
            <Expandable
              key={group.id}
              label={group.title}
              pb={1}
              onToggle={isExpanded => {
                handleToggle(group, isExpanded)
              }}
            >
              <Box pb={1}>
                {group.items.map((item, index) => {
                  return (
                    <Box key={`${item.title}-${index}`} py={0.5}>
                      <Text variant="sm">{item.title}</Text>

                      {item.subtitle && (
                        <Text variant="xs" color="mono60">
                          {item.subtitle}
                        </Text>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </Expandable>
          )
        })}

        <Text variant="sm" mt={2}>
          <RouterLink to={`${artist.href}/cv`} onClick={handleClickCV}>
            See all past shows and fair booths
          </RouterLink>
        </Text>
      </Column>
    </GridColumns>
  )
}

const getAchievementGroups = (
  artist: ArtistAchievements_artist$data,
): AchievementGroup[] => {
  const insights = artist.insights ?? []
  const groupInsights = insights.filter(insight => {
    return !!insight.kind && GROUP_INSIGHT_KINDS.includes(insight.kind)
  })
  const recognitionInsights = insights.filter(insight => {
    return !insight.kind || !GROUP_INSIGHT_KINDS.includes(insight.kind)
  })

  return [
    {
      id: "shows",
      title: "Shows",
      items: extractNodes(artist.soloShows).map(show => {
        return {
          title: show.name ?? "",
          subtitle: joinParts(
            [joinParts([show.partner?.name, show.city], ", "), show.startAt],
            " · ",
          ),
        }
      }),
    },
    {
      id: "group-exhibitions-and-institutions",
      title: "Group exhibitions & institutions",
      items: getInsightItems(groupInsights),
    },
    {
      id: "fair-presentations",
      title: "Recent fair presentations",
      items: extractNodes(artist.fairBooths).map(show => {
        return {
          title: show.fair?.name ?? show.name ?? "",
          subtitle: joinParts(
            [
              show.partner?.name ? `With ${show.partner.name}` : undefined,
              show.exhibitionPeriod,
            ],
            " · ",
          ),
        }
      }),
    },
    {
      id: "recognition",
      title: "Recognition",
      items: getInsightItems(recognitionInsights),
    },
  ]
}

const GROUP_INSIGHT_KINDS: readonly string[] = [
  "SOLO_SHOW",
  "GROUP_SHOW",
  "BIENNIAL",
  "COLLECTED",
  "PRIVATE_COLLECTIONS",
]

const getInsightItems = (
  insights: ArtistAchievements_artist$data["insights"],
): AchievementItem[] => {
  return (insights ?? []).flatMap(insight => {
    if (insight.entities.length === 0) {
      return [{ title: insight.label }]
    }

    return insight.entities.map(entity => {
      return { title: entity, subtitle: insight.label }
    })
  })
}

const joinParts = (parts: (string | null | undefined)[], separator: string) => {
  const joined = parts.filter(Boolean).join(separator)

  return joined || undefined
}

export const ArtistAchievementsFragmentContainer = createFragmentContainer(
  ArtistAchievements,
  {
    artist: graphql`
      fragment ArtistAchievements_artist on Artist {
        href
        soloShows: showsConnection(
          first: 6
          sort: START_AT_DESC
          atAFair: false
          soloShow: true
          isReference: true
          visibleToPublic: false
        ) {
          edges {
            node {
              name
              city
              startAt(format: "YYYY")
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                }
              }
            }
          }
        }
        fairBooths: showsConnection(
          first: 5
          sort: START_AT_DESC
          atAFair: true
          isReference: true
          visibleToPublic: false
        ) {
          edges {
            node {
              name
              exhibitionPeriod(format: SHORT)
              fair {
                name
              }
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                }
              }
            }
          }
        }
        insights(excludeBlanks: true) {
          kind
          label
          entities
        }
      }
    `,
  },
)

export const ArtistAchievementsPlaceholder: FC = () => {
  return (
    <GridColumns gridRowGap={4}>
      <Column span={[12, 5]}>
        <SkeletonText variant="xl">Achievements</SkeletonText>
      </Column>

      <Column span={[12, 7]}>
        {[...new Array(4)].map((_, index) => {
          return (
            <Expandable
              key={index}
              label={
                <SkeletonText variant="sm-display">Example Label</SkeletonText>
              }
              pb={1}
              disabled
            >
              <></>
            </Expandable>
          )
        })}
      </Column>
    </GridColumns>
  )
}

export const ArtistAchievementsQueryRenderer: FC<{ id: string }> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArtistAchievementsQuery>
      lazyLoad
      variables={{ id }}
      placeholder={<ArtistAchievementsPlaceholder />}
      query={graphql`
        query ArtistAchievementsQuery($id: String!) {
          artist(id: $id) {
            ...ArtistAchievements_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <ArtistAchievementsPlaceholder />
        }

        if (!props.artist) {
          return null
        }

        return <ArtistAchievementsFragmentContainer artist={props.artist} />
      }}
    />
  )
}
