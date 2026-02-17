import { Box, Image } from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogImageCarousel } from "Components/AuthDialog/Components/AuthDialogImageCarousel"
import { AuthDialogImageWithPlaceholder } from "Components/AuthDialog/Components/AuthDialogImageWithPlaceholder"
import { AuthDialogPanImageQueryRenderer } from "Components/AuthDialog/Components/AuthDialogPanImage"
import {
  getResizedAuthDialogGalleryImage,
  getResizedAuthDialogGalleryImagePlaceholder,
  getResizedAuthDialogSEOImage,
} from "Components/AuthDialog/Utils/authDialogConstants"
import type { FC } from "react"

export const AuthDialogLeftPanel: FC<React.PropsWithChildren> = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  if (options.nodeId) {
    return <AuthDialogPanImageQueryRenderer />
  }

  if (options.galleryImage) {
    return (
      <AuthDialogImageWithPlaceholder
        image={getResizedAuthDialogGalleryImage()}
        placeholder={getResizedAuthDialogGalleryImagePlaceholder()}
      />
    )
  }

  if (options.seoImage) {
    return (
      <Box display={["none", "block"]} width="100%">
        <Image
          {...getResizedAuthDialogSEOImage()}
          width="100%"
          minHeight={760}
          height="100%"
          lazyLoad
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>
    )
  }

  return (
    <Box display={["none", "block"]} width="100%" overflow="hidden">
      <AuthDialogImageCarousel />
    </Box>
  )
}
