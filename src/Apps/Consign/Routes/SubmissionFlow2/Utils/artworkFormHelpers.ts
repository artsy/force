import { ArtworkModel } from "Apps/Consign/Routes/SubmissionFlow2/Utils/artworkModel"

export const getArtworkFormInitialValues = (): ArtworkModel => {
  return {
    submissionId: null,
    artist: "",
    artistId: "",
    attributionClass: null,
    category: null,
    depth: "",
    dimensionsMetric: "in",
    editionNumber: "",
    editionSizeFormatted: "",
    height: "",
    location: {
      city: "",
      state: "",
      country: "",
      countryCode: "",
    },
    medium: "",
    myCollectionArtworkID: null,
    provenance: "",
    signature: null,
    source: null,
    state: "DRAFT",
    utmMedium: "",
    utmSource: "",
    utmTerm: "",
    width: "",
    title: "",
    year: "",

    // Photos
    photos: [],
    initialPhotos: [],

    // Contact information
    userName: "",
    userEmail: "",
    userPhone: "",
  }
}
