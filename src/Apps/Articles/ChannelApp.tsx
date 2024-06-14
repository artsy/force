import { FC } from "react"
import { Box, Flex, Join, Spacer, Text, useTheme } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { ChannelApp_channel$data } from "__generated__/ChannelApp_channel.graphql"
import { ArticleAdProvider } from "Apps/Article/Components/ArticleAd/ArticleAd"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "Components/FullBleedHeader/FullBleedHeader"
import { RouterLink } from "System/Components/RouterLink"
import { ChannelArticlesPaginationContainer } from "./Components/ChannelArticles"

interface ChannelAppProps {
  channel: ChannelApp_channel$data
}

const ChannelApp: FC<ChannelAppProps> = ({ channel }) => {
  const { theme } = useTheme()

  const rgb = theme.name === "light" ? "255, 255, 255" : "0, 0, 0"

  return (
    <ArticleAdProvider>
      <MetaTags
        title={`${channel.name} | Artsy`}
        description={channel.tagline}
      />

      {channel.image?.url ? (
        <FullBleedHeader src={channel.image.url}>
          <FullBleedHeaderOverlay
            alignItems="flex-start"
            flexDirection="column"
            color="white100"
            p={4}
          >
            <Flex
              width="100%"
              flexDirection={["column", "row"]}
              alignItems={["flex-start", "flex-end"]}
              justifyContent="space-between"
            >
              <Box>
                <Text variant="xxl" as="h1">
                  {channel.name}
                </Text>

                {channel.tagline && (
                  <Text
                    variant="lg-display"
                    color={`rgba(${rgb}, 0.8)`}
                    as="h2"
                  >
                    {channel.tagline}
                  </Text>
                )}
              </Box>

              {channel.links.length > 0 && (
                <Text variant="xs" display="flex" mt={[4, 0]}>
                  <Join separator={<Spacer x={1} />}>
                    {channel.links.map(link => (
                      <RouterLink
                        key={link.url}
                        to={link.url}
                        textDecoration="none"
                      >
                        {link.text}
                      </RouterLink>
                    ))}
                  </Join>
                </Text>
              )}
            </Flex>
          </FullBleedHeaderOverlay>
        </FullBleedHeader>
      ) : (
        <>
          <Spacer y={4} />

          <Text variant="xxl" as="h1">
            {channel.name}
          </Text>

          {channel.tagline && (
            <Text variant="lg-display" as="h2">
              {channel.tagline}
            </Text>
          )}
        </>
      )}

      <Spacer y={4} />

      <Text variant="lg-display">Latest Articles</Text>

      <Spacer y={4} />

      <ChannelArticlesPaginationContainer channel={channel} />
    </ArticleAdProvider>
  )
}

export const ChannelAppFragmentContainer = createFragmentContainer(ChannelApp, {
  channel: graphql`
    fragment ChannelApp_channel on Channel {
      ...ChannelArticles_channel
      name
      tagline
      image {
        url
      }
      links {
        url
        text
      }
    }
  `,
})
