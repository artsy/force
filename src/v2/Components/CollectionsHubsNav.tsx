import { CSSGrid, Text } from "@artsy/palette"
import { CollectionsHubsNav_marketingCollections } from "v2/__generated__/CollectionsHubsNav_marketingCollections.graphql"
import { useTracking } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { resize } from "v2/Utils/resizer"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections
}

export const CollectionsHubsNav: FC<CollectionsHubsNavProps> = props => {
  const { trackEvent } = useTracking()

  return (
    <CSSGrid
      as="aside"
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(6, 1fr)",
      ]}
      gridGap={20}
    >
      {props.marketingCollections.slice(0, 6).map(hub => (
        <ImageLink
          to={`/collection/${hub.slug}`}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          src={resize(hub.thumbnail, { width: 357, height: 175 })}
          ratio={[0.49]}
          title={
            <Text variant="text" px={1}>
              {hub.title}
            </Text>
          }
          key={hub.slug}
          onClick={() => {
            trackEvent({
              action_type: Schema.ActionType.Click,
              context_page: Schema.PageName.CollectPage,
              context_module: Schema.ContextModule.CollectionHubEntryPoint,
              type: Schema.Type.Thumbnail,
              destination_path: `/collection/${hub.slug}`,
            })
          }}
        />
      ))}
    </CSSGrid>
  )
}

export const CollectionsHubsNavFragmentContainer = createFragmentContainer(
  CollectionsHubsNav,
  {
    marketingCollections: graphql`
      fragment CollectionsHubsNav_marketingCollections on MarketingCollection
        @relay(plural: true) {
        slug
        title
        thumbnail
      }
    `,
  }
)
