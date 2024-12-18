import { Clickable, Image, type ImageProps } from "@artsy/palette"
import { type FC, useState } from "react"

export const ConversationMessageImage: FC<
  React.PropsWithChildren<ImageProps>
> = ({ alt, src, ...props }) => {
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
