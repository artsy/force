import { Stack, Text } from "@artsy/palette"
import { ArtistHeaderEditorialItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorialItem"
import { ScrollableCardRail } from "Apps/Artist/Components/ArtistHeader/ScrollableCardRail"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistHeaderEditorial_artist$key } from "__generated__/ArtistHeaderEditorial_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistHeaderEditorialProps {
  artist: ArtistHeaderEditorial_artist$key
  showTopBorder?: boolean
}

export const ArtistHeaderEditorial: React.FC<ArtistHeaderEditorialProps> = ({
  artist: artistRef,
  showTopBorder = true,
}) => {
  const artist = useFragment(fragment, artistRef)

  const articles = extractNodes(artist.articlesConnection)
  const totalCount = artist.articlesConnection?.totalCount ?? 0

  if (articles.length === 0) return null

  return (
    <Stack gap={2}>
      <Stack
        gap={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        {...(showTopBorder && {
          borderTop: "solid 1px",
          borderColor: ["mono10", "mono60"],
        })}
        pt={2}
      >
        <Text variant="sm">Artsy Editorial Featuring {artist.name}</Text>

        {totalCount > 1 && (
          <Text
            variant="xs"
            color="mono60"
            flexShrink={0}
            textDecoration="underline"
            as={RouterLink}
            to={`${artist.href}/articles`}
          >
            View All
          </Text>
        )}
      </Stack>

      <ScrollableCardRail itemsLabel="editorial articles">
        {articles.map(article => {
          return (
            <ArtistHeaderEditorialItem
              key={article.internalID}
              article={article}
            />
          )
        })}
      </ScrollableCardRail>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistHeaderEditorial_artist on Artist {
    name
    href
    articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {
      totalCount
      edges {
        node {
          ...ArtistHeaderEditorialItem_article
          internalID
        }
      }
    }
  }
`
