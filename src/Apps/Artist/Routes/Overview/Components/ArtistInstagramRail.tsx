import { Box, Flex, Image, Shelf, Skeleton, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtistInstagramRailQuery } from "__generated__/ArtistInstagramRailQuery.graphql"
import type { ArtistInstagramRail_artist$data } from "__generated__/ArtistInstagramRail_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"

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

const ArtistInstagramRail: React.FC<
  React.PropsWithChildren<ArtistInstagramRailProps>
> = ({ artist }) => {
  const media: InstagramRailTile[] = (artist.instagramMedia ?? [])
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

        if (!props) {
          return PLACEHOLDER
        }

        if (!props.artist) {
          return null
        }

        return <ArtistInstagramRailFragmentContainer artist={props.artist} />
      }}
    />
  )
}
