import { FC } from "react"
import {
  Box,
  Image,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EntityTooltipGeneQuery } from "__generated__/EntityTooltipGeneQuery.graphql"
import { EntityTooltipGene_gene$data } from "__generated__/EntityTooltipGene_gene.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { EntityHeaderGeneFragmentContainer } from "Components/EntityHeaders/EntityHeaderGene"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"
import { ActionType, ClickedTooltip } from "@artsy/cohesion"

interface EntityTooltipGeneProps {
  gene: EntityTooltipGene_gene$data
}

const EntityTooltipGene: FC<EntityTooltipGeneProps> = ({ gene }) => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    const payload: ClickedTooltip = {
      action: ActionType.clickedTooltip,
      context_owner_id: contextPageOwnerId!,
      context_owner_slug: contextPageOwnerSlug!,
      context_owner_type: contextPageOwnerType!,
      destination_path: gene.href!,
      type: "gene",
    }

    trackEvent(payload)
  }

  const image = gene.image?.cropped

  return (
    <Box p={2} width={300}>
      {image && (
        <RouterLink to={gene.href} display="block" onClick={handleClick}>
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt=""
            lazyLoad
            mb={2}
            style={{ display: "block" }}
          />
        </RouterLink>
      )}

      <EntityHeaderGeneFragmentContainer
        gene={gene}
        displayAvatar={false}
        alignItems="flex-start"
      />

      {gene.description && (
        <RouterLink
          to={gene.href}
          display="block"
          textDecoration="none"
          mt={1}
          onClick={handleClick}
        >
          <Text variant="xs" lineClamp={3}>
            {gene.description}
          </Text>
        </RouterLink>
      )}
    </Box>
  )
}

const EntityTooltipGeneFragmentContainer = createFragmentContainer(
  EntityTooltipGene,
  {
    gene: graphql`
      fragment EntityTooltipGene_gene on Gene {
        ...EntityHeaderGene_gene
        href
        description(format: PLAIN)
        image {
          cropped(width: 260, height: 146, version: ["big_and_tall", "tall"]) {
            src
            srcSet
            height
            width
          }
        }
      }
    `,
  }
)

const EntityTooltipGenePlaceholder: FC = () => {
  return (
    <Skeleton p={2} width={300}>
      <SkeletonBox width={260} height={146} />

      <SkeletonText variant="sm-display">Gene Name</SkeletonText>

      <SkeletonText variant="xs" mt={0.5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </SkeletonText>
    </Skeleton>
  )
}

interface EntityTooltipGeneQueryRendererProps {
  id: string
}

export const EntityTooltipGeneQueryRenderer: FC<EntityTooltipGeneQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<EntityTooltipGeneQuery>
      variables={{ id }}
      query={graphql`
        query EntityTooltipGeneQuery($id: String!) {
          gene(id: $id) {
            ...EntityTooltipGene_gene
          }
        }
      `}
      placeholder={<EntityTooltipGenePlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.log(error)
          return null
        }

        if (!props?.gene) {
          return <EntityTooltipGenePlaceholder />
        }

        return <EntityTooltipGeneFragmentContainer gene={props.gene} />
      }}
    />
  )
}
