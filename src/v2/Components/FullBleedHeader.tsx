import { BoxProps, Flex, HTML, FullBleed } from "@artsy/palette"
import * as React from "react";
import styled from "styled-components"
import { useSizeAndPosition } from "v2/Utils/Hooks/useSizeAndPosition"
import { cropped } from "v2/Utils/resized"
import { useNavBarHeight } from "./NavBar/useNavBarHeight"

export interface FullBleedHeaderProps extends BoxProps {
  /** Should the biggest size image available */
  src: string
  caption?: string
  children?: React.ReactNode
}

export const FullBleedHeader: React.FC<FullBleedHeaderProps> = ({
  src,
  children,
  caption,
  ...rest
}) => {
  const xs = cropped(src, { width: 450, height: 320 })
  const sm = cropped(src, { width: 767, height: 320 })
  const md = cropped(src, { width: 1024, height: 600 })
  const lg = cropped(src, { width: 1440, height: 600 })
  const xl = cropped(src, { width: 2000, height: 600 })

  const { mobile, desktop } = useNavBarHeight()
  const { ref, top, height } = useSizeAndPosition()

  return (
    <Container
      ref={ref as any}
      bg="black10"
      height={[
        `max(calc(50vh - ${mobile}px), ${MIN_HEIGHT}px)`,
        `max(calc(50vh - ${desktop}px), ${MIN_HEIGHT}px)`,
      ]}
      position="relative"
      {...rest}
    >
      <Picture style={{ top: `${top}px`, height: `${height}px` }}>
        <source srcSet={xl.srcSet} media="(min-width: 1720px)" />
        <source srcSet={lg.srcSet} media="(min-width: 1232px)" />
        <source srcSet={md.srcSet} media="(min-width: 896px)" />
        <source srcSet={sm.srcSet} media="(min-width: 767px)" />
        <source srcSet={xs.srcSet} media="(max-width: 766px)" />

        <Image src={sm.src} alt="" loading="lazy" />
      </Picture>

      {caption && (
        <Overlay display={["none", "flex"]}>
          <HTML html={caption} color="white100" variant="xs" px={2} py={1} />
        </Overlay>
      )}

      {children}
    </Container>
  )
}

const MIN_HEIGHT = 360

const Container = styled(FullBleed)`
  overflow: hidden;
  clip-path: inset(0);
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Picture = styled.picture`
  position: fixed;
  width: 100%;
  left: 0;
`

const Overlay = styled(Flex)`
  position: absolute;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25)
  );
`
