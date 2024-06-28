import { Box, Image, Text } from "@artsy/palette"
import { DiscoveryArticle } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import { RouterLink } from "System/Components/RouterLink"
import { resize } from "Utils/resizer"
import { FC } from "react"

const IMAGE_HEIGHT = 200

interface ArticleRailsProps {
  article: DiscoveryArticle
}

export const Article: FC<ArticleRailsProps> = ({ article }) => {
  const resizedImage = resize(
    article.imageUrl || "https://www.artsy.net/images/missing_image.png",
    { height: IMAGE_HEIGHT }
  )

  return (
    <RouterLink to={article.href} textDecoration="none" overflow="hidden">
      <Box>
        <Image src={resizedImage} height={IMAGE_HEIGHT} />
        <Text height={"4em"}>{article.title}</Text>
      </Box>
    </RouterLink>
  )
}
