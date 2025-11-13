import { cropped } from "Utils/resized"
import { type BoxProps, Image, ResponsiveBox } from "@artsy/palette"
import type * as React from "react"
import { Link } from "react-head"

export interface HeaderIconProps extends Omit<BoxProps, "maxWidth"> {
  /* Should be a version that's larger than 200px */
  src: string
}

export const HeaderIcon: React.FC<React.PropsWithChildren<HeaderIconProps>> = ({
  src,
  ...rest
}) => {
  const img = cropped(src, { width: 200, height: 200 })

  return (
    <>
      <Link
        rel="preload"
        as="image"
        href={img.src}
        imageSrcSet={img.srcSet}
        fetchPriority="high"
      />

      <ResponsiveBox
        aspectWidth={1}
        aspectHeight={1}
        maxWidth={100}
        borderRadius="50%"
        overflow="hidden"
        bg="mono10"
        border="1px solid"
        borderColor="mono10"
        {...rest}
      >
        <Image
          src={img.src}
          srcSet={img.srcSet}
          alt=""
          width="100%"
          height="100%"
        />
      </ResponsiveBox>
    </>
  )
}
