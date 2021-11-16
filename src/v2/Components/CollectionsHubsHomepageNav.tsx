import { CSSGrid, Text } from "@artsy/palette"
import { CollectionsHubsHomepageNav_marketingHubCollections } from "v2/__generated__/CollectionsHubsHomepageNav_marketingHubCollections.graphql"
import { AnalyticsSchema } from "v2/System/Analytics"
import { createFragmentContainer, graphql } from "react-relay"
import track, { useTracking } from "react-tracking"
import Events from "v2/Utils/Events"
import { resize } from "v2/Utils/resizer"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsHomepageNavProps {
  marketingHubCollections: CollectionsHubsHomepageNav_marketingHubCollections
}

export const CollectionsHubsHomepageNav = track(
  {
    context_page: AnalyticsSchema.PageName.HomePage,
    context_module: AnalyticsSchema.ContextModule.CollectionHubEntryPoint,
    subject: AnalyticsSchema.Subject.FeaturedCategories,
  },
  { dispatch: data => Events.postEvent(data) }
)((props: CollectionsHubsHomepageNavProps) => {
  const { trackEvent } = useTracking()
  return (
    <CSSGrid
      as="aside"
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gridGap={20}
    >
      {props.marketingHubCollections.slice(0, 6).map(hub => (
        <ImageLink
          to={`/collection/${hub.slug}`}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          src={resize(hub.thumbnail, { width: 357, height: 175 })}
          ratio={[0.49]}
          title={<Text variant="text">{hub.title}</Text>}
          subtitle={<Text variant="caption">{subtitleFor(hub.title)}</Text>}
          key={hub.slug}
          onClick={() => {
            trackEvent({
              action_type: AnalyticsSchema.ActionType.Click,
              type: AnalyticsSchema.Type.Thumbnail,
              desination_path: `/collection/${hub.slug}`,
            })
          }}
        />
      ))}
    </CSSGrid>
  )
})

export const CollectionsHubsHomepageNavFragmentContainer = createFragmentContainer(
  CollectionsHubsHomepageNav,
  {
    marketingHubCollections: graphql`
      fragment CollectionsHubsHomepageNav_marketingHubCollections on MarketingCollection
        @relay(plural: true) {
        # TODO: Need to add this field back to the MP schema. Even if it's not a
        #       Node ID /yet/, it can still be used for relay store purposes.
        # id
        slug
        title
        thumbnail
      }
    `,
  }
)

/*
 * This is a customization just for the homepage entry-points use case.
 *
 * Valid hub collections will have a subtitle defined here, rather than in KAWS.
 * This mapping therefore will need to kept in sync as hubs are rotated
 * in/out of the entrypoint.
 *
 * TODO: remove (or replace with safer) placeholder once we have real data.
 */

const subtitlesMapping = {
  Contemporary: "Today’s leading artists and emerging talents",
  "Post-War": "From Abstract Expressionism to Pop Art",
  "Impressionist & Modern": "The birth of abstraction, Surrealism, and Dada",
  "Pre-20th Century": "Ancient Rome, the Renaissance, Baroque, and more",
  Photography: "Through the lens—from daguerreotypes to digital",
  "Street Art": "The rise of graffiti, vinyl toys, and skate culture",
}

const subtitleFor = (title: string) => {
  return subtitlesMapping[title]
}
