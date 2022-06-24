import { Pill, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistRelatedCategories_artist } from "v2/__generated__/ArtistRelatedCategories_artist.graphql"
import { ArtistRelatedCategoriesQuery } from "v2/__generated__/ArtistRelatedCategoriesQuery.graphql"

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

const ArtistRelatedCategoriesFragmentContainer = createFragmentContainer(
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

export const ArtistRelatedCategoriesQueryRenderer: FC<{ slug: string }> = ({
  slug,
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtistRelatedCategoriesQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      query={graphql`
        query ArtistRelatedCategoriesQuery($slug: String!) {
          artist(id: $slug) {
            ...ArtistRelatedCategories_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return null
        }

        if (!props) {
          return null
        }

        if (props.artist) {
          return (
            <ArtistRelatedCategoriesFragmentContainer artist={props.artist} />
          )
        }
      }}
    />
  )
}
