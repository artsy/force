import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { CellArtistSeries_artistSeries$data } from "__generated__/CellArtistSeries_artistSeries.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { FC } from "react"

export interface CellArtistSeriesProps extends Omit<RouterLinkProps, "to"> {
  artistSeries: CellArtistSeries_artistSeries$data
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
}

const CellArtistSeries: FC<CellArtistSeriesProps> = ({
  artistSeries,
  mode = "RAIL",
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  const image = artistSeries.image?.cropped

  return (
    <RouterLink
      to={`/artist-series/${artistSeries.slug}`}
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
          <Box
            bg="black10"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
        )}
      </ResponsiveBox>

      <Spacer y={0.5} />

      <Text variant="sm-display">{artistSeries.title}</Text>

      <Text variant="sm-display" color="black60">
        {artistSeries.artworksCountMessage}
      </Text>
    </RouterLink>
  )
}

export const CellArtistSeriesPlaceholder: FC = () => {
  return (
    <Box width={DEFAULT_CELL_WIDTH}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>

      <Spacer y={0.5} />

      <SkeletonText variant="sm-display">Example Title</SkeletonText>

      <SkeletonText variant="sm-display">66 available</SkeletonText>
    </Box>
  )
}

export const CellArtistSeriesFragmentContainer = createFragmentContainer(
  CellArtistSeries,
  {
    artistSeries: graphql`
      fragment CellArtistSeries_artistSeries on ArtistSeries {
        slug
        title
        artworksCountMessage
        image {
          cropped(width: 445, height: 334, version: ["larger", "large"]) {
            src
            srcSet
          }
        }
      }
    `,
  }
)
