import { Image, ResponsiveBox, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { CellPartnerArtist_partnerArtist$data } from "__generated__/CellPartnerArtist_partnerArtist.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { FC } from "react"
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
