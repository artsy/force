import { Clickable, Image, ImageProps } from "@artsy/palette"
import { FC, useState } from "react"

export const ConversationMessageImage: FC<ImageProps> = ({
  alt,
  src,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)

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
          onLoad={() => {
            setIsLoading(false)
          }}
        />
      </Clickable>
    </>
  )
}
