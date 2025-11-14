import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useSizeAndPosition } from "Utils/Hooks/useSizeAndPosition"
import { Box, type BoxProps, Flex, FullBleed, HTML } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  type FC,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  useRef,
} from "react"
import styled from "styled-components"
import { FullBleedHeaderPicture } from "./FullBleedHeaderPicture"

export type FullBleedHeaderProps = BoxProps &
  Pick<HTMLAttributes<HTMLDivElement>, "style"> & {
    caption?: string
    children?: ReactNode
    fixed?: boolean
    mode?: "IMAGE" | "VIDEO"
    /** Should the biggest size image available */
    src: string
    relativeTo?: MutableRefObject<HTMLElement | null>
  }

export const FullBleedHeader: FC<
  React.PropsWithChildren<FullBleedHeaderProps>
> = ({
  src,
  children,
  caption,
  fixed = true,
  mode = "IMAGE",
  relativeTo,
  ...rest
}) => {
  const { ref, ...position } = useSizeAndPosition({
    targetRef: relativeTo,
  })

  const imageRef = useRef<HTMLImageElement | null>(null)

  const height = useFullBleedHeaderHeight()

  return (
    <Container
      ref={ref as any}
      bg="mono10"
      height={height}
      position="relative"
      {...rest}
    >
      {mode === "IMAGE" && (
        <FullBleedHeaderPicture
          ref={imageRef}
          src={src}
          fixed={fixed}
          top={position.top}
          height={position.height}
        />
      )}

      {mode === "VIDEO" && (
        <Box
          display="block"
          width="100%"
          style={
            fixed
              ? {
                  top: `${position.top}px`,
                  height: `${position.height}px`,
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  objectFit: "cover",
                }
              : { objectFit: "cover" }
          }
          as="video"
          src={src}
          autoPlay
          loop
          playsInline
          muted
        />
      )}

      {caption && (
        <FullBleedHeaderOverlay display={["none", "flex"]} zIndex={1}>
          <HTML html={caption} color="mono0" variant="xs" px={2} py={1} />
        </FullBleedHeaderOverlay>
      )}

      {children}
    </Container>
  )
}

export const useFullBleedHeaderHeight = () => {
  const { mobile, desktop } = useNavBarHeight()

  return [
    `max(calc(50vh - ${mobile}px), ${MIN_HEIGHT}px)`,
    `max(calc(50vh - ${desktop}px), ${MIN_HEIGHT}px)`,
  ]
}

export const FullBleedHeaderOverlay = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-shadow: ${themeGet("effects.textShadow")};
  background: ${themeGet("effects.overlayGradient")};

  /**
   * Promotes element to composite layer to prevent disappearing content on
   * scroll in mobile Webkit browsers. Bug apparently caused by interaction with clip-path.
   **/
  transform: translateZ(0);
`

FullBleedHeaderOverlay.defaultProps = {
  alignItems: "flex-end",
  justifyContent: "flex-end",
}

export const MIN_HEIGHT = 360

const Container = styled(FullBleed)`
  overflow: hidden;
  clip-path: inset(0);
`
