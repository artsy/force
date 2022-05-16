import { FC } from "react"
import { Box, Flex, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { ChannelApp_channel } from "v2/__generated__/ChannelApp_channel.graphql"
import { ArticleAdProvider } from "../Article/Components/ArticleAd"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "v2/Components/FullBleedHeader"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ChannelArticlesPaginationContainer } from "./Components/ChannelArticles"

interface ChannelAppProps {
  channel: ChannelApp_channel
}

const ChannelApp: FC<ChannelAppProps> = ({ channel }) => {
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
                    color="rgba(255, 255, 255, 0.8)"
                    as="h2"
                  >
                    {channel.tagline}
                  </Text>
                )}
              </Box>

              {channel.links.length > 0 && (
                <Text
                  variant="xs"
                  textTransform="uppercase"
                  display="flex"
                  mt={[4, 0]}
                >
                  <Join separator={<Spacer ml={1} />}>
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
          <Spacer mt={4} />

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

      <Spacer mt={4} />

      <Text variant="lg-display">Latest Articles</Text>

      <Spacer mt={4} />

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
