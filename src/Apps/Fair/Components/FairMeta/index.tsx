import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber } from "Utils/url"
import type { FairMeta_fair$data } from "__generated__/FairMeta_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairMetaProps {
  fair: FairMeta_fair$data
}

const FairMeta: React.FC<React.PropsWithChildren<FairMetaProps>> = ({
  fair,
}) => {
  const {
    match,
    match: {
      location: { pathname },
    },
  } = useRouter()

  const { name, metaDescription, metaDescriptionFallback, metaImage } = fair

  const page = getPageNumber(match.location)
  const canonicalPath = page > 1 ? `${pathname}?page=${page}` : pathname

  return (
    <MetaTags
      title={`${name} | Artsy`}
      description={metaDescription || metaDescriptionFallback}
      pathname={canonicalPath}
      imageURL={metaImage?.src}
    />
  )
}

export const FairMetaFragmentContainer = createFragmentContainer(FairMeta, {
  fair: graphql`
    fragment FairMeta_fair on Fair {
      name
      metaDescription: summary
      metaDescriptionFallback: about(format: PLAIN)
      metaImage: image {
        src: url(version: "large_rectangle")
      }
    }
  `,
})
