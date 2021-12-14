import { SavedSearchAttributes } from "../SavedSearch/types"
import { DefaultFilterPill } from "../SavedSearch/Utils/FilterPillsContext"

export const getArtistPillFromAttributes = (
  savedSearchAttributes?: SavedSearchAttributes
): DefaultFilterPill | null => {
  if (savedSearchAttributes?.name && savedSearchAttributes.slug) {
    return {
      isDefault: true,
      name: savedSearchAttributes.slug,
      displayName: savedSearchAttributes.name,
    }
  }

  return null
}
