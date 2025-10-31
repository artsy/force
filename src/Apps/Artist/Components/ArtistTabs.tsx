import { RouteTab, RouteTabs } from "Components/RouteTabs"

export const ArtistTabs = ({ slug }: { slug: string }) => {
  return (
    <RouteTabs data-test="navigationTabs">
      <RouteTab exact to={`/artist/${slug}`}>
        Artworks
      </RouteTab>

      <RouteTab to={`/artist/${slug}/auction-results`}>
        Auction Results
      </RouteTab>

      <RouteTab to={`/artist/${slug}/about`}>About</RouteTab>
    </RouteTabs>
  )
}
