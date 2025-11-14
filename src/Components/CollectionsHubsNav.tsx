import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Column, GridColumns, Image, ResponsiveBox, Text } from "@artsy/palette"
import type { CollectionsHubsNav_marketingCollections$data } from "__generated__/CollectionsHubsNav_marketingCollections.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections$data
}

// TODO: Move this into collect app
export const CollectionsHubsNav: FC<
  React.PropsWithChildren<CollectionsHubsNavProps>
> = props => {
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
                  action_type: DeprecatedSchema.ActionType.Click,
                  context_page: DeprecatedSchema.PageName.CollectPage,
                  context_module:
                    DeprecatedSchema.ContextModule.CollectionHubEntryPoint,
                  type: DeprecatedSchema.Type.Thumbnail,
                  destination_path: `/collection/${hub.slug}`,
                })
              }}
            >
              <ResponsiveBox
                aspectWidth={387}
                aspectHeight={218}
                maxWidth="100%"
                bg="mono10"
              >
                {image && (
                  <Image
                    {...image}
                    width="100%"
                    height="100%"
                    alt=""
                    // LCP optimization
                    lazyLoad={false}
                    fetchPriority="high"
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
  },
)
