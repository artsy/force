import { Expandable, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlight_insight$data } from "__generated__/ArtistCareerHighlight_insight.graphql"

interface ArtistCareerHighlightProps {
  insight: ArtistCareerHighlight_insight$data
}

const ArtistCareerHighlight: FC<ArtistCareerHighlightProps> = ({ insight }) => {
  return (
    <Expandable label={insight.label} pb={1}>
      <Text variant="xs">
        {insight.entities.length > 0
          ? insight.entities.join(", ").replace(/,\s([^,]+)$/, ", and $1")
          : insight.description}
      </Text>
    </Expandable>
  )
}

export const ArtistCareerHighlightFragmentContainer = createFragmentContainer(
  ArtistCareerHighlight,
  {
    insight: graphql`
      fragment ArtistCareerHighlight_insight on ArtistInsight {
        label
        entities
        description
      }
    `,
  }
)
