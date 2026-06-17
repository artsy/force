import {
  ActionType,
  type ClickedGene,
  type ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistGenesRow_genes$key } from "__generated__/ArtistGenesRow_genes.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistGenesRowProps {
  genes: ArtistGenesRow_genes$key
  label: string
  contextModule: ContextModule
}

export const ArtistGenesRow: FC<ArtistGenesRowProps> = ({
  genes,
  label,
  contextModule,
}) => {
  const data = useFragment(FRAGMENT, genes)

  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  if (data.length === 0) return null

  return (
    <Flex flexDirection={["column", "column", "row"]}>
      <Box width={["auto", "auto", "6em"]}>
        <Text variant="xs">{label}</Text>
      </Box>

      <Flex flexWrap="wrap">
        {data.map(gene => {
          const handleClick = () => {
            if (!contextPageOwnerId || !contextPageOwnerSlug) return

            const payload: ClickedGene = {
              action: ActionType.clickedGene,
              context_module: contextModule,
              context_page_owner_type: contextPageOwnerType,
              context_page_owner_id: contextPageOwnerId,
              context_page_owner_slug: contextPageOwnerSlug,
              destination_page_owner_type: OwnerType.gene,
              destination_page_owner_id: gene.internalID,
              destination_page_owner_slug: gene.slug,
            }

            trackEvent(payload)
          }

          return (
            <RouterLink
              key={gene.slug}
              to={`/gene/${gene.slug}`}
              color="mono60"
              onClick={handleClick}
            >
              <Text variant="xs" mr={1}>
                {gene.name}
              </Text>
            </RouterLink>
          )
        })}
      </Flex>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment ArtistGenesRow_genes on Gene @relay(plural: true) {
    internalID
    name
    slug
  }
`
