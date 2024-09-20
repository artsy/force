import { FC } from "react"
import { ArticleSectionMarketingCollection_section$data } from "__generated__/ArticleSectionMarketingCollection_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { Rail } from "Components/Rail/Rail"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { ResponsiveBox } from "@artsy/palette"

export const OPTIMAL_READING_WIDTH = "65ch"

interface ArticleSectionMarketingCollectionProps {
  section: ArticleSectionMarketingCollection_section$data
}

const ArticleSectionMarketingCollection: FC<ArticleSectionMarketingCollectionProps> = ({
  section,
}) => {
  const artworks = extractNodes(section.collection?.artworksConnection)

  console.log("SECTION: ", artworks)

  if (artworks.length === 0) {
    return null
  }

  return (
    <ResponsiveBox>
      <Rail
        title={"<SOME DESCRIPTIVE TEXT>"}
        subTitle={section.collection?.title || ""}
        viewAllLabel="View All Works"
        viewAllHref={`/collection/${section.slug}`}
        // viewAllOnClick={() => {
        //   const trackingEvent: ClickedArtworkGroup = {
        //     action: ActionType.clickedArtworkGroup,
        //     context_module: ContextModule.troveArtworksRail,
        //     context_page_owner_type: OwnerType.home,
        //     destination_page_owner_type: OwnerType.collection,
        //     destination_page_owner_id: "932d0b13-3cf1-46d1-8e49-18b186230347",
        //     destination_page_owner_slug: "curators-picks-emerging",
        //     type: "viewAll",
        //   }
        //   trackEvent(trackingEvent)
        // }}
        getItems={() => {
          return artworks.map(artwork => (
            <ShelfArtworkFragmentContainer
              artwork={artwork}
              key={artwork.internalID}
              lazyLoad
              // TODO: add troveArtworksRail to the union type of auth context module
              // @ts-ignore
              // contextModule={ContextModule.troveArtworksRail}
              // onClick={() => {
              //   const trackingEvent: ClickedArtworkGroup = {
              //     action: ActionType.clickedArtworkGroup,
              //     context_module: ContextModule.troveArtworksRail,
              //     context_page_owner_type: OwnerType.home,
              //     destination_page_owner_type: OwnerType.artwork,
              //     destination_page_owner_id: artwork.internalID,
              //     destination_page_owner_slug: artwork.slug,
              //     type: "thumbnail",
              //     signal_label: artwork.collectorSignals
              //       ? getSignalLabel(artwork.collectorSignals)
              //       : "",
              //     signal_bid_count:
              //       artwork.collectorSignals?.auction?.bidCount ?? undefined,
              //     signal_lot_watcher_count:
              //       artwork.collectorSignals?.auction?.lotWatcherCount ??
              //       undefined,
              //   }
              //   trackEvent(trackingEvent)
              // }}
            />
          ))
        }}
      />
    </ResponsiveBox>
  )
}

export const ArticleSectionMarketingCollectionFragmentContainer = createFragmentContainer(
  ArticleSectionMarketingCollection,
  {
    section: graphql`
      fragment ArticleSectionMarketingCollection_section on ArticleSectionCollection {
        slug
        collection {
          title
          artworksConnection(first: 20) {
            edges {
              node {
                internalID
                slug
                href
                ...ShelfArtwork_artwork
              }
            }
          }
        }
      }
    `,
  }
)
