import { Box, Flex, Image, Shelf, Skeleton, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtistInstagramRailQuery } from "__generated__/ArtistInstagramRailQuery.graphql"
import type { ArtistInstagramRail_artist$data } from "__generated__/ArtistInstagramRail_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import mockInstagram1 from "./mockInstagramImages/mock-instagram-1.png"
import mockInstagram2 from "./mockInstagramImages/mock-instagram-2.png"
import mockInstagram3 from "./mockInstagramImages/mock-instagram-3.png"
import mockInstagram4 from "./mockInstagramImages/mock-instagram-4.png"
import mockInstagram5 from "./mockInstagramImages/mock-instagram-5.png"
import mockInstagram6 from "./mockInstagramImages/mock-instagram-6.png"
import mockInstagram7 from "./mockInstagramImages/mock-instagram-7.png"
import mockInstagram8 from "./mockInstagramImages/mock-instagram-8.png"
import mockInstagram9 from "./mockInstagramImages/mock-instagram-9.png"
import mockInstagram10 from "./mockInstagramImages/mock-instagram-10.png"

interface ArtistInstagramRailProps {
  artist: ArtistInstagramRail_artist$data
}

interface InstagramRailTile {
  internalID: string
  permalink: string | null | undefined
  caption: string | null | undefined
  src: string
  srcSet?: string
}

// TODO: Remove once the Instagram integration passes Facebook app review and
// `instagramMedia` returns live posts again. Until then we fall back to these
// colocated mock images so the rail still renders.
const MOCK_INSTAGRAM_IMAGES: string[] = [
  mockInstagram1,
  mockInstagram2,
  mockInstagram3,
  mockInstagram4,
  mockInstagram5,
  mockInstagram6,
  mockInstagram7,
  mockInstagram8,
  mockInstagram9,
  mockInstagram10,
]

const MOCK_INSTAGRAM_TILES: InstagramRailTile[] = MOCK_INSTAGRAM_IMAGES.map(
  (src, index) => {
    return {
      internalID: `mock-instagram-${index}`,
      permalink: "https://www.instagram.com/p/Da3Wck_oG7r/?hl=en&img_index=1",
      caption: "Artsy on Instagram",
      src,
    }
  },
)

const ArtistInstagramRail: React.FC<
  React.PropsWithChildren<ArtistInstagramRailProps>
> = ({ artist }) => {
  const liveMedia: InstagramRailTile[] = (artist.instagramMedia ?? [])
    .filter((item): item is NonNullable<typeof item> => !!item?.image?.cropped)
    .map(item => {
      return {
        internalID: item.internalID ?? "",
        permalink: item.permalink,
        caption: item.caption,
        src: item.image?.cropped?.src ?? "",
        srcSet: item.image?.cropped?.srcSet,
      }
    })

  const media = liveMedia.length ? liveMedia : MOCK_INSTAGRAM_TILES

  if (!media.length) {
    return null
  }

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        position="relative"
      >
        <Text variant="lg-display">Instagram</Text>
      </Flex>

      <Shelf>
        {media.map(item => {
          return (
            <a
              key={item.internalID}
              href={item.permalink ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={item.src}
                srcSet={item.srcSet}
                alt={item.caption ?? ""}
                width={300}
                height={300}
                lazyLoad
              />
            </a>
          )
        })}
      </Shelf>
    </Box>
  )
}

export const ArtistInstagramRailFragmentContainer = createFragmentContainer(
  ArtistInstagramRail,
  {
    artist: graphql`
      fragment ArtistInstagramRail_artist on Artist {
        instagramMedia(first: 20) {
          internalID
          permalink
          caption
          image {
            cropped(width: 300, height: 300) {
              src
              srcSet
            }
          }
        }
      }
    `,
  },
)

const PLACEHOLDER = (
  <Skeleton>
    <Flex mb={4}>
      <Text variant="lg-display">Instagram</Text>
    </Flex>

    <Shelf>
      {[...new Array(10)].map((_, i) => {
        return <Image key={i} width={300} height={300} src="" />
      })}
    </Shelf>
  </Skeleton>
)

export const ArtistInstagramRailQueryRenderer: React.FC<
  React.PropsWithChildren<{
    id: string
  }>
> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArtistInstagramRailQuery>
      lazyLoad
      variables={{ id }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistInstagramRailQuery($id: String!) {
          artist(id: $id) {
            ...ArtistInstagramRail_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.artist) {
          return PLACEHOLDER
        }

        return <ArtistInstagramRailFragmentContainer artist={props.artist} />
      }}
    />
  )
}
