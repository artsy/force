import { Image } from "@artsy/palette"
import { SavesNoImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesNoImage"
import { FC } from "react"
import { cropped } from "Utils/resized"

interface SelectListsForArtworkImageProps {
  url: string | null
  size?: number
}

export const SelectListsForArtworkImage: FC<SelectListsForArtworkImageProps> = ({
  url,
  size = 60,
}) => {
  if (url === null) {
    return <SavesNoImage width={size} height={size} />
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
