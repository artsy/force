import { Box } from "@artsy/palette"
import { FC } from "react"
import styled from "styled-components"
import { EntityTooltipArtistQueryRenderer } from "./EntityTooltipArtist"
import { EntityTooltipGeneQueryRenderer } from "./EntityTooltipGene"
import { EntityTooltipPartnerQueryRenderer } from "./EntityTooltipPartner"

const SUPPORTED_ENTITIES = ["artist", "partner", "gene"] as const
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
    text-decoration-style: dotted !important;
    text-decoration-thickness: 2px !important;
  }
`
