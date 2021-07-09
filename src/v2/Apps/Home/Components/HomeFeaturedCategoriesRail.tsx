import {
  Box,
  Column,
  Flex,
  Image,
  GridColumns,
  ResponsiveBox,
  Spacer,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { cropped } from "v2/Utils/resized"
import { HomeFeaturedCategoriesRail_marketingCollections } from "v2/__generated__/HomeFeaturedCategoriesRail_marketingCollections.graphql"
import { HomeFeaturedCategoriesRailQuery } from "v2/__generated__/HomeFeaturedCategoriesRailQuery.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"

interface HomeFeaturedCategoriesRailProps {
  marketingCollections: HomeFeaturedCategoriesRail_marketingCollections
}

export const HomeFeaturedCategoriesRail: React.FC<HomeFeaturedCategoriesRailProps> = ({
  marketingCollections,
}) => {
  if (marketingCollections.length === 0) return null

  return (
    <GridColumns gridRowGap={4}>
      {marketingCollections.map(collection => {
        const image = collection.thumbnail
          ? cropped(collection.thumbnail, {
              width: 290,
              height: 193,
            })
          : null

        return (
          <Column key={collection.slug} span={[6, 4, 2]}>
            <RouterLink
              to={`/collection/${collection.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
              }}
            >
              <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%">
                {image ? (
                  <Image
                    src={image.src}
                    srcSet={image.srcSet}
                    width="100%"
                    height="100%"
                    lazyLoad
                    alt=""
                    style={{ display: "block" }}
                  />
                ) : (
                  <Box width="100%" height="100%" bg="black10" />
                )}
              </ResponsiveBox>

              <Spacer mt={2} />

              <Text variant="lg" mr={1}>
                {collection.title}
              </Text>

              <Spacer mt={0.5} />

              <Text variant="md" lineClamp={2} mr={1}>
                {SUBTITLES[collection.slug]}
              </Text>
            </RouterLink>
          </Column>
        )
      })}
    </GridColumns>
  )
}

export const HomeFeaturedCategoriesRailFragmentContainer = createFragmentContainer(
  HomeFeaturedCategoriesRail,
  {
    marketingCollections: graphql`
      fragment HomeFeaturedCategoriesRail_marketingCollections on MarketingCollection
        @relay(plural: true) {
        slug
        title
        thumbnail
      }
    `,
  }
)

const HomeFeaturedCategories: React.FC = ({ children }) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="xl">Featured Categories</Text>

        <Text variant="md">
          <RouterLink to="/categories">View All Categories</RouterLink>
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

const HomeFeaturedCategoriesRailPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <GridColumns gridRowGap={4}>
        {[...new Array(6)].map((_, i) => {
          return (
            <Column key={i} span={[6, 4, 2]}>
              <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%">
                <SkeletonBox width="100%" height="100%" />
              </ResponsiveBox>

              <Spacer mt={2} />

              <SkeletonText variant="lg">Collection Title</SkeletonText>

              <Spacer mt={0.5} />

              <SkeletonText variant="md" lineClamp={2} mr={1}>
                Collection description which happens to be longer.
              </SkeletonText>
            </Column>
          )
        })}
      </GridColumns>
    </Skeleton>
  )
}

const PLACEHOLDER = (
  <HomeFeaturedCategories>
    <HomeFeaturedCategoriesRailPlaceholder />
  </HomeFeaturedCategories>
)

export const HomeFeaturedCategoriesRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedCategoriesRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedCategoriesRailQuery {
          marketingHubCollections {
            ...HomeFeaturedCategoriesRail_marketingCollections
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

        if (props.marketingHubCollections) {
          return (
            <HomeFeaturedCategories>
              <HomeFeaturedCategoriesRailFragmentContainer
                marketingCollections={props.marketingHubCollections}
              />
            </HomeFeaturedCategories>
          )
        }

        return null
      }}
    />
  )
}

const SUBTITLES = {
  contemporary: "Today’s leading artists and emerging talents",
  "post-war": "From Abstract Expressionism to Pop Art",
  "impressionist-and-modern": "The birth of abstraction, Surrealism, and Dada",
  "pre-20th-century": "Ancient Rome, the Renaissance, Baroque, and more",
  photography: "Through the lens—from daguerreotypes to digital",
  "street-art": "The rise of graffiti, vinyl toys, and skate culture",
}
