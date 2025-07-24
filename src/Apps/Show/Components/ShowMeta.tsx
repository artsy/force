import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import type { ShowMeta_show$data } from "__generated__/ShowMeta_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ShowMetaProps {
  show: ShowMeta_show$data
}

const ShowMeta: React.FC<React.PropsWithChildren<ShowMetaProps>> = ({
  show: {
    name,
    href,
    metaDescription,
    metaImage,
    partner,
    formattedStartAt,
    formattedEndAt,
  },
}) => {
  const router = useRouter()

  // Fallback to current href if show is not `displayable`
  const fallbackHref = router.match.location.pathname
  const fallbackDescription = `Explore ${name} presented by ${
    partner ? `${partner.name} on` : ""
  } Artsy. On view from ${formattedStartAt} to ${formattedEndAt}.`

  return (
    <MetaTags
      title={`${name} | Artsy`}
      description={metaDescription || fallbackDescription}
      pathname={href || fallbackHref}
      imageURL={metaImage?.src}
    />
  )
}

export const ShowMetaFragmentContainer = createFragmentContainer(ShowMeta, {
  show: graphql`
    fragment ShowMeta_show on Show {
      name
      href
      metaDescription: description
      metaImage {
        src: url(version: ["main", "normalized", "larger", "large"])
      }
      partner {
        ... on Partner {
          name
        }
      }
      formattedStartAt: startAt(format: "MMMM D")
      formattedEndAt: endAt(format: "MMMM D, YYYY")
    }
  `,
})
