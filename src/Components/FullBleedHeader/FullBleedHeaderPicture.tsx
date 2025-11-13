import { cropped } from "Utils/resized"
import { forwardRef, type Ref } from "react"
import { Link } from "react-head"
import type { FullBleedHeaderProps } from "./FullBleedHeader"

type FullBleedHeaderPictureProps = Pick<
  FullBleedHeaderProps,
  "src" | "fixed"
> & {
  top: number
  height: number
}

export const FullBleedHeaderPicture = forwardRef(
  (
    {
      src,
      top,
      height,
      fixed,
    }: FullBleedHeaderPictureProps & { ref?: Ref<HTMLImageElement> },
    forwardedRef
  ) => {
    const xs = cropped(src, { width: 450, height: 320 })
    const sm = cropped(src, { width: 767, height: 320 })
    const md = cropped(src, { width: 1024, height: 600 })
    const lg = cropped(src, { width: 1440, height: 600 })
    const xl = cropped(src, { width: 2000, height: 600 })

    return (
      <>
        <Link
          rel="preload"
          as="image"
          href={xs.src}
          imageSrcSet={xs.srcSet}
          fetchPriority="high"
        />
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

          <img
            ref={forwardedRef as any}
            src={sm.src}
            alt=""
            fetchPriority="high"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>
      </>
    )
  }
)
