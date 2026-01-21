import { Box, Image } from "@artsy/palette"
import { MODAL_WIDTH } from "Components/AuthDialog/Utils/authDialogConstants"
import { resized } from "Utils/resized"
import type * as React from "react"
import { Link } from "react-head"

export const AuthDialogLeftPanelImagePlaceholder: React.FC<
  React.PropsWithChildren<{ src: string }>
> = ({ src }) => {
  // Sized at 1px larger than the initial images
  // const placeholder = resized(src, { width: 801, height: 801, quality: 1 })

  const placeholder = resized(src, {
    width: MODAL_WIDTH / 2,
    quality: 1,
  })

  return (
    <>
      <Link
        rel="preload"
        as="image"
        href={placeholder.src}
        fetchPriority="high"
      />

      <Box width="100%" height="100%" zIndex={0}>
        <Image
          key={placeholder.src}
          src={placeholder.src}
          width="100%"
          height="100%"
          fetchPriority={"high"}
          lazyLoad={false}
          alt=""
          style={{
            objectFit: "contain",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            filter: "blur(10px)",
          }}
        />
      </Box>
    </>
  )
}
