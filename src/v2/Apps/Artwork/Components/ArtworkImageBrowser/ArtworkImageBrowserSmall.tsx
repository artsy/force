import * as React from "react"
import {
  ProgressDots,
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperRail,
  SwiperRailProps,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkImageBrowserSmall_artwork } from "v2/__generated__/ArtworkImageBrowserSmall_artwork.graphql"
import { DeepZoomFragmentContainer, useDeepZoom } from "v2/Components/DeepZoom"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"
import { ArtworkVideoPlayerFragmentContainer } from "../ArtworkVideoPlayer"

interface ArtworkImageBrowserSmallProps {
  artwork: ArtworkImageBrowserSmall_artwork
  index: number
  setIndex(index: number): void
}

const ArtworkImageBrowserSmall: React.FC<ArtworkImageBrowserSmallProps> = ({
  artwork,
  index,
  setIndex,
}) => {
  const figures = artwork.figures
  const activeFigure = figures[index]

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

      <Swiper snap="center" onChange={setIndex} Cell={Cell} Rail={Rail}>
        {figures.map((figure, i) => {
          switch (figure.type) {
            case "Image":
              return (
                <ArtworkLightboxFragmentContainer
                  key={figure.internalID ?? i}
                  my={2}
                  artwork={artwork}
                  activeIndex={i}
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
                  activeIndex={i}
                  artwork={artwork}
                  key={i}
                  small
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
        figures {
          ... on Image {
            internalID
            isZoomable
            type: __typename
            ...DeepZoom_image
          }
          ... on Video {
            type: __typename
          }
        }
      }
    `,
  }
)
