import { Box, Link, Spacer, Text, themeProps } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamily_geneFamily } from "v2/__generated__/GeneFamily_geneFamily.graphql"
import { sortBy } from "lodash"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
interface GeneFamilyProps {
  geneFamily: GeneFamily_geneFamily
}

type Genes = GeneFamily_geneFamily["genes"]

const alphabetizeGenes = (genes: Genes): Genes =>
  sortBy(genes, gene => gene?.displayName || gene?.name)

export const GeneFamily: React.FC<GeneFamilyProps> = props => {
  const { geneFamily } = props
  const { name, genes } = geneFamily
  const sortedGenes = alphabetizeGenes(genes)

  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  return (
    <Box id={`jump--${geneFamily.slug}`}>
      <Text variant="xl">{name}</Text>
      <Spacer mt={4} />
      <ul style={{ columnCount: isMobile ? 1 : 3 }}>
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
      </ul>
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
        id
        displayName
        name
        slug
      }
      featuredGeneLinks {
        href
        title
        image {
          url(version: "large_rectangle")
        }
      }
    }
  `,
})
