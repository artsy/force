import {
  Box,
  Column,
  Expandable,
  GridColumns,
  SkeletonText,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist$data } from "__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { RailHeader } from "Components/Rail/RailHeader"
import { ARTIST_HEADER_NUMBER_OF_INSIGHTS } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { ArtistCareerHighlightFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlight"
import { Media } from "Utils/Responsive"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist$data
}

const ArtistCareerHighlights: FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const insights = artist.insights.slice(ARTIST_HEADER_NUMBER_OF_INSIGHTS)
  const numOfColumns = insights.length > 4 ? 2 : 1
  const mid = Math.ceil(insights.length / 2)
  const columns =
    numOfColumns === 2
      ? [insights.slice(0, mid), insights.slice(mid, insights.length)]
      : [insights]

  return (
    <>
      {artist.insights.length > 0 && (
        <Media at="xs">
          <Box display="flex" gap={4} flexDirection="column">
            <RailHeader
              title="Highlights and Achievements"
              viewAllHref={`${artist.href}/cv`}
              viewAllLabel="View CV"
            />

            <Box>
              {artist.insights.map((insight, index) => {
                return (
                  <ArtistCareerHighlightFragmentContainer
                    key={insight.kind ?? index}
                    insight={insight}
                  />
                )
              })}
            </Box>
          </Box>
        </Media>
      )}

      {insights.length > 0 && (
        <Media greaterThan="xs">
          <Box display="flex" gap={4} flexDirection="column">
            <RailHeader
              title="Highlights and Achievements"
              viewAllHref={`${artist.href}/cv`}
              viewAllLabel="View CV"
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
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Box display="flex" gap={4} flexDirection="column">
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

export const ArtistCareerHighlightsQueryRenderer: FC<{
  id: string
}> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArtistCareerHighlightsQuery>
      lazyLoad
      variables={{ id }}
      placeholder={PLACEHOLDER}
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
