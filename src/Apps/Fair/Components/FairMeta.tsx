import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import type { FairMeta_fair$data } from "__generated__/FairMeta_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairMetaProps {
  fair: FairMeta_fair$data
}

const FairMeta: React.FC<React.PropsWithChildren<FairMetaProps>> = ({
  fair: { name, slug, metaDescription, metaDescriptionFallback, metaImage },
}) => {
  const { match } = useRouter()
  const pathname = match.location.pathname

  if (pathname === `/fair/${slug}`) {
    return null
  }

  return (
    <MetaTags
      title={`${name} | Artsy`}
      description={metaDescription || metaDescriptionFallback}
      pathname={`/fair/${slug}`}
      imageURL={metaImage?.src}
    />
  )
}

export const FairMetaFragmentContainer = createFragmentContainer(FairMeta, {
  fair: graphql`
    fragment FairMeta_fair on Fair {
      name
      slug
      metaDescription: summary
      metaDescriptionFallback: about(format: PLAIN)
      metaImage: image {
        src: url(version: "large_rectangle")
      }
    }
  `,
})
