import { MetaTags } from "Components/MetaTags"
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
  const fallbackDescription = `Explore ${name} from ${
    partner ? `${partner.name} on` : ""
  } Artsy. ${formattedStartAt} - ${formattedEndAt}.`

  return (
    <MetaTags
      title={`${name} | Artsy`}
      description={metaDescription || fallbackDescription}
      pathname={href}
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
