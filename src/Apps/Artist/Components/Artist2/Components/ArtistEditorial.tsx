import {
  type BoxProps,
  ProgressDots,
  Stack,
  Swiper,
  SwiperCell,
  SwiperRail,
  Text,
} from "@artsy/palette"
import { ArtistEditorialItem } from "Apps/Artist/Components/Artist2/Components/ArtistEditorialItem"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistEditorial_artist$key } from "__generated__/ArtistEditorial_artist.graphql"
import { type ForwardRefExoticComponent, forwardRef, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistEditorialProps {
  artist: ArtistEditorial_artist$key
}

export const ArtistEditorial: React.FC<ArtistEditorialProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  const articles = extractNodes(artist.articlesConnection)

  const [activeIndex, setActiveIndex] = useState(0)

  if (articles.length === 0) return null

  return (
    <Stack gap={2}>
      <Text variant={["sm-display", "xs"]}>
        Artsy Editorial Featuring {artist.name}
      </Text>

      <Media greaterThan="xs">
        <Stack gap={2}>
          {articles.map(article => {
            return (
              <ArtistEditorialItem key={article.internalID} article={article} />
            )
          })}
        </Stack>
      </Media>

      <Media at="xs">
        <Stack gap={1}>
          <Swiper
            snap="center"
            Cell={ArtistEditorialSwiperCell}
            Rail={ArtistEditorialSwiperRail}
            onChange={setActiveIndex}
          >
            {articles.map(article => {
              return (
                <ArtistEditorialItem
                  key={article.internalID}
                  article={article}
                />
              )
            })}
          </Swiper>

          <ProgressDots amount={articles.length} activeIndex={activeIndex} />
        </Stack>
      </Media>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistEditorial_artist on Artist {
    name
    articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {
      edges {
        node {
          internalID
          ...ArtistEditorialItem_article
        }
      }
    }
  }
`

const ArtistEditorialSwiperCell: ForwardRefExoticComponent<BoxProps> =
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

const ArtistEditorialSwiperRail: React.FC<React.PropsWithChildren> = props => {
  return <SwiperRail {...props} display="block" style={{ lineHeight: 0 }} />
}
