import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { useRouter } from "System/Hooks/useRouter"
import { compact } from "lodash"
import { useMemo, useRef } from "react"
import { Meta, Title } from "react-head"

interface ArtistMediumsTitleProps {
  defaultTitle: string
  name: string
}

export const ArtistMediumsTitle: React.FC<ArtistMediumsTitleProps> = ({
  defaultTitle,
  name,
}) => {
  const { match } = useRouter()
  const { currentlySelectedFilters } = useArtworkFilterContext()

  const filters = currentlySelectedFilters?.() ?? {}
  const hasStartedFiltering = useRef(false)

  const title = useMemo(() => {
    // Check if we have active filters
    const filterMediums = compact(
      filters.additionalGeneIDs?.map(id => {
        const medium = MEDIUM_OPTIONS.find(medium => medium.value === id)
        return medium?.plural
      })
    )

    // If we have filters or have previously started filtering, use the filter context
    if (filterMediums.length || hasStartedFiltering.current) {
      hasStartedFiltering.current = true
      return filterMediums.length
        ? `${name} - ${toSentence(filterMediums)} | Artsy`
        : defaultTitle
    }

    // Otherwise fall back to URL params (SSR case)
    const initialFilters = getInitialFilterState(match.location?.query ?? {})
    const urlMediums = compact(
      initialFilters.additionalGeneIDs?.map(id => {
        const medium = MEDIUM_OPTIONS.find(medium => medium.value === id)
        return medium?.plural
      })
    )

    if (!urlMediums?.length) return defaultTitle

    return `${name} - ${toSentence(urlMediums)} | Artsy`
  }, [filters.additionalGeneIDs, match.location?.query, name, defaultTitle])

  return (
    <>
      <Title>{title}</Title>
      <Meta name="title" content={title} />
    </>
  )
}

const toSentence = (xs: string[]) => {
  const list = [...xs].sort()

  if (list.length === 2) {
    return `${list[0]} and ${list[1]}`
  }

  return list.join(", ").replace(/,\s([^,]+)$/, ", and $1")
}
