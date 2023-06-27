import {
  Box,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Join,
  ResponsiveBox,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import styled from "styled-components"
import { FC, Fragment } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ArticleInfiniteScrollQuery } from "__generated__/ArticleInfiniteScrollQuery.graphql"
import { ArticleBodyFragmentContainer } from "./ArticleBody"
import { ArticleVerticalRelatedArticlesQueryRenderer } from "./ArticleVerticalRelatedArticles"
import { ArticleInfiniteScroll_viewer$data } from "__generated__/ArticleInfiniteScroll_viewer.graphql"
import { useMode } from "Utils/Hooks/useMode"
import { themeGet } from "@styled-system/theme-get"
import { ArticleVisibilityMetadataFragmentContainer } from "./ArticleVisibilityMetadata"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"

interface ArticleInfiniteScrollProps {
  viewer: ArticleInfiniteScroll_viewer$data
  relay: RelayPaginationProp
}

export const ArticleInfiniteScroll: FC<ArticleInfiniteScrollProps> = ({
  viewer,
  relay,
}) => {
  const articles = extractNodes(viewer.articlesConnection)

  const [mode, setMode] = useMode<"Pending" | "Loading">("Pending")

  const handleNext = () => {
    setMode("Loading")

    relay.loadMore(1, error => {
      if (error) {
        console.error(error)
      }

      setMode("Pending")
    })
  }

  return (
    <>
      <Spacer y={4} />

      <Join separator={<Spacer y={4} />}>
        {articles.map(article => {
          return (
            <Fragment key={article.internalID}>
              <ArticleVisibilityMetadataFragmentContainer article={article}>
                <ArticleBodyFragmentContainer article={article} />
              </ArticleVisibilityMetadataFragmentContainer>

              <FullBleed>
                <Separator />
              </FullBleed>

              <ArticleVerticalRelatedArticlesQueryRenderer
                id={article.internalID}
              />

              <InfiniteScrollSentinel onNext={handleNext} />
            </Fragment>
          )
        })}
      </Join>

      {mode === "Loading" && <ArticleInfiniteScrollPlaceholder />}
    </>
  )
}

const ARTICLE_NEXT_QUERY = graphql`
  query ArticleInfiniteScrollQuery(
    $after: String
    $channelID: String!
    $articleID: String!
  ) {
    viewer {
      ...ArticleInfiniteScroll_viewer
        @arguments(after: $after, channelID: $channelID, articleID: $articleID)
    }
  }
`

export const ArticleInfiniteScrollPaginationContainer = createPaginationContainer(
  ArticleInfiniteScroll,
  {
    viewer: graphql`
      fragment ArticleInfiniteScroll_viewer on Viewer
        @argumentDefinitions(
          after: { type: "String" }
          channelID: { type: "String!" }
          articleID: { type: "String!" }
        ) {
        articlesConnection(
          first: 1
          after: $after
          channelId: $channelID
          omit: [$articleID]
          sort: PUBLISHED_AT_DESC
          layout: STANDARD
        ) @connection(key: "ArticleInfiniteScroll_articlesConnection") {
          edges {
            node {
              ...ArticleBody_article
              ...ArticleVisibilityMetadata_article
              internalID
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return { ...fragmentVariables, count, after: cursor }
    },
    query: ARTICLE_NEXT_QUERY,
  }
)

interface ArticleInfiniteScrollQueryRendererProps {
  articleID: string
  channelID: string
}

export const ArticleInfiniteScrollQueryRenderer: FC<ArticleInfiniteScrollQueryRendererProps> = ({
  articleID,
  channelID,
}) => {
  return (
    // Disable scroll anchoring for infinite article scroll
    // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor/Guide_to_scroll_anchoring
    <div style={{ overflowAnchor: "none" }}>
      <SystemQueryRenderer<ArticleInfiniteScrollQuery>
        lazyLoad
        placeholder={<ArticleInfiniteScrollPlaceholder />}
        variables={{ articleID, channelID }}
        query={ARTICLE_NEXT_QUERY}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }

          if (!props?.viewer) {
            return <ArticleInfiniteScrollPlaceholder />
          }

          return (
            <ArticleInfiniteScrollPaginationContainer viewer={props.viewer} />
          )
        }}
      />
    </div>
  )
}

const ArticleInfiniteScrollPlaceholder: FC = () => {
  return (
    <>
      <FullBleed bg="black5" p={1}>
        <ResponsiveBox
          aspectWidth={970}
          aspectHeight={250}
          maxWidth={970}
          maxHeight={250}
          mx="auto"
        >
          <SkeletonBox width="100%" height="100%" />
        </ResponsiveBox>

        <SkeletonText variant="xs" textAlign="center" mx="auto" mt={1}>
          Advertisement
        </SkeletonText>
      </FullBleed>

      <Spacer y={4} />

      <Skeleton>
        <SkeletonText variant="xs" mb={1}>
          Vertical
        </SkeletonText>

        <SkeletonText variant="xxl">The Article Title</SkeletonText>

        <SkeletonText variant="xxl">Artsy Editors</SkeletonText>

        <Spacer y={4} />

        <GridColumns gridRowGap={4}>
          <Column span={[12, 8, 8, 6]}>
            <SkeletonText variant="xs">Jan 01, 0000 00:00PM</SkeletonText>

            <Spacer y={4} />

            <FadeOut>
              <ResponsiveBox aspectWidth={16} aspectHeight={9} maxWidth="100%">
                <SkeletonBox width="100%" height="100%" />
              </ResponsiveBox>
            </FadeOut>
          </Column>

          <Column span={4}>
            <SkeletonText variant="lg-display" mb={2}>
              Related Stories
            </SkeletonText>

            <Join separator={<Spacer y={2} />}>
              {new Array(3).fill(0).map((_, i) => (
                <Flex key={i}>
                  <SkeletonBox width={100} height={100} mr={2} />

                  <Box>
                    <SkeletonText variant="sm-display">
                      Related Article Title
                    </SkeletonText>

                    <SkeletonText variant="xs">Artsy Editors</SkeletonText>
                  </Box>
                </Flex>
              ))}
            </Join>
          </Column>
        </GridColumns>
      </Skeleton>
    </>
  )
}

const FadeOut = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to top,
    transparent 0%,
    ${themeGet("colors.white100")} 33%
  );
`
