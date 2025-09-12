import { Clickable, Image, type ImageProps } from "@artsy/palette"
import { type FC, useState } from "react"

interface ConversationMessageImageProps extends ImageProps {
  onImageLoad?: () => void
}

export const ConversationMessageImage: FC<
  React.PropsWithChildren<ConversationMessageImageProps>
> = ({ alt, src, onImageLoad, ...props }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
    if (onImageLoad) {
      setTimeout(onImageLoad, 0)
    }
  }

  return (
    <>
      <Clickable display="flex" onClick={() => window?.open(src, "_blank")}>
        <Image
          {...props}
          src={src}
          borderRadius={10}
          alt={alt}
          width="100%"
          style={{ display: isLoading ? "none" : "block" }}
          onLoad={handleLoad}
        />
      </Clickable>
    </>
  )
}
