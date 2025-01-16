import { useRouter } from "System/Hooks/useRouter"
import { compact } from "lodash"

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

  const mediumFilter = additionalGeneIds[0]

  const hasValidMediumFilter =
    !!mediumFilter &&
    // Only allow specific medium types
    VALID_MEDIUM_FILTERS.includes(mediumFilter) &&
    // Only consider it valid if there's exactly one medium filter
    additionalGeneIds.length === 1

  return isInSeoExperiment && hasValidMediumFilter
    ? `${href}?additional_gene_ids[0]=${mediumFilter}`
    : href
}
