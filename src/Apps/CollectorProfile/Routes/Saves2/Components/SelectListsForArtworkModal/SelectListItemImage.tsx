import { Image } from "@artsy/palette"
import { SavesNoImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesNoImage"
import { FC } from "react"
import { cropped } from "Utils/resized"

const IMAGE_SIZE = 60

interface SelectListItemImageProps {
  url: string | null
}

export const SelectListItemImage: FC<SelectListItemImageProps> = ({ url }) => {
  if (url === null) {
    return <SavesNoImage width={IMAGE_SIZE} height={IMAGE_SIZE} />
  }

  const image = cropped(url, {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  })

  return (
    <Image
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      src={image.src}
      srcSet={image.srcSet}
      alt=""
    />
  )
}
