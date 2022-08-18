import { MyCollectionArtworkForm_artwork } from "__generated__/MyCollectionArtworkForm_artwork.graphql"
import { ArtworkModel } from "./artworkModel"
import { getAttributionClassByName } from "./rarityOptions"

export const getMyCollectionArtworkFormInitialValues = (
  artwork?: MyCollectionArtworkForm_artwork
): ArtworkModel => ({
  artistId: artwork?.artist?.internalID ?? "",
  artistName: artwork?.artist?.name ?? "",
  category: artwork?.category ?? "",
  date: artwork?.date ?? "",
  title: artwork?.title ?? "",
  medium: artwork?.medium ?? "",
  attributionClass: getAttributionClassByName(artwork?.attributionClass?.name),
  editionNumber: artwork?.editionNumber ?? undefined,
  editionSize: artwork?.editionSize ?? undefined,
  height: artwork?.height ?? "",
  width: artwork?.width ?? "",
  depth: artwork?.depth ?? "",
  metric: artwork?.metric ?? "in",
  pricePaidDollars: artwork?.pricePaid
    ? (artwork?.pricePaid.minor / 100).toString()
    : "",
  pricePaidCurrency: artwork?.pricePaid?.currencyCode ?? "USD",
  provenance: artwork?.provenance ?? "",
  artworkLocation: artwork?.artworkLocation ?? "",
})
