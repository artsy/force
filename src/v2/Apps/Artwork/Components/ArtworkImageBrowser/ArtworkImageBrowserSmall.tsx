import React, { useState } from "react"
import {
  ProgressDots,
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperRail,
  SwiperRailProps,
} from "@artsy/palette"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkImageBrowserSmall_artwork } from "v2/__generated__/ArtworkImageBrowserSmall_artwork.graphql"
import { DeepZoom } from "v2/Components/DeepZoom"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"

interface ArtworkImageBrowserSmallProps {
  artwork: ArtworkImageBrowserSmall_artwork
}

const ArtworkImageBrowserSmall: React.FC<ArtworkImageBrowserSmallProps> = ({
  artwork,
}) => {
  const [index, setIndex] = useState(0)
  const images = compact(artwork.images)

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <Swiper snap="center" onChange={setIndex} Cell={Cell} Rail={Rail}>
        {images.map((image, i) => {
          return (
            <DeepZoom key={i} deepZoom={image.deepZoom}>
              {({ onShow }) => {
                return (
                  <ArtworkLightboxFragmentContainer
                    my={2}
                    artwork={artwork}
                    activeIndex={i}
                    onClick={image.isZoomable ? onShow : undefined}
                    lazyLoad={i !== 0}
                  />
                )
              }}
            </DeepZoom>
          )
        })}
      </Swiper>

      {images.length > 1 && (
        <ProgressDots
          variant="dash"
          amount={images.length}
          activeIndex={index}
        />
      )}
    </>
  )
}

const Cell: React.ForwardRefExoticComponent<SwiperCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        width="100%"
        verticalAlign="middle"
        justifyContent="center"
        alignItems="center"
        pr={0}
      />
    )
  }
)

const Rail: React.FC<SwiperRailProps> = props => {
  return <SwiperRail {...props} display="block" />
}

export const ArtworkImageBrowserSmallFragmentContainer = createFragmentContainer(
  ArtworkImageBrowserSmall,
  {
    artwork: graphql`
      fragment ArtworkImageBrowserSmall_artwork on Artwork {
        ...ArtworkLightbox_artwork
        images {
          internalID
          # TODO: Move to deepZoom component
          isZoomable
          deepZoom {
            Image {
              xmlns
              Url
              Format
              TileSize
              Overlap
              Size {
                Width
                Height
              }
            }
          }
        }
      }
    `,
  }
)
