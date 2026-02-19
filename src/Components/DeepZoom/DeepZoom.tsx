import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, Flex, ModalBase, Spinner } from "@artsy/palette"
import { useDetectActivity } from "Utils/Hooks/useDetectActivity"
import { useDidMount } from "Utils/Hooks/useDidMount"
import type { DeepZoom_image$data } from "__generated__/DeepZoom_image.graphql"
import { once } from "es-toolkit"
import type * as React from "react"
import { useCallback, useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { DeepZoomCloseButton } from "./DeepZoomCloseButton"
import { DeepZoomSlider } from "./DeepZoomSlider"

const ZOOM_PER_CLICK = 1.4

interface DeepZoomProps {
  image: DeepZoom_image$data
  onClose(): void
}

const DeepZoom: React.FC<React.PropsWithChildren<DeepZoomProps>> = ({
  image,
  onClose,
}) => {
  const osdViewerRef = useRef<any | null>(null)

  const handleZoomChanged = useCallback(() => {
    if (!osdViewerRef.current) return

    const { current: viewer } = osdViewerRef

    setSliderState(prevSliderState => ({
      ...prevSliderState,
      min: viewer.viewport.getMinZoom(),
      max: viewer.viewport.getMaxZoom(),
      value: viewer.viewport.getZoom(),
    }))
  }, [])

  const initializeViewer = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return

      import(/* webpackChunkName: "openseadragon" */ "openseadragon").then(
        OpenSeaDragon => {
          const viewer = OpenSeaDragon.default({
            element: element,
            debugMode: false,
            showNavigationControl: false,
            immediateRender: false,
            useCanvas: true,
            constrainDuringPan: false,
            blendTime: 0.0,
            animationTime: 1.5,
            springStiffness: 15.0,
            maxZoomPixelRatio: 1.0,
            minZoomImageRatio: 0.9,
            zoomPerClick: ZOOM_PER_CLICK,
            zoomPerScroll: 1.4,
            clickDistThreshold: 5,
            clickTimeThreshold: 300,
            visibilityRatio: 1,
            tileSources: image.deepZoom,
            gestureSettingsTouch: {
              scrolltozoom: false,
              clicktozoom: true,
              pinchtozoom: true,
              flickenabled: true,
              flickminspeed: 20,
              flickmomentum: 0.4,
            },
          })

          osdViewerRef.current = viewer

          viewer.addHandler?.("zoom", handleZoomChanged)

          viewer.addHandler?.(
            "tile-drawn",
            once(() => {
              setSliderState(prevSliderState => ({
                ...prevSliderState,
                loading: false,
                min: viewer.viewport.getMinZoom(),
                max: viewer.viewport.getMaxZoom(),
                value: viewer.viewport.getHomeZoom(),
              }))
            }),
          )
        },
      )
    },
    [image.deepZoom, handleZoomChanged],
  )

  const zoomBy = (amount: number) => {
    if (!osdViewerRef.current) return

    const { current: viewer } = osdViewerRef

    if (!viewer.viewport) return

    viewer.viewport.zoomBy(amount)
    viewer.viewport.applyConstraints()
  }

  const [sliderState, setSliderState] = useState({
    loading: true,
    min: 0,
    max: 1,
    step: 0.001,
    value: 0,
  })

  const handleSliderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!osdViewerRef.current) return
    osdViewerRef.current.viewport.zoomTo(Number.parseFloat(event.target.value))
  }

  const handleZoomInClicked = () => {
    zoomBy(ZOOM_PER_CLICK)
  }

  const handleZoomOutClicked = () => {
    zoomBy(1 / ZOOM_PER_CLICK)
  }

  const { detectActivityProps, isActive } = useDetectActivity()

  const isMounted = useDidMount()

  useEffect(() => {
    return () => {
      if (osdViewerRef.current && osdViewerRef.current.destroy) {
        osdViewerRef.current.destroy()
        osdViewerRef.current = null
      }
    }
  }, [])

  return (
    <ModalBase onClose={onClose} {...detectActivityProps}>
      <Box
        ref={initializeViewer}
        width="100vw"
        height="100vh"
        bg="mono100"
        style={{ transition: "opacity 250ms", opacity: isMounted ? 1 : 0 }}
      >
        {sliderState.loading && <Spinner color="mono0" />}
      </Box>

      <DeepZoomCloseButton
        position="absolute"
        top={0}
        right={0}
        p={2}
        onClick={onClose}
      />

      <Flex
        position="absolute"
        bottom={20}
        left="50%"
        style={{
          transform: "translateX(-50%)",
          transition: "opacity 250ms",
          opacity: isActive ? 1 : 0,
        }}
      >
        <DeepZoomSlider
          onChange={handleSliderChanged}
          onZoomInClicked={handleZoomInClicked}
          onZoomOutClicked={handleZoomOutClicked}
          {...sliderState}
        />
      </Flex>
    </ModalBase>
  )
}

export const DeepZoomFragmentContainer = createFragmentContainer(DeepZoom, {
  image: graphql`
    fragment DeepZoom_image on Image {
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
  `,
})

export const useDeepZoom = () => {
  const [isDeepZoomVisible, setIsDeepZoomVisible] = useState(false)

  const { trackEvent } = useTracking()

  const showDeepZoom = () => {
    setIsDeepZoomVisible(true)

    trackEvent({
      context_module: DeprecatedAnalyticsSchema.ContextModule.Zoom,
      type: DeprecatedAnalyticsSchema.Type.Button,
      flow: DeprecatedAnalyticsSchema.Flow.ArtworkZoom,
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
    })
  }

  const hideDeepZoom = () => {
    setIsDeepZoomVisible(false)
  }

  return {
    showDeepZoom,
    hideDeepZoom,
    isDeepZoomVisible,
  }
}
