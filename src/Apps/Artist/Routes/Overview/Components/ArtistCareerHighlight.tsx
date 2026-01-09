import { ActionType, type ContextModule, OwnerType } from "@artsy/cohesion"
import { Expandable, Text } from "@artsy/palette"
import type { ArtistCareerHighlight_insight$data } from "__generated__/ArtistCareerHighlight_insight.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"

interface ArtistCareerHighlightProps {
  insight: ArtistCareerHighlight_insight$data
  contextModule: ContextModule
  expanded?: boolean
}

export const ArtistCareerHighlight: FC<
  React.PropsWithChildren<ArtistCareerHighlightProps>
> = ({ insight, contextModule, expanded }) => {
  const { trackEvent } = useTracking()

  if (!insight?.description && !insight?.entities?.length) return null

  const handleToggle = (isExpanded: boolean) => {
    trackEvent({
      action: ActionType.toggledAccordion,
      context_module: contextModule,
      context_owner_type: OwnerType.artist,
      subject: insight.kind,
      expand: isExpanded,
    })
  }

  return (
    <Expandable
      label={insight.label}
      pb={1}
      onToggle={handleToggle}
      expanded={expanded}
    >
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
        kind
        label
        entities
        description(format: HTML)
      }
    `,
  },
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
