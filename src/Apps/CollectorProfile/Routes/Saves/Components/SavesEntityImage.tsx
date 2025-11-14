import { Image } from "@artsy/palette"
import { cropped } from "Utils/resized"
import type { FC } from "react"
import { ArtworkListNoImage } from "./Images/ArtworkListNoImage"

interface SavesEntityImageProps {
  url: string | null
  size?: number
}

export const SavesEntityImage: FC<
  React.PropsWithChildren<SavesEntityImageProps>
> = ({ url, size = 60 }) => {
  if (url === null) {
    return <ArtworkListNoImage width={size} height={size} />
  }

  const image = cropped(url, {
    width: size,
    height: size,
  })

  return (
    <Image
      width={size}
      height={size}
      src={image.src}
      srcSet={image.srcSet}
      alt=""
    />
  )
}
