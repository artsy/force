import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { compact } from "lodash"
import { uuid } from "uuid"
import { MyCollectionEditArtwork_artwork$data } from "__generated__/MyCollectionEditArtwork_artwork.graphql"
import { Artist, ArtworkModel, MyCollectionPhoto } from "./artworkModel"
import { getAttributionClassByName } from "./rarityOptions"

export const getMyCollectionArtworkFormInitialValues = (
  artwork?: MyCollectionEditArtwork_artwork$data
): ArtworkModel => ({
  artistId: artwork?.artist?.internalID ?? "",
  artistName: artwork?.artist?.name ?? "",
  artist: artwork?.artist as Artist,
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
  photos: compact(artwork?.images),
  newPhotos: [],
  pricePaidDollars: artwork?.pricePaid
    ? (artwork?.pricePaid.minor / 100).toString()
    : "",
  pricePaidCurrency: artwork?.pricePaid?.currencyCode ?? "USD",
  provenance: artwork?.provenance ?? "",
  collectorLocation: artwork?.collectorLocation,
  confidentialNotes: artwork?.confidentialNotes ?? "",
})

export const MyCollectionPhotoToPhoto = (photo: MyCollectionPhoto): Photo => {
  return {
    id: photo.internalID ?? uuid(),
    assetId: undefined,
    name: "",
    size: undefined,
    geminiToken: undefined,
    abortUploading: undefined,
    progress: undefined,
    removed: false,
    loading: false,
    url: photo.imageURL?.replace(":version", "square"),
  }
}
