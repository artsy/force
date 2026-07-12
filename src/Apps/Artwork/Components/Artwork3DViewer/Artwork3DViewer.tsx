import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, ModalBase, Spinner } from "@artsy/palette"
import { DeepZoomCloseButton } from "Components/DeepZoom/DeepZoomCloseButton"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { useCallback, useEffect, useRef, useState } from "react"
import type * as React from "react"
import { useTracking } from "react-tracking"

interface Artwork3DViewerProps {
  splatUrl: string
  onClose(): void
}

const isPlyUrl = (url: string): boolean => {
  return new URL(url).pathname.toLowerCase().endsWith(".ply")
}

export const Artwork3DViewer: React.FC<
  React.PropsWithChildren<Artwork3DViewerProps>
> = ({ splatUrl, onClose }) => {
  const rendererRef = useRef<any | null>(null)
  const controlsRef = useRef<any | null>(null)
  const rafRef = useRef<number | null>(null)
  const disposedRef = useRef(false)

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const initializeViewer = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return

      import(/* webpackChunkName: "gsplat" */ "gsplat")
        .then(SPLAT => {
          if (disposedRef.current) return

          const canvas = document.createElement("canvas")
          canvas.style.width = "100%"
          canvas.style.height = "100%"
          canvas.style.display = "block"
          element.appendChild(canvas)

          const scene = new SPLAT.Scene()
          const camera = new SPLAT.Camera()
          const renderer = new SPLAT.WebGLRenderer(canvas)

          rendererRef.current = renderer

          const frame = () => {
            if (disposedRef.current) return
            controlsRef.current?.update()
            renderer.render(scene, camera)
            rafRef.current = requestAnimationFrame(frame)
          }

          const load = isPlyUrl(splatUrl)
            ? SPLAT.PLYLoader.LoadAsync(splatUrl, scene, () => {})
            : SPLAT.Loader.LoadAsync(splatUrl, scene, () => {})

          load
            .then(splat => {
              if (disposedRef.current) return

              splat.recalculateBounds()
              const center = splat.bounds.center()
              const diagonal = Math.max(splat.bounds.size().magnitude(), 0.1)
              const radius = diagonal * 1.5

              const controls = new SPLAT.OrbitControls(
                camera,
                renderer.canvas,
                undefined,
                undefined,
                radius,
                undefined,
                center,
              )
              controls.minZoom = diagonal * 0.1
              controls.maxZoom = diagonal * 5

              controlsRef.current = controls

              setIsLoading(false)
              frame()
            })
            .catch((error: unknown) => {
              console.error("Artwork3DViewer failed to load splat", error)
              setHasError(true)
            })
        })
        .catch((error: unknown) => {
          console.error("Artwork3DViewer failed to load gsplat", error)
          setHasError(true)
        })
    },
    [splatUrl],
  )

  useEffect(() => {
    return () => {
      disposedRef.current = true

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }

      controlsRef.current?.dispose?.()
      controlsRef.current = null

      rendererRef.current?.dispose?.()
      rendererRef.current = null
    }
  }, [])

  const isMounted = useDidMount()

  // Fail silently: hide the viewer entirely rather than breaking the page.
  useEffect(() => {
    if (hasError) {
      onClose()
    }
  }, [hasError, onClose])

  if (hasError) {
    return null
  }

  return (
    <ModalBase onClose={onClose}>
      <Box
        ref={initializeViewer}
        width="100vw"
        height="100vh"
        bg="mono100"
        style={{ transition: "opacity 250ms", opacity: isMounted ? 1 : 0 }}
      >
        {isLoading && <Spinner color="mono0" />}
      </Box>

      <DeepZoomCloseButton
        position="absolute"
        top={0}
        right={0}
        p={2}
        onClick={onClose}
      />
    </ModalBase>
  )
}

export const use3DViewer = () => {
  const [is3DViewerVisible, setIs3DViewerVisible] = useState(false)

  const { trackEvent } = useTracking()

  const show3DViewer = () => {
    setIs3DViewerVisible(true)

    trackEvent({
      context_module: DeprecatedAnalyticsSchema.ContextModule.Zoom,
      type: DeprecatedAnalyticsSchema.Type.Button,
      flow: DeprecatedAnalyticsSchema.Flow.ArtworkZoom,
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
    })
  }

  const hide3DViewer = () => {
    setIs3DViewerVisible(false)
  }

  return {
    show3DViewer,
    hide3DViewer,
    is3DViewerVisible,
  }
}
