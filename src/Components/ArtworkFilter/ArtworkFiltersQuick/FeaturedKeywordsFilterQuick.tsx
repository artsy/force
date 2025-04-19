import { Box, Pill, Spacer } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import type { FC } from "react"

export interface FeaturedKeywordsFilterQuickProps {
  featuredKeywords: readonly string[] | null | undefined
}

export const FeaturedKeywordsFilterQuick: FC<
  React.PropsWithChildren<FeaturedKeywordsFilterQuickProps>
> = props => {
  const { filters, setFilter } = useArtworkFilterContext()

  const toggleKeyword = keyword => {
    setFilter("keyword", filters?.keyword === keyword ? null : keyword)
  }

  if (!props.featuredKeywords || !props.featuredKeywords.length) return null
  return (
    <>
      <Spacer y={2} />
      <Box width="1px" bg="mono30" />
      <Spacer y={2} />

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
