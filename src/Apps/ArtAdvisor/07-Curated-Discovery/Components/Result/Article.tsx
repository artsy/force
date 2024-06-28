import { Box, Image } from "@artsy/palette"
import { DiscoveryArticle } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import { FC } from "react"

interface ArticleRailsProps {
  article: DiscoveryArticle
}

export const Article: FC<ArticleRailsProps> = ({ article }) => {
  return (
    <Box>
      <Image src={article.imageUrl} height={300} />
      <a href={`${article.href}`} target="_blank">
        {article.title}
      </a>
    </Box>
  )
}
