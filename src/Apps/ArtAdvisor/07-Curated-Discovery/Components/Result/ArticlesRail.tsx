import { Box, SkeletonBox } from "@artsy/palette"
import { State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { Article } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Article"
import { DiscoveryArticle } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import { Rail } from "Components/Rail/Rail"
import { FC, useEffect, useState } from "react"

interface ArticlesRailProps {
  state: State
}

export const ArticlesRail: FC<ArticlesRailProps> = ({ state }) => {
  const [articles, setArticles] = useState<DiscoveryArticle[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const params = new URLSearchParams()
    params.append("limit", "25")
    params.append("concepts", state.goal) //TODO: improve use of goal
    state.interests.forEach(concept => {
      params.append("concepts", concept)
    })
    state.parsedInterests.forEach(concept => {
      params.append("concepts", concept)
    })

    const fetchArticles = async () => {
      const response = await fetch(
        `/api/advisor/7/articles?${params.toString()}`
      )
      const data = await response.json()
      setArticles(data)
      setIsLoading(false)
    }

    fetchArticles()
  }, [state.interests, state.parsedInterests, state.goal])

  return (
    <>
      {articles.length ? (
        <Box opacity={isLoading ? 0.2 : 1}>
          <Rail
            title="And these articles"
            getItems={() => {
              return articles.map((article: DiscoveryArticle) => {
                return <Article key={article.internalID} article={article} />
              })
            }}
          />
        </Box>
      ) : (
        <SkeletonBox height={460} />
      )}
    </>
  )
}
