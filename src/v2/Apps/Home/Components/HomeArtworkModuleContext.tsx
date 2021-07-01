import { Box, BaseTabs, BaseTab, Spacer, Text, Flex } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeArtworkModuleContext_context } from "v2/__generated__/HomeArtworkModuleContext_context.graphql"

interface HomeArtworkModuleContextProps {
  title?: string | null
  context: HomeArtworkModuleContext_context | null
}

const HomeArtworkModuleContext: React.FC<HomeArtworkModuleContextProps> = ({
  title,
  context,
}) => {
  if (!context && !title) return null

  if (!context) {
    return <Text variant="lg">{title}</Text>
  }

  switch (context.__typename) {
    case "Fair": {
      return (
        <Flex justifyContent="space-between">
          <Box>
            <Text
              variant="lg"
              as={RouterLink}
              // @ts-ignore
              to={context.href}
              noUnderline
            >
              {title}
            </Text>

            <Text variant="lg" color="black60">
              {context.exhibitionPeriod}
            </Text>
          </Box>

          <Text
            variant="sm"
            as={RouterLink}
            // @ts-ignore
            to={context.href}
            ml={1}
          >
            View all
          </Text>
        </Flex>
      )
    }

    case "Sale": {
      return (
        <Flex justifyContent="space-between">
          <Box>
            <Text
              variant="lg"
              as={RouterLink}
              // @ts-ignore
              to={context.href}
              noUnderline
            >
              {title}
            </Text>

            <Text variant="lg" color="black60">
              {context.liveStartAt
                ? `Live bidding starts ${context.liveStartAt}`
                : `${context.startAt} – ${context.endAt}`}
            </Text>
          </Box>

          <Text
            variant="sm"
            as={RouterLink}
            // @ts-ignore
            to={context.href}
            ml={1}
          >
            View all
          </Text>
        </Flex>
      )
    }

    case "Gene": {
      return (
        <Flex justifyContent="space-between">
          <Text
            variant="lg"
            as={RouterLink}
            // @ts-ignore
            to={context.href}
            noUnderline
          >
            {title}
          </Text>

          <Text
            variant="sm"
            as={RouterLink}
            // @ts-ignore
            to={context.href}
            ml={1}
          >
            View all
          </Text>
        </Flex>
      )
    }

    case "HomePageRelatedArtistArtworkModule": {
      return (
        <>
          {context.basedOn && (
            <Text variant="xs" textTransform="uppercase">
              Based on{" "}
              <RouterLink to={context.basedOn.href ?? ""} noUnderline>
                {context.basedOn.name}
              </RouterLink>
            </Text>
          )}

          <Text
            variant="lg"
            as={RouterLink}
            // @ts-ignore
            to={context.artist?.href}
            noUnderline
          >
            {context.artist?.name ?? title}
          </Text>
        </>
      )
    }

    case "HomePageFollowedArtistArtworkModule": {
      return (
        <Text
          variant="lg"
          as={RouterLink}
          // @ts-ignore
          to={context.href}
          noUnderline
        >
          {title}
        </Text>
      )
    }

    case "FollowArtists":
    case "TrendingArtists": {
      return (
        <>
          <Flex justifyContent="space-between">
            <Text
              variant="xl"
              as={RouterLink}
              // @ts-ignore
              to="/works-for-you"
              noUnderline
            >
              {title}
            </Text>

            <Text
              variant="sm"
              as={RouterLink}
              // @ts-ignore
              to="/works-for-you"
              ml={1}
            >
              View all
            </Text>
          </Flex>

          <Spacer mt={4} />

          <BaseTabs>
            {(context.artists ?? []).map((artist, i) => {
              if (!artist || !artist.href) return <></>

              return (
                <BaseTab
                  key={artist.href}
                  as={RouterLink}
                  // @ts-ignore
                  to={artist.href}
                >
                  {artist.name}
                </BaseTab>
              )
            })}
          </BaseTabs>
        </>
      )
    }

    default:
      return <Text variant="lg">{title}</Text>
  }
}

export const HomeArtworkModuleContextFragmentContainer = createFragmentContainer(
  HomeArtworkModuleContext,
  {
    context: graphql`
      fragment HomeArtworkModuleContext_context on HomePageArtworkModuleContext {
        __typename
        ... on Sale {
          href
          liveStartAt(format: "MMM D")
          startAt(format: "MMM D")
          endAt(format: "MMM D")
        }
        ... on Fair {
          href
          exhibitionPeriod
        }
        ... on Gene {
          href
        }
        ... on HomePageRelatedArtistArtworkModule {
          artist {
            name
            href
          }
          basedOn {
            name
            href
          }
        }
        ... on HomePageFollowedArtistArtworkModule {
          artist {
            href
          }
        }
        ... on TrendingArtists {
          artists {
            href
            name
          }
        }
        ... on FollowArtists {
          artists {
            href
            name
          }
        }
      }
    `,
  }
)
