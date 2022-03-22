import { FC } from "react"
import {
  Box,
  HorizontalOverflow,
  Image,
  Join,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { EntityTooltipArtistQuery } from "v2/__generated__/EntityTooltipArtistQuery.graphql"
import { EntityTooltipArtist_artist } from "v2/__generated__/EntityTooltipArtist_artist.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArtistEntityHeaderFragmentContainer } from "../EntityHeaders/ArtistEntityHeader"

interface EntityTooltipArtistProps {
  artist: EntityTooltipArtist_artist
}

const EntityTooltipArtist: FC<EntityTooltipArtistProps> = ({ artist }) => {
  const images = artist.carousel?.images ?? []

  return (
    <Box p={2} width={300}>
      {images.length > 0 && (
        <RouterLink to={artist.href} display="block">
          <HorizontalOverflow mb={2}>
            <Join separator={<Spacer ml={1} />}>
              {images.map((image, i) => {
                if (!image || !image.resized) return null
                return (
                  <Image
                    key={i}
                    src={image.resized.src}
                    srcSet={image.resized.srcSet}
                    width={image.resized.width}
                    height={image.resized.height}
                    alt=""
                    lazyLoad
                  />
                )
              })}
            </Join>
          </HorizontalOverflow>
        </RouterLink>
      )}

      <ArtistEntityHeaderFragmentContainer
        artist={artist}
        displayAvatar={false}
        alignItems="flex-start"
      />

      {artist.blurb && (
        <RouterLink
          to={artist.href}
          display="block"
          mt={1}
          textDecoration="none"
        >
          <Text variant="xs" lineClamp={3}>
            {artist.blurb}
          </Text>
        </RouterLink>
      )}
    </Box>
  )
}

const EntityTooltipArtistFragmentContainer = createFragmentContainer(
  EntityTooltipArtist,
  {
    artist: graphql`
      fragment EntityTooltipArtist_artist on Artist {
        ...ArtistEntityHeader_artist
        href
        blurb(format: PLAIN)
        carousel {
          images {
            resized(height: 100) {
              src
              srcSet
              height
              width
            }
          }
        }
      }
    `,
  }
)

const EntityTooltipArtistPlaceholder: FC = () => {
  return (
    <Skeleton p={2} width={300}>
      <HorizontalOverflow mb={2}>
        <Join separator={<Spacer ml={1} />}>
          {[...new Array(8)].map((_, i) => {
            return (
              <SkeletonBox
                key={i}
                width={[50, 100, 75, 66][i % 4]}
                height={100}
              />
            )
          })}
        </Join>
      </HorizontalOverflow>

      <SkeletonText variant="md">Artist Name</SkeletonText>

      <SkeletonText variant="xs">American, b 1900</SkeletonText>

      <SkeletonText variant="xs" mt={0.5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </SkeletonText>
    </Skeleton>
  )
}

interface EntityTooltipArtistQueryRendererProps {
  id: string
}

export const EntityTooltipArtistQueryRenderer: FC<EntityTooltipArtistQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<EntityTooltipArtistQuery>
      variables={{ id }}
      query={graphql`
        query EntityTooltipArtistQuery($id: String!) {
          artist(id: $id) {
            ...EntityTooltipArtist_artist
          }
        }
      `}
      placeholder={<EntityTooltipArtistPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.log(error)
          return null
        }

        if (!props?.artist) {
          return <EntityTooltipArtistPlaceholder />
        }

        return <EntityTooltipArtistFragmentContainer artist={props.artist} />
      }}
    />
  )
}
