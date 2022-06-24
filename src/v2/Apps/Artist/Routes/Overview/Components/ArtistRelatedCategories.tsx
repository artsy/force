import { Pill, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistRelatedCategories_artist } from "v2/__generated__/ArtistRelatedCategories_artist.graphql"

interface ArtistRelatedCategoriesProps {
  artist: ArtistRelatedCategories_artist
}

const ArtistRelatedCategories: FC<ArtistRelatedCategoriesProps> = ({
  artist,
}) => {
  const categories = extractNodes(artist.related?.genes)
  return (
    <>
      <Text variant="lg-display">Related Categories</Text>

      <Spacer mt={4} />

      {categories.map(category => {
        console.log(category.name)
        console.log(category.href)

        return (
          <Pill mr={1} mb={1}>
            <RouterLink to={category.href} textDecoration="none">
              {category.name}
            </RouterLink>
          </Pill>
        )
      })}
    </>
  )
}

export const ArtistRelatedCategoriesFragmentContainer = createFragmentContainer(
  ArtistRelatedCategories,
  {
    artist: graphql`
      fragment ArtistRelatedCategories_artist on Artist {
        related {
          genes {
            edges {
              node {
                href
                name
              }
            }
          }
        }
      }
    `,
  }
)
