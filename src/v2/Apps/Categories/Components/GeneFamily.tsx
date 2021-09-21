import { Box, Image, Link, Spacer, Text, themeProps } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamily_geneFamily } from "v2/__generated__/GeneFamily_geneFamily.graphql"
import { sortBy } from "lodash"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
interface GeneFamilyProps {
  geneFamily: GeneFamily_geneFamily
}

type Genes = GeneFamily_geneFamily["genes"]
type Gene = NonNullable<NonNullable<Genes>[number]>
interface GeneWithImage extends Gene {
  imageUrl?: string
}

const alphabetizeGenes = (genes: GeneWithImage[]): GeneWithImage[] =>
  sortBy(genes, gene => gene?.displayName || gene?.name)

export const GeneFamily: React.FC<GeneFamilyProps> = props => {
  const { geneFamily } = props
  const { name, genes, featuredGeneLinks } = geneFamily
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  // Type narrowing
  if (genes === null) {
    return null
  }

  // We want to render "featured genes" with images + larger titles.
  // Iterate through all genes, checking if they match any of our "featured
  // genes". If they do, add the image from the featuredGene
  const genesWithImages: GeneWithImage[] = genes?.map(gene => {
    let geneWithImage
    featuredGeneLinks?.map(featuredGene => {
      if (featuredGene?.href === gene?.href) {
        geneWithImage = { ...gene, imageUrl: featuredGene?.image?.url }
      }
    })
    return geneWithImage ?? gene
  })

  const publishedGenes = genesWithImages.filter(g => g.isPublished)
  const sortedGenes = alphabetizeGenes(publishedGenes)

  return (
    <Box id={`jump--${geneFamily.slug}`}>
      <Text variant="xl">{name}</Text>
      <Spacer mt={4} />
      <ul style={{ columnCount: isMobile ? 1 : 3 }}>
        {sortedGenes?.map(gene => {
          return (
            <Box key={gene?.id}>
              <Link href={`/gene/${gene?.slug}`} noUnderline={true}>
                {/* If we added an image to the gene earlier, it's featured */}
                {gene?.imageUrl ? (
                  <Box display="inline-block">
                    <Box height={200} width="100%" overflow="hidden">
                      <Image src={gene?.imageUrl} lazyLoad />
                    </Box>
                    <Text variant="lg">{gene?.displayName || gene?.name}</Text>
                  </Box>
                ) : (
                  <Text variant="md">{gene?.displayName || gene?.name}</Text>
                )}
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
      featuredGeneLinks {
        href
        title
        image {
          resized(height: 400) {
            src
            srcSet
          }
          url(version: "large_rectangle")
        }
      }
      genes {
        displayName
        href
        id
        name
        slug
        isPublished
      }
      id
      name
      slug
    }
  `,
})
