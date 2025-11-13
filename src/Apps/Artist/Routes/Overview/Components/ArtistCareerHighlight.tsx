import { Expandable, Text } from "@artsy/palette"
import type { ArtistCareerHighlight_insight$data } from "__generated__/ArtistCareerHighlight_insight.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ArtistCareerHighlightProps {
  insight: ArtistCareerHighlight_insight$data
}

export const ArtistCareerHighlight: FC<
  React.PropsWithChildren<ArtistCareerHighlightProps>
> = ({ insight }) => {
  if (!insight?.description && !insight?.entities?.length) return null
  return (
    <Expandable label={insight.label} pb={1}>
      <Description
        variant="sm"
        color="mono60"
        pb={1}
        {...(insight.description
          ? {
              dangerouslySetInnerHTML: {
                __html: insight.description,
              },
            }
          : {
              children: formatList(insight.entities),
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

const formatList = (entities: readonly string[]) => {
  if (entities.length === 0) return ""
  if (entities.length === 1) return entities[0]
  if (entities.length === 2) return entities.join(" and ")
  return `${entities.slice(0, -1).join(", ")}, and ${entities[entities.length - 1]}`
}

// remove paragraph margins from markdown
const Description = styled(Text)`
  p {
    margin: 0;
  }
`
