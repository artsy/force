import {
  ProgressDots,
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperRail,
  SwiperRailProps,
} from "@artsy/palette"
import { ArtworkLightboxFragmentContainer } from "Apps/Artwork/Components/ArtworkLightbox"
import { ArtworkVideoPlayerFragmentContainer } from "Apps/Artwork/Components/ArtworkVideoPlayer"
import { DeepZoomFragmentContainer, useDeepZoom } from "Components/DeepZoom"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkImageBrowserSmall_artwork$data } from "__generated__/ArtworkImageBrowserSmall_artwork.graphql"

interface ArtworkImageBrowserSmallProps {
  artwork: ArtworkImageBrowserSmall_artwork$data
  /** Index of the currently active artwork */
  activeIndex: number
  /** Update the currently active artwork (on swipe change) */
  setActiveIndex(index: number): void
  maxHeight: number
}

const ArtworkImageBrowserSmall: React.FC<ArtworkImageBrowserSmallProps> = ({
  artwork,
  activeIndex,
  setActiveIndex,
  maxHeight,
}) => {
  const figures = artwork.figures
  const activeFigure = figures[activeIndex]

  const { isDeepZoomVisible, showDeepZoom, hideDeepZoom } = useDeepZoom()

  if (figures.length === 0) {
    return null
  }

  return (
    <>
      {activeFigure.type === "Image" && isDeepZoomVisible && (
        <DeepZoomFragmentContainer
          image={activeFigure}
          onClose={hideDeepZoom}
        />
      )}

      <Swiper
        snap="center"
        onChange={setActiveIndex}
        Cell={Cell}
        Rail={Rail}
        initialIndex={activeIndex}
      >
        {figures.map((figure, i) => {
          switch (figure.type) {
            case "Image":
              return (
                <ArtworkLightboxFragmentContainer
                  key={figure.internalID ?? i}
                  maxHeight={maxHeight}
                  my={2}
                  artwork={artwork}
                  activeIndex={artwork.isSetVideoAsCover ? i - 1 : i}
                  lazyLoad={i !== 0}
                  onClick={
                    activeFigure.type === "Image" && activeFigure.isZoomable
                      ? showDeepZoom
                      : undefined
                  }
                />
              )
            case "Video":
              return (
                <ArtworkVideoPlayerFragmentContainer
                  key={i}
                  activeIndex={i}
                  my={2}
                  artwork={artwork}
                  maxHeight={maxHeight}
                />
              )
            default:
              return null
          }
        })}
      </Swiper>

      {figures.length > 1 && (
        <ProgressDots
          variant="dash"
          amount={figures.length}
          activeIndex={activeIndex}
          onClick={setActiveIndex}
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
      fragment ArtworkImageBrowserSmall_artwork on Artwork
        @argumentDefinitions(
          includeAllImages: { type: "Boolean", defaultValue: false }
        ) {
        ...ArtworkLightbox_artwork
          @arguments(includeAllImages: $includeAllImages)
        ...ArtworkVideoPlayer_artwork
          @arguments(includeAllImages: $includeAllImages)
        isSetVideoAsCover
        figures(includeAll: $includeAllImages) {
          ... on Image {
            ...DeepZoom_image
            internalID
            isZoomable
            type: __typename
          }
          ... on Video {
            type: __typename
          }
        }
      }
    `,
  }
)
