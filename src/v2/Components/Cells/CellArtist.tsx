import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "v2/System/Router/RouterLink"
import { CellArtist_artist } from "v2/__generated__/CellArtist_artist.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { EntityHeaderArtistFragmentContainer } from "../EntityHeaders/EntityHeaderArtist"
import { FC } from "react"
import { EntityHeaderPlaceholder } from "../EntityHeaders/EntityHeaderPlaceholder"

export interface CellArtistProps extends Omit<RouterLinkProps, "to"> {
  artist: CellArtist_artist
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
  displayCounts?: boolean
}

const CellArtist: FC<CellArtistProps> = ({
  artist,
  mode = "RAIL",
  displayCounts,
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = artist.image?.cropped

  return (
    <RouterLink
      to={artist.href}
      display="block"
      textDecoration="none"
      width={width}
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
            lazyLoad
            style={{ display: "block" }}
          />
        ) : (
          <Text
            variant="lg"
            bg="black10"
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

export const CellArtistPlaceholder: FC<CellArtistPlaceholderProps> = ({
  mode = "RAIL",
  displayCounts,
}) => {
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
      image {
        cropped(
          width: 445
          height: 334
          version: ["normalized", "larger", "large"]
        ) {
          src
          srcSet
        }
      }
    }
  `,
})
