// Maps gene slugs to collection slugs for 301 redirects (/gene/:slug → /collection/:slug).
// Add entries here for editorially-driven categories where the collection is the canonical
// destination: "Contemporary X" categories, "Emerging X" categories, and subjective
// subject-matter categories where editorial curation is needed to determine which works to surface.
export const geneToCollectionMap: Record<string, string> = {
  // Editorial / "Contemporary X" same-name pairs → collection is canonical
  "contemporary-african-art": "contemporary-african-art",
  "contemporary-ceramics": "contemporary-ceramics",
  "contemporary-chinese-art": "contemporary-chinese-art",
  "contemporary-photography": "contemporary-photography",
  "contemporary-pop": "contemporary-pop",
  "contemporary-portrait-photography": "contemporary-portrait-photography",
  // Emerging categories → inherently time-bound and editorial
  "emerging-art": "emerging-art",
  "emerging-design": "emerging-design",
  "emerging-photographers": "emerging-photographers",
  // Subjective subject-matter categories requiring editorial selection
  "celebrity-photography": "celebrity-photography",
  "popular-culture": "popular-culture",
  "skyscapes": "skyscapes",
  "women-artists": "women-artists",
  // Curated/editorially-defined collections
  "curators-picks-unique-works-under-25k": "curators-picks-unique-works-under-25k",
  // Legacy gene-to-collection redirects (pre-existing)
  "artists-on-the-rise": "artists-on-the-rise",
  "black-painters-on-our-radar": "black-painters-on-our-radar",
  "contemporary-now": "contemporary-now",
  "finds-under-1000": "finds-under-1000-dollars",
  "finds-under-2500": "finds-under-2500-dollars",
  "finds-under-5000": "finds-under-5000-dollars",
  "finds-under-10000": "finds-under-10000-dollars",
  "finds-under-50000": "finds-under-50000-dollars",
  "iconic-prints": "iconic-prints",
  "our-top-auction-lots": "top-auction-lots",
  "street-art-now-1": "street-art-highlights",
  "the-collectibles-shop": "the-collectibles-shop",
  "trending-this-week": "trending-this-week",
  "trove": "curators-picks-emerging",
  "women-artists-now": "women-artists-to-watch",
}
