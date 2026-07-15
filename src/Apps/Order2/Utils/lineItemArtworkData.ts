export const extractLineItemArtworkData = (lineItem: any) => {
  const artworkVersion = lineItem?.artworkVersion
  const artworkOrEditionSet = lineItem?.artworkOrEditionSet
  const artwork = lineItem?.artwork

  const isArtworkOrEdition =
    artworkOrEditionSet &&
    (artworkOrEditionSet.__typename === "Artwork" ||
      artworkOrEditionSet.__typename === "EditionSet")

  return {
    artworkInternalID: artwork?.internalID ?? "",
    artistNames: artworkVersion?.artistNames ?? "",
    title: artworkVersion?.title ?? "",
    date: artworkVersion?.date ?? "",
    price: isArtworkOrEdition ? (artworkOrEditionSet.price ?? "") : "",
    attributionClass: artworkVersion?.attributionClass ?? null,
    image: artworkVersion?.image ?? artwork?.images?.[0] ?? null,
    dimensions: isArtworkOrEdition ? artworkOrEditionSet.dimensions : null,
    framedDimensions: isArtworkOrEdition
      ? artworkOrEditionSet.framedDimensions
      : null,
  }
}
