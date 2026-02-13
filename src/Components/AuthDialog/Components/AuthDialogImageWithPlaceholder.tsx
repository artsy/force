import { Box, Image } from "@artsy/palette"
import type { Sized } from "Utils/resized"
import { type FC, useState } from "react"

export interface AuthDialogImageWithPlaceholderProps {
  image: Sized
  placeholder: Sized
}

export const AuthDialogImageWithPlaceholder: FC<
  AuthDialogImageWithPlaceholderProps
> = ({ image, placeholder }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Box display={["none", "block"]} width="100%" overflow="hidden">
      {isLoading && (
        <link
          rel="preload"
          as="image"
          href={image.src}
          imageSrcSet={image.srcSet}
          fetchPriority="high"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      )}

      {isLoading ? (
        <Image
          {...placeholder}
          width="100%"
          height="100%"
          fetchPriority="high"
          alt=""
          style={{ objectFit: "cover", filter: "blur(10px)" }}
        />
      ) : (
        <Image
          {...image}
          width="100%"
          height="100%"
          alt=""
          style={{ objectFit: "cover" }}
        />
      )}
    </Box>
  )
}
