import {
  Box,
  type BoxProps,
  ProgressDots,
  Stack,
  Swiper,
  SwiperCell,
  SwiperRail,
  Text,
} from "@artsy/palette"
import { ArtistHeaderEditorialItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorialItem"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistHeaderEditorial_artist$key } from "__generated__/ArtistHeaderEditorial_artist.graphql"
import { type ForwardRefExoticComponent, forwardRef, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistHeaderEditorialProps {
  artist: ArtistHeaderEditorial_artist$key
}

export const ArtistHeaderEditorial: React.FC<ArtistHeaderEditorialProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  const articles = extractNodes(artist.articlesConnection)
  const totalCount = artist.articlesConnection?.totalCount ?? 0

  const [activeIndex, setActiveIndex] = useState(0)

  if (articles.length === 0) return null

  return (
    <Stack gap={2}>
      <Stack
        gap={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        borderTop="solid 1px"
        borderColor={["mono10", "mono60"]}
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
            as={RouterLink}
            to={`${artist.href}/articles`}
          >
            View All
          </Text>
        )}
      </Stack>

      <Stack gap={1}>
        <Swiper
          snap="center"
          Cell={ArtistHeaderEditorialSwiperCell}
          Rail={ArtistHeaderEditorialSwiperRail}
          initialIndex={activeIndex}
          onChange={setActiveIndex}
        >
          {articles.map(article => {
            return (
              <ArtistHeaderEditorialItem
                key={article.internalID}
                article={article}
              />
            )
          })}
        </Swiper>

        {articles.length > 1 && (
          // This component is primarily whitespace so we can neutralize
          // the height of the dots to visually balance
          <Box mb={[0, -25]}>
            <ProgressDots
              amount={articles.length}
              activeIndex={activeIndex}
              onClick={setActiveIndex}
            />
          </Box>
        )}
      </Stack>
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

const ArtistHeaderEditorialSwiperCell: ForwardRefExoticComponent<BoxProps> =
  forwardRef((props, ref) => {
    return (
      <SwiperCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        width="100%"
        pr={0}
      />
    )
  })

const ArtistHeaderEditorialSwiperRail: React.FC<
  React.PropsWithChildren
> = props => {
  return <SwiperRail {...props} display="block" style={{ lineHeight: 0 }} />
}
