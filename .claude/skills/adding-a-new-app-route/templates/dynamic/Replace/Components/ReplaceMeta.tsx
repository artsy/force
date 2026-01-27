import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import type { ReplaceMeta_artist$data } from "__generated__/ReplaceMeta_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  artist: ReplaceMeta_artist$data
}

const ReplaceMeta: React.FC<React.PropsWithChildren<Props>> = props => {
  const { artist } = props

  const { match } = useRouter()
  const pathname = match?.location?.pathname ?? "/replace"

  return (
    /**
     * Consider whether further metadata such as Open Graph or
     * Schema.org structured data is needed for this content.
     * See Artist app for a comprehensive example.
     */
    <MetaTags
      title="Replace | Artsy"
      description={`Explore ${artist.name} on Artsy.`}
      imageURL={artist.coverArtwork?.image?.large}
      pathname={pathname}
    />
  )
}

export const ReplaceMetaFragmentContainer = createFragmentContainer(
  ReplaceMeta,
  {
    artist: graphql`
      fragment ReplaceMeta_artist on Artist {
        name
        coverArtwork {
          image {
            large: url(version: "large")
          }
        }
      }
    `,
  },
)
