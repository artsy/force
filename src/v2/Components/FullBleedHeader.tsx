import { BoxProps, Flex, HTML } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { FullBleed } from "v2/Components/FullBleed"
import { cropped } from "v2/Utils/resized"

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
  const xs = cropped(src, { width: 767, height: 320 })
  const sm = cropped(src, { width: 1024, height: 600 })
  const md = cropped(src, { width: 1440, height: 600 })
  const lg = cropped(src, { width: 2000, height: 600 })

  return (
    <Container bg="black10" height={600} position="absolute" {...rest}>
      <picture>
        <source srcSet={lg.srcSet} media="(min-width: 1720px)" />
        <source srcSet={md.srcSet} media="(min-width: 1232px)" />
        <source srcSet={sm.srcSet} media="(max-width: 896px)" />
        <source srcSet={xs.srcSet} media="(max-width: 767px)" />

        <Image src={md.src} alt="" loading="lazy" />
      </picture>

      {caption && (
        <Overlay>
          <HTML html={caption} color="white100" variant="xs" px={2} py={1} />
        </Overlay>
      )}

      {children}
    </Container>
  )
}

const Container = styled(FullBleed)`
  position: relative;
  overflow: hidden;
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
