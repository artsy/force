import { FC } from "react"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { Pill } from "@artsy/palette"

export interface FeaturedKeywordsFilterQuickProps {
  featuredKeywords: readonly string[] | null | undefined
}

export const FeaturedKeywordsFilterQuick: FC<FeaturedKeywordsFilterQuickProps> = props => {
  const { filters, setFilter } = useArtworkFilterContext()

  const toggleKeyword = keyword => {
    setFilter("keyword", filters?.keyword === keyword ? null : keyword)
  }

  if (!props.featuredKeywords || !props.featuredKeywords.length) return null
  return (
    <>
      {props.featuredKeywords.map((keyword, idx) => (
        <Pill
          key={idx}
          size="small"
          onClick={() => toggleKeyword(keyword)}
          selected={filters?.keyword === keyword}
        >
          {keyword}
        </Pill>
      ))}
    </>
  )
}
