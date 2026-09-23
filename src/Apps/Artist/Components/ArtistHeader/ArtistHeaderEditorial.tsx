import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Shelf, Stack, Text, THEME } from "@artsy/palette"
import { ArtistHeaderEditorialItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorialItem"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistHeaderEditorial_artist$key } from "__generated__/ArtistHeaderEditorial_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistHeaderEditorialProps {
  artist: ArtistHeaderEditorial_artist$key
  showTopBorder?: boolean
}

export const ArtistHeaderEditorial: React.FC<ArtistHeaderEditorialProps> = ({
  artist: artistRef,
  showTopBorder = true,
}) => {
  const artist = useFragment(fragment, artistRef)
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const articles = extractNodes(artist.articlesConnection)
  const totalCount = artist.articlesConnection?.totalCount ?? 0

  if (articles.length === 0) return null

  const handleViewAllClick = () => {
    const trackingEvent: ClickedArticleGroup = {
      action: ActionType.clickedArticleGroup,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.articles,
      destination_page_owner_id: artist.internalID,
      destination_page_owner_slug: artist.slug,
      type: "viewAll",
    }

    trackEvent(trackingEvent)
  }

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
        <Text variant="sm-display">
          Artsy Editorial Featuring {artist.name}
        </Text>

        {totalCount > 1 && (
          <Text
            variant="xs"
            color="mono60"
            flexShrink={0}
            textDecoration="underline"
            as={RouterLink}
            to={`${artist.href}/articles`}
            onClick={handleViewAllClick}
          >
            View All
          </Text>
        )}
      </Stack>

      <Shelf alignItems="stretch" gap={1} fullBleed={!!isMobile}>
        {articles.map(article => {
          return (
            <ArtistHeaderEditorialItem
              key={article.internalID}
              article={article}
            />
          )
        })}
      </Shelf>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistHeaderEditorial_artist on Artist {
    internalID
    slug
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
