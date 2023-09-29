import { Expandable, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlight_insight$data } from "__generated__/ArtistCareerHighlight_insight.graphql"
import styled from "styled-components"

interface ArtistCareerHighlightProps {
  insight: ArtistCareerHighlight_insight$data
}

export const ArtistCareerHighlight: FC<ArtistCareerHighlightProps> = ({
  insight,
}) => {
  return (
    <Expandable label={insight.label} pb={1}>
      <Description
        variant="sm"
        color="black60"
        pb={1}
        {...(insight.description
          ? {
              dangerouslySetInnerHTML: {
                __html: insight.description,
              },
            }
          : {
              children: insight.entities
                .join(", ")
                .replace(/,\s([^,]+)$/, ", and $1"),
            })}
      />
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
