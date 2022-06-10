import { Column, Image, GridColumns, Text, ResponsiveBox } from "@artsy/palette"
import { CollectionsHubsNav_marketingCollections } from "v2/__generated__/CollectionsHubsNav_marketingCollections.graphql"
import { useTracking } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { cropped } from "v2/Utils/resized"
import { RouterLink } from "v2/System/Router/RouterLink"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections
}

// TODO: Move this into collect app
export const CollectionsHubsNav: FC<CollectionsHubsNavProps> = props => {
  const { trackEvent } = useTracking()

  return (
    <GridColumns as="aside">
      {props.marketingCollections.slice(0, 6).map(hub => {
        const image = hub.thumbnail
          ? cropped(hub.thumbnail, { width: 387, height: 218 })
          : null

        return (
          <Column span={[6, 4, 2]} key={hub.slug}>
            <RouterLink
              display="block"
              textDecoration="none"
              to={`/collection/${hub.slug}`}
              onClick={() => {
                trackEvent({
                  action_type: Schema.ActionType.Click,
                  context_page: Schema.PageName.CollectPage,
                  context_module: Schema.ContextModule.CollectionHubEntryPoint,
                  type: Schema.Type.Thumbnail,
                  destination_path: `/collection/${hub.slug}`,
                })
              }}
            >
              <ResponsiveBox
                aspectWidth={387}
                aspectHeight={218}
                maxWidth="100%"
                bg="black10"
              >
                {image && (
                  <Image
                    {...image}
                    width="100%"
                    height="100%"
                    alt=""
                    lazyLoad
                  />
                )}
              </ResponsiveBox>

              <Text variant="xs" mt={0.5}>
                {hub.title}
              </Text>
            </RouterLink>
          </Column>
        )
      })}
    </GridColumns>
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
