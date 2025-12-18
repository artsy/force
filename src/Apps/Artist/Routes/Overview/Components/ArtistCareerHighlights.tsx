import { ActionType, type ClickedCV, ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  Expandable,
  GridColumns,
  SkeletonText,
} from "@artsy/palette"
import { ARTIST_HEADER_NUMBER_OF_INSIGHTS } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { ArtistCareerHighlightFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlight"
import { RailHeader } from "Components/Rail/RailHeader"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Media } from "Utils/Responsive"
import type { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import type { ArtistCareerHighlights_artist$data } from "__generated__/ArtistCareerHighlights_artist.graphql"
import type { FC } from "react"
import { forwardRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist$data
}

const ArtistCareerHighlights: FC<
  React.PropsWithChildren<ArtistCareerHighlightsProps>
> = ({ artist }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  if (!artist || !artist.insights?.length) {
    return null
  }

  const insights = artist.insights.slice(ARTIST_HEADER_NUMBER_OF_INSIGHTS)
  const numOfColumns = insights.length > 4 ? 2 : 1
  const mid = Math.ceil(insights.length / 2)
  const columns =
    numOfColumns === 2
      ? [insights.slice(0, mid), insights.slice(mid, insights.length)]
      : [insights]

  const hasEntitiesOrDescription = artist.insights.some(insight => {
    return insight.entities.length > 0 || insight.description
  })

  const trackClickedCV = () => {
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
    <>
      {artist.insights.length > 0 && (
        <Media at="xs">
          <Box display="flex" gap={4} flexDirection="column">
            <RailHeader
              title="Highlights and Achievements"
              viewAllHref={`${artist.href}/cv`}
              viewAllLabel="View CV"
              viewAllOnClick={trackClickedCV}
            />

            <Box>
              {artist.insights.map((insight, index) => {
                return (
                  <ArtistCareerHighlightFragmentContainer
                    key={insight.kind ?? index}
                    insight={insight}
                    contextModule={ContextModule.artistAchievements}
                  />
                )
              })}
            </Box>
          </Box>
        </Media>
      )}

      {insights.length > 0 && hasEntitiesOrDescription && (
        <Media greaterThan="xs">
          <Box display="flex" gap={4} flexDirection="column">
            <RailHeader
              title="Highlights and Achievements"
              viewAllHref={`${artist.href}/cv`}
              viewAllLabel="View CV"
              viewAllOnClick={trackClickedCV}
            />
            <GridColumns gridRowGap={0}>
              {columns.map((column, index) => {
                return (
                  <Column span={6} key={index}>
                    {column.map((insight, index) => {
                      return (
                        <ArtistCareerHighlightFragmentContainer
                          key={insight.kind ?? index}
                          insight={insight}
                          contextModule={ContextModule.artistAchievements}
                        />
                      )
                    })}
                  </Column>
                )
              })}
            </GridColumns>
          </Box>
        </Media>
      )}
    </>
  )
}

export const ArtistCareerHighlightsFragmentContainer = createFragmentContainer(
  ArtistCareerHighlights,
  {
    artist: graphql`
      fragment ArtistCareerHighlights_artist on Artist {
        name
        href
        insights {
          ...ArtistCareerHighlight_insight
          kind
          entities
          description(format: HTML)
        }
      }
    `,
  },
)

export const ArtistCareerHighlightsPlaceholder = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<unknown>
>((_, forwardedRef) => {
  return (
    <Box
      ref={forwardedRef as any}
      display="flex"
      gap={4}
      flexDirection="column"
    >
      <RailHeader
        title="Highlights and Achievements"
        viewAllHref="#"
        viewAllLabel="View CV"
        isLoading
      />

      <GridColumns gridRowGap={0}>
        {[...new Array(2)].map((_, i) => {
          return (
            <Column span={6} key={i}>
              {[...new Array(5)].map((_, j) => {
                return (
                  <Expandable
                    key={[i, j].join("-")}
                    label={
                      <SkeletonText variant="sm-display">
                        Example Label
                      </SkeletonText>
                    }
                    pb={1}
                    disabled
                  >
                    <></>
                  </Expandable>
                )
              })}
            </Column>
          )
        })}
      </GridColumns>
    </Box>
  )
})

export const ArtistCareerHighlightsQueryRenderer: FC<
  React.PropsWithChildren<{
    id: string
  }>
> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArtistCareerHighlightsQuery>
      lazyLoad
      variables={{ id }}
      placeholder={<ArtistCareerHighlightsPlaceholder />}
      query={graphql`
        query ArtistCareerHighlightsQuery($id: String!) {
          artist(id: $id) {
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
          return <ArtistCareerHighlightsPlaceholder />
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
