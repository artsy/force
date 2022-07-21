import { forwardRef, ForwardRefExoticComponent, Ref } from "react"
import styled from "styled-components"
import { cropped } from "Utils/resized"
import { FullBleedHeaderProps } from "./FullBleedHeader"

type FullBleedHeaderPictureProps = Pick<
  FullBleedHeaderProps,
  "src" | "fixed"
> & {
  top: number
  height: number
}

export const FullBleedHeaderPicture: ForwardRefExoticComponent<
  FullBleedHeaderPictureProps & { ref?: Ref<HTMLImageElement> }
> = forwardRef(({ src, top, height, fixed }, forwardedRef) => {
  const xs = cropped(src, { width: 450, height: 320 })
  const sm = cropped(src, { width: 767, height: 320 })
  const md = cropped(src, { width: 1024, height: 600 })
  const lg = cropped(src, { width: 1440, height: 600 })
  const xl = cropped(src, { width: 2000, height: 600 })

  return (
    <picture
      style={
        fixed
          ? {
              top: `${top}px`,
              height: `${height}px`,
              position: "fixed",
              width: "100%",
              left: 0,
            }
          : {}
      }
    >
      <source srcSet={xl.srcSet} media="(min-width: 1720px)" />
      <source srcSet={lg.srcSet} media="(min-width: 1232px)" />
      <source srcSet={md.srcSet} media="(min-width: 896px)" />
      <source srcSet={sm.srcSet} media="(min-width: 767px)" />
      <source srcSet={xs.srcSet} media="(max-width: 766px)" />

      <Image ref={forwardedRef as any} src={sm.src} alt="" loading="lazy" />
    </picture>
  )
})

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
