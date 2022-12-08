import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { CellPartnerArtist_partnerArtist$data } from "__generated__/CellPartnerArtist_partnerArtist.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { FC } from "react"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { extractNodes } from "Utils/extractNodes"

export interface CellPartnerArtistProps extends Partial<RouterLinkProps> {
  artistPartnerEdge: CellPartnerArtist_partnerArtist$data
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
  displayCounts?: boolean
  FollowButton?: JSX.Element
}

const CellPartnerArtist: FC<CellPartnerArtistProps> = ({
  artistPartnerEdge,
  mode = "RAIL",
  displayCounts,
  FollowButton,
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const [artwork] = extractNodes(artistPartnerEdge.artworksConnection)
  const image = artwork?.image?.cropped
  const partnerSlug = artistPartnerEdge.partner?.slug
  const artistSlug = artistPartnerEdge.artist?.slug

  if (!artistPartnerEdge.artist) return null

  return (
    <RouterLink
      to={`/partner/${partnerSlug}/artists/${artistSlug}`}
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
            variant="lg-display"
            bg="black10"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {artistPartnerEdge.artist?.initials}
          </Text>
        )}
      </ResponsiveBox>

      <EntityHeaderArtistFragmentContainer
        artist={artistPartnerEdge.artist}
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

type CellPartnerArtistPlaceholderProps = Pick<
  CellPartnerArtistProps,
  "mode" | "displayCounts"
>

export const CellPartnerArtistPlaceholder: FC<CellPartnerArtistPlaceholderProps> = ({
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

export const CellPartnerArtistFragmentContainer = createFragmentContainer(
  CellPartnerArtist,
  {
    artistPartnerEdge: graphql`
      fragment CellPartnerArtist_partnerArtist on ArtistPartnerEdge {
        artworksConnection(first: 1) {
          edges {
            node {
              image {
                cropped(width: 445, height: 334, version: ["larger", "large"]) {
                  src
                  srcSet
                }
              }
            }
          }
        }
        artist {
          ...EntityHeaderArtist_artist
          internalID
          slug
          name
          href
          initials
        }
        partner {
          slug
        }
      }
    `,
  }
)
