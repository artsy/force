import { Expandable, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlight_insight$data } from "__generated__/ArtistCareerHighlight_insight.graphql"
import styled from "styled-components"

interface ArtistCareerHighlightProps {
  insight: ArtistCareerHighlight_insight$data
}

const ArtistCareerHighlight: FC<ArtistCareerHighlightProps> = ({ insight }) => {
  return (
    <Expandable label={insight.label} pb={1}>
      <Description
        variant="xs"
        dangerouslySetInnerHTML={{
          __html:
            insight.entities.length > 0
              ? insight.entities.join(", ")
              : insight.description ?? "",
        }}
      ></Description>
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
        description(format: HTML)
      }
    `,
  }
)

// remove paragraph margins from markdown
const Description = styled(Text)`
  p {
    margin: 0;
  }
`
