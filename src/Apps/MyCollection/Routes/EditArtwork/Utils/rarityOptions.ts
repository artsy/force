export const rarityOptions = [
  {
    name: "Select a Сlassification",
    text: "Select a Сlassification",
    value: "",
  },
  {
    name: "Unique",
    text: "Unique",
    value: "UNIQUE",
    description: "One-of-a-kind piece.",
  },
  {
    name: "Limited edition",
    text: "Limited Edition",
    value: "LIMITED_EDITION",
    description:
      "The edition run has ended; the number of works produced is known and included in the listing.",
  },
  {
    name: "Open edition",
    text: "Open Edition",
    value: "OPEN_EDITION",
    description:
      "The edition run is ongoing. New works are still being produced, which may be numbered. This includes made-to-order works.",
  },
  {
    name: "Unknown edition",
    text: "Unknown Edition",
    value: "UNKNOWN_EDITION",
    description:
      "The edition run has ended; it is unclear how many works were produced. Our partners are responsible for providing accurate classification information for all works.",
  },
]

export const getAttributionClassByName = (name: string | null | undefined) =>
  rarityOptions.find(option => option.name === name)?.value
