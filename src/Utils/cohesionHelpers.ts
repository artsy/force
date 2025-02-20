import {
  ActionType,
  type ClickedArtworkGroup,
  type ContextModule,
  OwnerType,
  type PageOwnerType,
} from "@artsy/cohesion"

export const trackHelpers = {
  clickedArtworkGroup: (
    contextModule: ContextModule,
    contextPageOwnerType: PageOwnerType,
    artworkID: string,
    artworkSlug: string,
    horizontalSlidePosition: number,
    singalBidCount?: number,
    signalLotWatcherCount?: number,
  ): ClickedArtworkGroup => ({
    action: ActionType.clickedArtworkGroup,
    destination_page_owner_id: artworkID,
    destination_page_owner_slug: artworkSlug,
    destination_page_owner_type: OwnerType.artwork,
    context_module: contextModule,
    context_page_owner_type: contextPageOwnerType,
    horizontal_slide_position: horizontalSlidePosition,
    type: "thumbnail",
    signal_bid_count: singalBidCount,
    signal_lot_watcher_count: signalLotWatcherCount,
  }),
}
