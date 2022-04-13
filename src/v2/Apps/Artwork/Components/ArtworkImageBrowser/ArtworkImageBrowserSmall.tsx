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
import { ArtworkImageBrowserSmall_artwork } from "v2/__generated__/ArtworkImageBrowserSmall_artwork.graphql"
import { DeepZoomFragmentContainer, useDeepZoom } from "v2/Components/DeepZoom"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"
import { ArtworkVideoPlayerFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkDetails/ArtworkVideoPlayer"
import { GenericFigure } from "v2/Apps/Artwork/Components/ArtworkImageBrowser/utilityTypes"

interface ArtworkImageBrowserSmallProps {
  artwork: ArtworkImageBrowserSmall_artwork
  index: number
  setIndex(index: number): void
}

type Figure = GenericFigure<ArtworkImageBrowserSmall_artwork>

const ArtworkImageBrowserSmall: React.FC<ArtworkImageBrowserSmallProps> = ({
  artwork,
  index,
  setIndex,
}) => {
  const figures: Figure[] = compact(artwork.images) as Figure[]

  if (artwork.video) {
    figures.push(artwork.video as Figure)
  }

  const activeImage = figures[index]

  const { isDeepZoomVisible, showDeepZoom, hideDeepZoom } = useDeepZoom()

  if (figures.length === 0) {
    return null
  }

  return (
    <>
      {activeImage.type === "Image" && isDeepZoomVisible && (
        <DeepZoomFragmentContainer image={activeImage} onClose={hideDeepZoom} />
      )}

      <Swiper snap="center" onChange={setIndex} Cell={Cell} Rail={Rail}>
        {figures.map((image, i) => {
          if (image.type === "Video") {
            return (
              <ArtworkVideoPlayerFragmentContainer
                artwork={artwork}
                key={image.type ?? i}
                small
              />
            )
          } else {
            return (
              <ArtworkLightboxFragmentContainer
                key={image.internalID ?? i}
                my={2}
                artwork={artwork}
                activeIndex={i}
                lazyLoad={i !== 0}
                onClick={
                  activeImage.type === "Image" && activeImage.isZoomable
                    ? showDeepZoom
                    : undefined
                }
              />
            )
          }
        })}
      </Swiper>

      {figures.length > 1 && (
        <ProgressDots
          variant="dash"
          amount={figures.length}
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
        ...ArtworkVideoPlayer_artwork
        images {
          internalID
          isZoomable
          type: __typename
          ...DeepZoom_image
        }
        video {
          type: __typename
        }
      }
    `,
  }
)
