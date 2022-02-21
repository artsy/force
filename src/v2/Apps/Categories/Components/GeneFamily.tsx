import { Box, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamily_geneFamily$data } from "v2/__generated__/GeneFamily_geneFamily.graphql"
import { sortBy } from "lodash"
import { Masonry } from "v2/Components/Masonry"
import { RouterLink } from "v2/System/Router/RouterLink"
interface GeneFamilyProps {
  geneFamily: GeneFamily_geneFamily$data
}

type Genes = GeneFamily_geneFamily$data["genes"]

const alphabetizeGenes = (genes: Genes): Genes =>
  sortBy(genes, gene => gene?.displayName || gene?.name)

export const GeneFamily: React.FC<GeneFamilyProps> = props => {
  const { geneFamily } = props
  const { name, genes } = geneFamily

  if (!genes) {
    return null
  }

  const publishedGenes = genes.filter(g => !!g && g.isPublished)
  const sortedGenes = alphabetizeGenes(publishedGenes)

  return (
    <Box id={`jump--${geneFamily.slug}`}>
      <Text as="h2" variant="xl">
        {name}
      </Text>
      <Spacer mt={4} />
      <Masonry columnCount={[1, 3]}>
        {sortedGenes?.map(gene => {
          return (
            <Box key={gene?.id}>
              <RouterLink to={`/gene/${gene?.slug}`} textDecoration="none">
                <Text variant="md">{gene?.displayName || gene?.name}</Text>
              </RouterLink>
              <Spacer mb={1} />
            </Box>
          )
        })}
      </Masonry>
    </Box>
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
