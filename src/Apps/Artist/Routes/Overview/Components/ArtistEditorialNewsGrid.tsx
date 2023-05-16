import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Image,
  Text,
  Flex,
  Column,
  Spacer,
} from "@artsy/palette"
import {
  ClickedArticleGroup,
  ActionType,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { GridColumns, ResponsiveBox } from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { Masonry } from "Components/Masonry"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/SystemContext"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import { take } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistEditorialNewsGrid_artist$data } from "__generated__/ArtistEditorialNewsGrid_artist.graphql"
import { ArtistEditorialNewsGridQuery } from "__generated__/artisteditorialnewsgridquery.graphql"

const ARTICLE_COUNT = 6

interface ArtistEditorialNewsGridProps {
  artist: ArtistEditorialNewsGrid_artist$data
  artworkId?: string
}

const ArtistEditorialNewsGrid: React.FC<ArtistEditorialNewsGridProps> = ({
  artist,
  artworkId,
}) => {
  const articles = extractNodes(artist.articlesConnection)
  const { trackEvent } = useTracking()

  if (articles.length === 0) {
    return null
  }
  const [firstArticle, ...restOfArticles] = articles
  const truncatedRestOfArticles = take(restOfArticles, ARTICLE_COUNT)
  const firstImage = firstArticle.thumbnailImage?.large

  return (
    <ArtistEditorialNewsContainer artist={artist}>
      <GridColumns>
        <Column span={[12, 6]} mb={[4, 0]}>
          <RouterLink
            key={firstArticle.internalID}
            to={firstArticle.href ?? ""}
            display="block"
            textDecoration="none"
            onClick={() => {
              const trackingEvent: ClickedArticleGroup = {
                action: ActionType.clickedArticleGroup,
                context_module: ContextModule.marketNews,
                context_page_owner_type: OwnerType.home,
                context_page_owner_id: firstArticle.internalID,
                context_page_owner_slug: firstArticle.slug ?? "",
                destination_page_owner_type: OwnerType.article,
                type: "thumbnail",
              }
              trackEvent(trackingEvent)
            }}
          >
            {firstImage && (
              <ResponsiveBox
                aspectWidth={firstImage.width}
                aspectHeight={firstImage.height}
                maxWidth="100%"
              >
                <Image
                  src={firstImage.src}
                  srcSet={firstImage.srcSet}
                  style={{ display: "block" }}
                  lazyLoad
                />
              </ResponsiveBox>
            )}

            <Text variant="xs" fontWeight="bold" mt={1}>
              {firstArticle.vertical}
            </Text>

            <Text variant="xl" mt={0.5}>
              {firstArticle.title}
            </Text>

            <Text variant="lg-display" mt={1}>
              By {firstArticle.byline}
            </Text>

            <Text variant="lg-display" color="black60" mt={0.5}>
              {firstArticle.publishedAt}
            </Text>
          </RouterLink>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={2}>
            {truncatedRestOfArticles.map(article => {
              return (
                <CellArticleFragmentContainer
                  key={article.internalID}
                  article={article}
                  mode="GRID"
                  mb={4}
                />
              )
            })}
          </Masonry>
        </Column>
      </GridColumns>
    </ArtistEditorialNewsContainer>
  )
}

const ArtistEditorialNewsContainer: React.FC<{
  artist: ArtistEditorialNewsGrid_artist$data
}> = ({ children, artist }) => {
  const { trackEvent } = useTracking()

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="xl">Artsy Editorial Featuring {artist.name}</Text>

        <Text
          variant="sm-display"
          textAlign="right"
          as={RouterLink}
          // @ts-ignore
          to={`/artist/${artist.slug}/articles`}
          onClick={() => {
            const trackingEvent: ClickedArticleGroup = {
              action: ActionType.clickedArticleGroup,
              context_module: ContextModule.marketNews,
              context_page_owner_type: OwnerType.home,
              destination_page_owner_type: OwnerType.articles,
              type: "viewAll",
            }
            trackEvent(trackingEvent)
          }}
        >
          View All
        </Text>
      </Flex>

      <Spacer y={4} />

      {children}
    </>
  )
}

export const ArtistEditorialNewsGridFragmentContainer = createFragmentContainer(
  ArtistEditorialNewsGrid,
  {
    artist: graphql`
      fragment ArtistEditorialNewsGrid_artist on Artist {
        internalID
        name
        slug
        articlesConnection(
          first: 10
          sort: PUBLISHED_AT_DESC
          inEditorialFeed: true
        ) {
          edges {
            node {
              ...CellArticle_article
              internalID
              href
              byline
              slug
              title
              publishedAt(format: "MMM D, YYYY")
              vertical
              thumbnailTitle
              thumbnailImage {
                large: cropped(width: 670, height: 720) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)

const mockArtist: Partial<ArtistEditorialNewsGrid_artist$data> = {
  name: "Anni and Josef Albers",
}

const PLACEHOLDER = (
  <Skeleton>
    <ArtistEditorialNewsContainer
      artist={mockArtist as ArtistEditorialNewsGrid_artist$data}
    >
      <GridColumns>
        <Column span={[12, 6]} mb={[4, 0]}>
          <Media greaterThan="xs">
            <ResponsiveBox aspectWidth={670} aspectHeight={720} maxWidth="100%">
              <SkeletonBox width="100%" height="100%" />
            </ResponsiveBox>

            <SkeletonText variant="xs" fontWeight="bold" mt={1}>
              Art Fairs
            </SkeletonText>

            <SkeletonText variant="xl" mt={0.5}>
              Essential Tips for Collecting Work by Anni and Josef Albers
            </SkeletonText>

            <SkeletonText variant="lg-display" mt={1}>
              By Artsy Editorial
            </SkeletonText>

            <SkeletonText variant="lg-display" mt={0.5}>
              Jan 1, 2000
            </SkeletonText>
          </Media>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={2}>
            {[...new Array(ARTICLE_COUNT)].map((_, i) => {
              return <CellArticlePlaceholder key={i} mode="GRID" mb={4} />
            })}
          </Masonry>
        </Column>
      </GridColumns>
    </ArtistEditorialNewsContainer>
  </Skeleton>
)

export const ArtistEditorialNewsGridQueryRenderer: React.FC<{
  id: string
  artworkId?: string
}> = ({ id, artworkId }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistEditorialNewsGridQueryRenderer">
      <SystemQueryRenderer<ArtistEditorialNewsGridQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ id }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistEditorialNewsGridQuery($id: String!) {
            artist(id: $id) {
              ...ArtistEditorialNewsGrid_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return PLACEHOLDER
          }
          if (props.artist) {
            return (
              <ArtistEditorialNewsGridFragmentContainer
                artist={props.artist}
                artworkId={artworkId}
              />
            )
          }
        }}
      />
    </Box>
  )
}
