import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import type { CellArtist_artist$data } from "__generated__/CellArtist_artist.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DEFAULT_CELL_WIDTH } from "./constants"

export interface CellArtistProps extends Partial<RouterLinkProps> {
  artist: CellArtist_artist$data
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
  displayCounts?: boolean
  lazyLoad?: boolean
  FollowButton?: JSX.Element
}

const CellArtist: FC<React.PropsWithChildren<CellArtistProps>> = ({
  artist,
  mode = "RAIL",
  displayCounts,
  lazyLoad = true,
  FollowButton,
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = artist.coverArtwork?.image?.cropped

  return (
    <RouterLink
      to={artist.href}
      display="block"
      textDecoration="none"
      width={width}
      data-testid="CellArtist"
      {...rest}
    >
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        {image?.src ? (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad={lazyLoad}
            fetchPriority={lazyLoad ? "auto" : "high"}
            style={{ display: "block" }}
          />
        ) : (
          <Text
            variant="lg-display"
            bg="mono10"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {artist.initials}
          </Text>
        )}
      </ResponsiveBox>

      <EntityHeaderArtistFragmentContainer
        artist={artist}
        displayAvatar={false}
        displayLink={false}
        displayCounts={displayCounts}
        FollowButton={FollowButton}
        alignItems="flex-start"
        mt={1}
      />
    </RouterLink>
  )
}

type CellArtistPlaceholderProps = Pick<
  CellArtistProps,
  "mode" | "displayCounts"
>

export const CellArtistPlaceholder: FC<
  React.PropsWithChildren<CellArtistPlaceholderProps>
> = ({ mode = "RAIL", displayCounts }) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  return (
    <Box width={width}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>

      <EntityHeaderPlaceholder displayAvatar={false} mt={1} />

      {displayCounts && (
        <SkeletonText variant="xs">00 works, 0 for sale</SkeletonText>
      )}
    </Box>
  )
}

export const CellArtistFragmentContainer = createFragmentContainer(CellArtist, {
  artist: graphql`
    fragment CellArtist_artist on Artist {
      ...EntityHeaderArtist_artist
      internalID
      slug
      name
      href
      initials
      coverArtwork {
        image {
          cropped(width: 445, height: 334, version: ["larger", "large"]) {
            src
            srcSet
          }
        }
      }
    }
  `,
})
