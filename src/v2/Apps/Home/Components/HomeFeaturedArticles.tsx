import {
  Box,
  Image,
  Text,
  Spacer,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Shelf,
} from "@artsy/palette"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { HomeFeaturedArticlesQuery } from "v2/__generated__/HomeFeaturedArticlesQuery.graphql"
import { HomeFeaturedArticles_articles } from "v2/__generated__/HomeFeaturedArticles_articles.graphql"

interface HomeFeaturedArticlesProps {
  articles: HomeFeaturedArticles_articles
}

const HomeFeaturedArticles: React.FC<HomeFeaturedArticlesProps> = ({
  articles,
}) => {
  return (
    <HomeFeaturedArticlesContainer>
      <Shelf alignItems="flex-start">
        {articles.map(article => {
          const image = article.thumbnailImage?.cropped

          return (
            <RouterLink
              key={article.internalID}
              to={article.href ?? ""}
              style={{ display: "block", textDecoration: "none" }}
            >
              {image ? (
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width={325}
                  height={244}
                  lazyLoad
                  alt=""
                  style={{ display: "block" }}
                />
              ) : (
                <Box bg="black10" width={325} height={244} />
              )}

              <Spacer mt={2} />

              <Text variant="lg" width={325} pr={1}>
                {article.title}
              </Text>

              {article.author?.name && (
                <Text variant="lg" width={325} pr={1} color="black60">
                  {article.author?.name}
                </Text>
              )}

              <Spacer mt={0.5} />

              <Text variant="sm" color="black60">
                {article.publishedAt}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
    </HomeFeaturedArticlesContainer>
  )
}

const HomeFeaturedArticlesContainer: React.FC = ({ children }) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="xl">Artsy Editorial</Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/articles"
        >
          Explore Editorial
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

export const HomeFeaturedArticlesFragmentContainer = createFragmentContainer(
  HomeFeaturedArticles,
  {
    articles: graphql`
      fragment HomeFeaturedArticles_articles on Article @relay(plural: true) {
        internalID
        href
        title
        publishedAt(format: "MMM D YYYY")
        thumbnailImage {
          cropped(width: 325, height: 244) {
            src
            srcSet
          }
        }
        author {
          name
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <HomeFeaturedArticlesContainer>
    <Skeleton>
      <Shelf>
        {[...new Array(8)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox width={325} height={244} />

              <Spacer mt={2} />

              <SkeletonText variant="lg" width={325}>
                Article Title Which Is Often Two Lines
              </SkeletonText>

              <Spacer mt={0.5} />

              <SkeletonText variant="md">June 23, 2021</SkeletonText>
            </React.Fragment>
          )
        })}
      </Shelf>
    </Skeleton>
  </HomeFeaturedArticlesContainer>
)

export const HomeFeaturedArticlesQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedArticlesQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedArticlesQuery {
          articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {
            ...HomeFeaturedArticles_articles
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.articles) {
          return (
            <HomeFeaturedArticlesFragmentContainer
              articles={compact(props.articles)}
            />
          )
        }

        return null
      }}
    />
  )
}

export const HomeFeaturedArticlesLazyQueryRenderer: React.FC = () => {
  const { Waypoint, isEnteredView } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      {isEnteredView ? <HomeFeaturedArticlesQueryRenderer /> : PLACEHOLDER}
    </>
  )
}
