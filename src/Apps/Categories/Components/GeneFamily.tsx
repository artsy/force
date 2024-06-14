import { Box, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamily_geneFamily$data } from "__generated__/GeneFamily_geneFamily.graphql"
import { sortBy } from "lodash"
import { Masonry } from "Components/Masonry"
import { RouterLink } from "System/Components/RouterLink"
import { Jump } from "Utils/Hooks/useJump"

interface GeneFamilyProps {
  geneFamily: GeneFamily_geneFamily$data
}

export const GeneFamily: React.FC<GeneFamilyProps> = ({ geneFamily }) => {
  const { name, genes } = geneFamily

  if (!genes) {
    return null
  }

  const publishedGenes = genes.filter(g => !!g && g.isPublished)
  const sortedGenes = sortBy(
    publishedGenes,
    gene => gene?.displayName || gene?.name
  )

  return (
    <Jump id={geneFamily.slug}>
      <Text as="h2" variant="xl">
        {name}
      </Text>

      <Spacer y={4} />

      <Masonry columnCount={[1, 3]}>
        {sortedGenes?.map(gene => {
          return (
            <Box key={gene?.id}>
              <RouterLink to={`/gene/${gene?.slug}`} textDecoration="none">
                <Text variant="sm-display">
                  {gene?.displayName || gene?.name}
                </Text>
              </RouterLink>
              <Spacer y={1} />
            </Box>
          )
        })}
      </Masonry>
    </Jump>
  )
}

export const GeneFamilyFragmentContainer = createFragmentContainer(GeneFamily, {
  geneFamily: graphql`
    fragment GeneFamily_geneFamily on GeneFamily {
      id
      slug
      name
      genes {
        isPublished
        id
        displayName
        name
        slug
      }
    }
  `,
})
