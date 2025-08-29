import { useRouter } from "System/Hooks/useRouter"
import { compact } from "lodash"
import { getPageNumber } from "Utils/url"

// Allowlist of valid medium filters for SEO
export const VALID_MEDIUM_FILTERS = [
  "prints",
  "sculpture",
  "painting",
  "work-on-paper",
  "design",
  "photography",
  "drawing",
]

interface UseCanonicalHrefParams {
  isInSeoExperiment: boolean
  href: string
}

export const useCanonicalHref = ({
  isInSeoExperiment,
  href,
}: UseCanonicalHrefParams): string => {
  const { match } = useRouter()
  const additionalGeneIds = compact(match.location.query.additional_gene_ids)
  const page = getPageNumber(match?.location)

  const mediumFilter = additionalGeneIds[0]

  const hasValidMediumFilter =
    !!mediumFilter &&
    // Only allow specific medium types
    VALID_MEDIUM_FILTERS.includes(mediumFilter) &&
    // Only consider it valid if there's exactly one medium filter
    additionalGeneIds.length === 1

  const params: string[] = []

  if (isInSeoExperiment && hasValidMediumFilter) {
    params.push(`additional_gene_ids[0]=${mediumFilter}`)
  }

  if (page > 1) {
    params.push(`page=${page}`)
  }

  return params.length > 0 ? `${href}?${params.join("&")}` : href
}
