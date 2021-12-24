import { MetaTags } from "v2/Components/MetaTags"
import { useRouter } from "v2/System/Router/useRouter"

export const AlgoliaResultsMeta = () => {
  const { match } = useRouter()
  const {
    location: {
      query: { query },
      search,
      pathname,
    },
  } = match
  const title = `Search Results for '${query}' | Artsy`

  return <MetaTags title={title} pathname={`${pathname}${search}`} />
}
