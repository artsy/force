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
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { EntityTooltipGeneQuery } from "v2/__generated__/EntityTooltipGeneQuery.graphql"
import { EntityTooltipGene_gene } from "v2/__generated__/EntityTooltipGene_gene.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { EntityHeaderGeneFragmentContainer } from "../EntityHeaders/EntityHeaderGene"

interface EntityTooltipGeneProps {
  gene: EntityTooltipGene_gene
}

const EntityTooltipGene: FC<EntityTooltipGeneProps> = ({ gene }) => {
  const image = gene.image?.cropped

  return (
    <Box p={2} width={300}>
      {image && (
        <RouterLink to={gene.href} display="block">
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt=""
            lazyLoad
            mb={2}
          />
        </RouterLink>
      )}

      <EntityHeaderGeneFragmentContainer
        gene={gene}
        displayAvatar={false}
        alignItems="flex-start"
      />

      {gene.description && (
        <RouterLink to={gene.href} display="block" textDecoration="none" mt={1}>
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

      <SkeletonText variant="md">Gene Name</SkeletonText>

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
