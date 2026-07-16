import { Box, Flex, Image, Shelf, Skeleton, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtistInstagramRailQuery } from "__generated__/ArtistInstagramRailQuery.graphql"
import type { ArtistInstagramRail_artist$data } from "__generated__/ArtistInstagramRail_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistInstagramRailProps {
  artist: ArtistInstagramRail_artist$data
}

const ArtistInstagramRail: React.FC<
  React.PropsWithChildren<ArtistInstagramRailProps>
> = ({ artist }) => {
  const media = (artist.instagramMedia ?? []).filter(
    (item): item is NonNullable<typeof item> => !!item?.image?.cropped,
  )

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
          const cropped = item.image?.cropped

          return (
            <a
              key={item.internalID}
              href={item.permalink ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={cropped?.src}
                srcSet={cropped?.srcSet}
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
