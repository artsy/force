import { Box, Link, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamily_geneFamily } from "v2/__generated__/GeneFamily_geneFamily.graphql"
import { sortBy } from "lodash"
import { Masonry } from "v2/Components/Masonry"
interface GeneFamilyProps {
  geneFamily: GeneFamily_geneFamily
}

type Genes = GeneFamily_geneFamily["genes"]

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
      <Text variant="xl">{name}</Text>
      <Spacer mt={4} />
      <Masonry columnCount={[1, 3]}>
        {sortedGenes?.map(gene => {
          return (
            <Box key={gene?.id}>
              <Link href={`/gene/${gene?.slug}`} noUnderline={true}>
                <Text variant="md">{gene?.displayName || gene?.name}</Text>
              </Link>
              <Spacer mb={1} />
            </Box>
          )
        })}
      </Masonry>
      <Spacer mt={6} />
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
