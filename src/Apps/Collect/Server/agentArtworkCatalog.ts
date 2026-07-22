export interface AgentArtwork {
  id: string
  title: string
  artist: string
  medium: string
  priceCents: number
  imageUrl?: string
  link?: string
}

// ⚠️ DEMO DATA — replace each `id` with a REAL acquireable Gravity artwork ID,
// and set `priceCents` near its real listed price. Exchange re-prices
// server-side at purchase, so these prices are only for the agent's
// discovery/display, not the authoritative charge amount.
//
// `imageUrl` is a width-300 preview pulled from Metaphysics for each work, used
// by the chat UI to show a thumbnail alongside a recommendation.
//
// Prices are arranged around the $5,000 confirmation threshold (AgenticBuy in
// Exchange) and the SPT `max_amount` cap, so the demo can show all three beats:
//   • under $5k → buys immediately
//   • over $5k  → triggers confirmation_required
//   • over cap  → declined by Stripe at the payment rail
export const AGENT_ARTWORK_CATALOG: AgentArtwork[] = [
  {
    id: "nicolas-party-cats-head-2",
    title: "Cat's Head",
    artist: "Nicolas Party",
    medium: "Bronze",
    priceCents: 500000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=300&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FPqR0DUpdWVp8vYeeI_PZPw%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/nicolas-party-cats-head-2",
  },
  {
    id: "heidi-lanino-folded-female-in-pink-ii",
    title: "Folded Female in Pink II",
    artist: "Heidi Lanino",
    medium: "Mixed Media on Canvas",
    priceCents: 500000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=392&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F043vjphX0iyRfTTBL3iczA%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/heidi-lanino-folded-female-in-pink-ii",
  },
  {
    id: "cami-james-girls-weekend",
    title: "Girls Weekend",
    artist: "Cami James",
    medium:
      "Stoneware, Stainless Steel Piercings, Aluminum Paint, Palladium Glaze",
    priceCents: 450000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=400&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8TePtKufnclvkjXIbrkZiQ%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/cami-james-girls-weekend",
  },
  {
    id: "bix-archer-my-life-before-dawn",
    title: "My Life Before Dawn",
    artist: "Bix Archer",
    medium: "Oil on wood panel",
    priceCents: 475000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=200&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FAJZNmygG6W8El8m1uRQ4Dg%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/bix-archer-my-life-before-dawn",
  },
  {
    id: "slim-aarons-party-in-bermuda-6",
    title: "Party In Bermuda",
    artist: "Slim Aarons",
    medium: "Color C-Type Print",
    priceCents: 550000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=449&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F1HTnw_YWiKWOxwpZdsyFCw%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/slim-aarons-party-in-bermuda-6",
  },
  {
    id: "hessam-abrishami-midsummer-night-1",
    title: "Midsummer Night",
    artist: "Hessam Abrishami",
    medium: "Oil on Canvas",
    priceCents: 499500,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=322&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FzVr5muAvg4E_6foc9XrPeA%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/hessam-abrishami-midsummer-night-1",
  },
  {
    id: "wadei-khaled-a-prayer-for-rain",
    title: "A prayer for rain",
    artist: "Wadei Khaled",
    medium: "Watercolor and ink on paper",
    priceCents: 450000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=380&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FV32YDwG2SHsXgybv6y273A%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/wadei-khaled-a-prayer-for-rain",
  },
  {
    id: "jim-dine-dutch-hearts-23",
    title: "Dutch Hearts",
    artist: "Jim Dine",
    medium: "Lithograph",
    priceCents: 475000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=300&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fu47_AmniDrwS18mA-QPM1g%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/jim-dine-dutch-hearts-23",
  },
  {
    id: "richard-renaldi-4-04",
    title: "4:04",
    artist: "Richard Renaldi",
    medium: "Archival pigment print",
    priceCents: 500000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=375&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FEM7dpviQwe-lOubdhG8w_g%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/richard-renaldi-4-04",
  },
  {
    id: "stephanie-serpick-quiet-light-number-7",
    title: "Quiet Light #7",
    artist: "Stephanie Serpick",
    medium: "Oil on panel",
    priceCents: 500000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=238&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FQD3DZ930V74pwUmuj33_3Q%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/stephanie-serpick-quiet-light-number-7",
  },
  {
    id: "anne-lindberg-flash-moon",
    title: "flash: moon",
    artist: "Anne Lindberg",
    medium: "Graphite and colored pencil on mat board",
    priceCents: 700000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=277&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FwyW0sk3vjVQtZfeR_i3z0w%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/anne-lindberg-flash-moon",
  },
  {
    id: "samira-abbassy-tree-spirits-1",
    title: "Tree Spirits",
    artist: "Samira Abbassy",
    medium: "Collage, acrylic and gouache on art board, unframed",
    priceCents: 750000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=223&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FnkhW6-JG8NiYydalPcsqIA%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/samira-abbassy-tree-spirits-1",
  },
  {
    id: "kevork-mourad-the-waterfall",
    title: "The Waterfall",
    artist: "Kevork Mourad",
    medium: "Acrylic on canvas",
    priceCents: 1200000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=296&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FAcwxvm9OoEkCeZZCwCzNiw%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/kevork-mourad-the-waterfall",
  },
  {
    id: "yayoi-kusama-town-9",
    title: "Town",
    artist: "Yayoi Kusama",
    medium: "Etching on paper",
    priceCents: 1245000,
    imageUrl:
      "https://d196wkiy8qx2u5.cloudfront.net?height=334&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKawejHLmbAxAjvbv49DrVA%2Flarge.jpg&width=300",
    link: "https://staging.artsy.net/artwork/yayoi-kusama-town-9",
  },
]

// Demo behavior: ignore the query and return the catalog in a random order, so
// results always come back and feel fresh. Every work stays reachable, which
// keeps all three guardrail beats available regardless of how the collector
// phrases the request.
export const searchAgentArtworks = (): AgentArtwork[] => {
  return [...AGENT_ARTWORK_CATALOG].sort(() => Math.random() - 0.5)
}
