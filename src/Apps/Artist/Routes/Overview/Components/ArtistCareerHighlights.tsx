import {
  Box,
  Column,
  Expandable,
  GridColumns,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist$data } from "__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { RailHeader } from "Components/Rail/RailHeader"
import { ARTIST_HEADER_NUMBER_OF_INSIGHTS } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist$data
}

const ArtistCareerHighlights: FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const insights = artist.insights.slice(ARTIST_HEADER_NUMBER_OF_INSIGHTS)

  if (insights.length === 0) {
    return null
  }

  return (
    <Box display="flex" gap={4} flexDirection="column">
      <RailHeader
        title="Highlights and Achievements Continued"
        viewAllHref={`${artist.href}/cv`}
        viewAllLabel="View CV"
      />

      <GridColumns gridRowGap={0} gridColumnGap={[0, 4]}>
        <Column span={4} start={9}>
          {insights.map((insight, index) => {
            return (
              <Expandable
                key={insight.kind ?? index}
                label={insight.label}
                pb={1}
              >
                <Text variant="xs">
                  {insight.entities.length > 0
                    ? insight.entities
                        .join(", ")
                        .replace(/,\s([^,]+)$/, ", and $1")
                    : insight.description}
                </Text>
              </Expandable>
            )
          })}
        </Column>
      </GridColumns>
    </Box>
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
          entities
          description
          label
          kind
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Box display="flex" gap={4} flexDirection="column">
    <RailHeader
      title="Highlights and Achievements Continued"
      viewAllHref="#"
      viewAllLabel="View CV"
      isLoading
    />

    <GridColumns gridRowGap={0}>
      <Column span={4} start={9}>
        {[...new Array(4)].map((_, i) => {
          return (
            <Expandable
              key={i}
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
