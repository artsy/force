import { Box } from "@artsy/palette"
import { FC } from "react"
import styled from "styled-components"
import { EntityTooltipArtistQueryRenderer } from "./EntityTooltipArtist"
import { EntityTooltipGeneQueryRenderer } from "./EntityTooltipGene"
import { EntityTooltipPartnerQueryRenderer } from "./EntityTooltipPartner"

export const SUPPORTED_ENTITIES = ["artist", "partner", "gene"] as const
export type Entity = typeof SUPPORTED_ENTITIES[number]

interface EntityTooltipProps {
  entity: Entity
  id: string
}

export const EntityTooltip: FC<EntityTooltipProps> = ({ entity, id }) => {
  switch (entity) {
    case "artist":
      return <EntityTooltipArtistQueryRenderer id={id} />

    case "partner":
      return <EntityTooltipPartnerQueryRenderer id={id} />

    case "gene":
      return <EntityTooltipGeneQueryRenderer id={id} />
  }
}

export const isEntity = (token: string): token is Entity => {
  return SUPPORTED_ENTITIES.includes(token as Entity)
}

export const EntityTooltipHighlight = styled(Box)`
  > a {
    position: relative;
    text-decoration: none;

    &:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      height: 0;
      width: 100%;
      margin-top: -0.25em;
      border-bottom: 2px dotted currentColor;
      z-index: -1;
    }
  }
`
