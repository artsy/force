export interface MenuData {
  title: string
  links: LinkData[]
}

export type LinkData = MenuLinkData | SimpleLinkData

// e.g. "Editorial"
export interface SimpleLinkData {
  text: string
  href: string
  dividerBelow?: boolean
}

// e.g. "Art Movement >"
export interface MenuLinkData {
  text: string
  menu: MenuData
  dividerBelow?: boolean
}

export const ARTISTS_SUBMENU_DATA: MenuLinkData = {
  text: "Artists",
  menu: {
    title: "Artists",
    links: [
      {
        text: "In-Demand Artists",
        href: "/collection/in-demand-artists",
      },
      {
        text: "Artist's We're Eyeing",
        href: "/collection/artists-we-are-eyeing",
      },
      {
        text: "Artsy Vanguard Artists",
        href: "/collection/artsy-vanguard-artists",
        dividerBelow: true,
      },
      {
        text: "Career Stage",
        menu: {
          title: "Career Stage",
          links: [
            {
              text: "Blue-Chip Artists",
              href: "/collection/blue-chip-artists",
            },
            {
              text: "Critically Acclaimed Artists",
              href: "/collection/critically-acclaimed-artists",
            },
            {
              text: "Trending Emerging Artists",
              href: "/collection/trending-emerging-artists",
            },
            {
              text: "New & Noteworthy Artists",
              href: "/collection/new-and-noteworthy-artists",
            },
          ],
        },
      },
      {
        text: "Popular Categories",
        menu: {
          title: "Popular Categories",
          links: [
            {
              text: "New From Emerging Artists",
              href: "/collection/new-from-emerging-artists",
            },
            {
              text: "Modern & Contemporary Masters",
              href: "/collection/master-works",
            },
            {
              text: "Limited-Edition Prints by Leading Artists",
              href: "/collection/limited-edition-prints-trending-artists",
            },
            {
              text: "Black Figurative Painters",
              href: "/collection/black-figurative-painters",
            },
            {
              text: "Women Artists to Watch",
              href: "/collection/women-painters-on-the-rise",
            },
          ],
        },
        dividerBelow: true,
      },
      {
        text: "Artist Nationality or Ethicity",
        menu: {
          title: "Artist Nationality or Ethicity",
          links: [
            {
              text: "American",
              href: "/collect?artist_nationalities%5B0%5D=American",
            },
            {
              text: "African",
              href: "/collection/african-artists",
            },
            {
              text: "Asian",
              href: "/collection/asian-artists",
            },
            {
              text: "British",
              href: "/collect?artist_nationalities%5B0%5D=British",
            },
            {
              text: "European",
              href: "/collection/european-artists",
            },
            {
              text: "Latin American",
              href: "/collection/latin-american-artists",
            },
            {
              text: "Middle Eastern",
              href: "/collection/middle-eastern-artists",
            },
          ],
        },
      },
      {
        text: "Featured Artists",
        menu: {
          title: "Featured Artists",
          links: [
            {
              text: "Derrick Adams",
              href: "/artist/derrick-adams/works-for-sale",
            },
            {
              text: "Bridget Riley",
              href: "/artist/bridget-riley/works-for-sale",
            },
            {
              text: "Frank Stella",
              href: "/artist/frank-stella/works-for-sale",
            },
            {
              text: "Julian Opie",
              href: "/artist/julian-opie/works-for-sale",
            },
            {
              text: "Judy Chicago",
              href: "/artist/judy-chicago/works-for-sale",
            },
            {
              text: "Etel Adnan",
              href: "/artist/etel-adnan/works-for-sale",
            },
            {
              text: "Mickalene Thomas",
              href: "/artist/mickalene-thomas/works-for-sale",
            },
          ],
        },
      },
      {
        text: "View all artists",
        href: "/artists",
      },
    ],
  },
}

export const ARTWORKS_SUBMENU_DATA: MenuLinkData = {
  text: "Artworks",
  menu: {
    title: "Artworks",
    links: [
      {
        text: "Trove",
        href: "/gene/trove",
      },
      {
        text: "New This Week",
        href: "/collection/new-this-week",
      },
      {
        text: "Trending on Artsy",
        href: "/collection/highlights-this-month",
      },
      {
        text: "Exclusively on Artsy",
        href: "/collection/exclusively-on-artsy",
      },
      {
        text: "Limited Editions",
        href: "/collection/limited-edition-works",
        dividerBelow: true,
      },
      {
        text: "Highlights From",
        menu: {
          title: "Highlights From",
          links: [
            {
              text: "Auction",
              href: "/collection/auction-highlights",
            },
            {
              text: "Art Fairs",
              href: "/collection/art-fair-highlights",
            },
            {
              text: "Gallery Shows",
              href: "/collection/gallery-show-highlights",
            },
            {
              text: "Non-profit Shops",
              href: "/collection/nonprofit-shops",
            },
          ],
        },
      },
      {
        text: "Price",
        menu: {
          title: "Price",
          links: [
            {
              text: "$50,000 and Above",
              href: "/collect?price_range=50000-%2A",
            },
            {
              text: "$25,000–$50,000",
              href: "/collect?price_range=25000-50000",
            },
            {
              text: "$10,000–$25,000",
              href: "/collect?price_range=10000-25000",
            },
            {
              text: "$5,000–$10,000",
              href: "/collect?price_range=5000-10000",
            },
            {
              text: "Under $5,000",
              href: "/collect?price_range=0-5000",
            },
          ],
        },
      },
      {
        text: "Medium",
        menu: {
          title: "Medium",
          links: [
            {
              text: "Painting",
              href: "/collection/painting",
            },
            {
              text: "Prints",
              href: "/collection/prints",
            },
            {
              text: "Photography",
              href: "/collection/photography",
            },
            {
              text: "Sculpture",
              href: "/collection/sculpture",
            },
            {
              text: "Work on Paper",
              href: "/collection/works-on-paper",
            },
            {
              text: "Mixed Media",
              href: "/collection/mixed-media",
            },
            {
              text: "Design",
              href: "/collection/design",
            },
          ],
        },
      },
      {
        text: "Movements",
        menu: {
          title: "Movements",
          links: [
            {
              text: "Contemporary",
              href: "/collection/contemporary",
            },
            {
              text: "Street Art",
              href: "/collection/street-art",
            },
            {
              text: "Pop Art",
              href: "/collection/pop-art",
            },
            {
              text: "Abstract Expressionism",
              href: "/collection/abstract-expressionism",
            },
            {
              text: "Post-War",
              href: "/collection/post-war",
            },
            {
              text: "Impressionism & Modernism",
              href: "/collection/impressionist-and-modern",
            },
            {
              text: "Old Masters",
              href: "/collection/old-masters",
            },
          ],
        },
        dividerBelow: true,
      },
      {
        text: "Subject Matter",
        menu: {
          title: "Subject Matter",
          links: [
            {
              text: "Abstract Art",
              href: "/gene/abstract-art",
            },
            {
              text: "Figurative Art",
              href: "/gene/figurative-art",
            },
            {
              text: "Landscapes",
              href: "/gene/landscapes",
            },
            {
              text: "Still Life",
              href: "/gene/still-life",
            },
          ],
        },
      },
      { text: "View all artworks", href: "/collect" },
    ],
  },
}

export const MENU_DATA: MenuData = {
  title: "", // root menu, so no title
  links: [
    { ...ARTISTS_SUBMENU_DATA },
    { ...ARTWORKS_SUBMENU_DATA },
    {
      text: "Auctions",
      href: "/auctions",
    },
    {
      text: "Viewing Rooms",
      href: "/viewing-rooms",
    },
    {
      text: "Editorial",
      href: "/articles",
    },
    {
      text: "Galleries",
      href: "/galleries",
    },
    {
      text: "Fairs",
      href: "/fairs",
    },
    {
      text: "Shows",
      href: "/shows",
    },
    {
      text: "Museums",
      href: "/institutions",
    },
    {
      text: "Consign",
      href: "/consign",
    },
    {
      text: "Artsy for Galleries",
      href: "/gallery-partnerships",
    },
    // NB. that desktop and mobile currently handle logged-in/out state links
    // such as "log in" or "account" separately
  ],
}
