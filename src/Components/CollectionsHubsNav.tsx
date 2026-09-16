import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Column, GridColumns, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { CollectionsHubsNav_genes$data } from "__generated__/CollectionsHubsNav_genes.graphql"
import type { CollectionsHubsNav_marketingCollections$data } from "__generated__/CollectionsHubsNav_marketingCollections.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections$data
  genes: CollectionsHubsNav_genes$data
}

type HubTileImage = NonNullable<
  CollectionsHubsNav_marketingCollections$data[number]["thumbnailImage"]
>["cropped"]

interface HubTile {
  key: string
  href: string
  title: string | null | undefined
  image: HubTileImage
}

// TODO: Move this into collect app
export const CollectionsHubsNav: FC<
  React.PropsWithChildren<CollectionsHubsNavProps>
> = props => {
  const { trackEvent } = useTracking()

  const collectionTiles: HubTile[] = props.marketingCollections.map(
    collection => ({
      key: `collection-${collection.slug}`,
      href: `/collection/${collection.slug}`,
      title: collection.title,
      image: collection.thumbnailImage?.cropped ?? null,
    }),
  )

  const geneTiles: HubTile[] = (props.genes ?? [])
    .filter(gene => !!gene)
    .map(gene => ({
      key: `gene-${gene.slug}`,
      href: `/gene/${gene.slug}`,
      title: gene.name,
      image: gene.image?.cropped ?? null,
    }))

  const tiles = [...collectionTiles, ...geneTiles].slice(0, 6)

  return (
    <GridColumns as="aside">
      {tiles.map(hub => {
        return (
          <Column span={[6, 4, 2]} key={hub.key}>
            <RouterLink
              display="block"
              textDecoration="none"
              to={hub.href}
              onClick={() => {
                trackEvent({
                  action_type: DeprecatedSchema.ActionType.Click,
                  context_page: DeprecatedSchema.PageName.CollectPage,
                  context_module:
                    DeprecatedSchema.ContextModule.CollectionHubEntryPoint,
                  type: DeprecatedSchema.Type.Thumbnail,
                  destination_path: hub.href,
                })
              }}
            >
              <ResponsiveBox
                aspectWidth={387}
                aspectHeight={218}
                maxWidth="100%"
                bg="mono10"
              >
                {hub.image && (
                  <Image
                    {...hub.image}
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
        thumbnailImage {
          cropped(width: 387, height: 218) {
            src
            srcSet
          }
        }
      }
    `,
    genes: graphql`
      fragment CollectionsHubsNav_genes on Gene @relay(plural: true) {
        slug
        name
        image {
          cropped(
            width: 387
            height: 218
            version: ["big_and_tall", "square500", "tall"]
          ) {
            src
            srcSet
          }
        }
      }
    `,
  },
)
