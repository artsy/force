import * as React from "react"
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
import { ArtworkImageBrowserSmall_artwork$data } from "v2/__generated__/ArtworkImageBrowserSmall_artwork.graphql"
import { DeepZoomFragmentContainer, useDeepZoom } from "v2/Components/DeepZoom"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"

interface ArtworkImageBrowserSmallProps {
  artwork: ArtworkImageBrowserSmall_artwork$data
  index: number
  setIndex(index: number): void
}

const ArtworkImageBrowserSmall: React.FC<ArtworkImageBrowserSmallProps> = ({
  artwork,
  index,
  setIndex,
}) => {
  const images = compact(artwork.images)
  const activeImage = images[index]

  const { isDeepZoomVisible, showDeepZoom, hideDeepZoom } = useDeepZoom()

  if (images.length === 0) {
    return null
  }

  return (
    <>
      {isDeepZoomVisible && (
        <DeepZoomFragmentContainer image={activeImage} onClose={hideDeepZoom} />
      )}

      <Swiper snap="center" onChange={setIndex} Cell={Cell} Rail={Rail}>
        {images.map((image, i) => {
          return (
            <ArtworkLightboxFragmentContainer
              key={image.internalID ?? i}
              my={2}
              artwork={artwork}
              activeIndex={i}
              lazyLoad={i !== 0}
              onClick={activeImage.isZoomable ? showDeepZoom : undefined}
            />
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
          isZoomable
          ...DeepZoom_image
        }
      }
    `,
  }
)
