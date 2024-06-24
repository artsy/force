import { Box, Image } from "@artsy/palette"
import { ArticleType } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArticlesRail"
import { FC } from "react"

interface ArticleRailsProps {
  article: ArticleType
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
