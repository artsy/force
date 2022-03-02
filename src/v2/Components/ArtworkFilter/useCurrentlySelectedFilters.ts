import { useArtworkFilterContext } from "./ArtworkFilterContext"

export const useCurrentlySelectedFilters = () => {
  const { currentlySelectedFilters } = useArtworkFilterContext()

  return currentlySelectedFilters?.() ?? {}
}
