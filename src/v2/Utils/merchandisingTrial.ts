import { getENV } from "./getENV"

const TARGETED_ARTIST_SLUGS = [
  "jeff-koons",
  "marina-abramovic-1",
  "cindy-sherman",
  "tracey-emin",
  "jonas-wood",
  "andy-warhol",
  "salvador-dali",
  "shepard-fairey",
  "pablo-picasso",
  "takashi-murakami",
  "kaws",
  "alex-katz",
  "joan-miro",
  "damien-hirst",
  "hunt-slonem",
  "keith-haring",
  "marc-chagall",
  "mr-brainwash",
  "banksy",
  "henri-matisse",
  "jim-dine",
  "david-hockney",
  "robert-rauschenberg",
  "sebastiao-salgado",
  "roy-lichtenstein",
  "victor-vasarely",
  "robert-motherwell",
  "david-shrigley",
  "julian-opie",
  "alexander-calder",
  "daniel-arsham",
  "david-lachapelle",
  "ed-ruscha",
  "ellsworth-kelly",
  "frank-stella",
  "gerhard-richter",
  "hiroshi-sugimoto",
  "invader",
  "jean-michel-basquiat",
  "john-baldessari",
  "josef-albers",
  "kenny-scharf",
  "nobuyoshi-araki",
  "richard-serra",
  "robert-longo",
  "sol-lewitt",
  "the-connor-brothers",
  "tom-wesselmann",
  "vik-muniz",
  "vivian-maier",
  "william-kentridge",
  "yayoi-kusama",
  "yoshitomo-nara",
]
export const TARGETED_ARTIST_ROUTES = TARGETED_ARTIST_SLUGS.map(slug => {
  return `/artist/${slug}/works-for-sale`
})

export const getDefaultSortValueByVariant = (artistSlug: string) => {
  const variant = getENV("ARTIST_GRID_MANUAL_CURATION_TRIAL")
  const isTargetedArtistSlug = TARGETED_ARTIST_SLUGS.includes(artistSlug)

  if (isTargetedArtistSlug && variant === "control") {
    return "-decayed_merch_uncurated"
  }

  return "-decayed_merch"
}
