export const PROVENANCE_LIST = [
  "",
  "Purchased directly from gallery",
  "Purchased directly from artist",
  "Purchased at auction",
  "Gift from the artist",
  "Other",
  "I don’t know",
].map(provenance => ({
  value: provenance,
  text: provenance || "Select",
}))
