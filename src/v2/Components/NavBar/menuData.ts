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
        text: "Leading Women Artists of the 20th Century",
        href: "/collection/women-artists-20th-century",
      },
      {
        text: "Black Figurative Painters on the Rise",
        href: "/collection/black-figurative-painters",
      },
      {
        text: "Contemporary Masters of Craft Techniques",
        href: "/collection/the-rise-of-craft",
      },
      {
        text: "Emerging Abstract Painters to Watch",
        href: "/collection/emerging-abstract-painting",
        dividerBelow: true,
      },
      {
        text: "Career Stage",
        menu: {
          title: "Career Stage",
          links: [
            {
              text: "New & Noteworthy Artists",
              href: "/collection/new-and-noteworthy-artists",
            },
            {
              text: "Trending Emerging Artists",
              href: "/collection/trending-emerging-artists",
            },
            {
              text: "Critically-Acclaimed Artists",
              href: "/collection/critically-acclaimed-artists",
            },
            {
              text: "Blue Chip Artists",
              href: "/collection/blue-chip-artists",
            },
          ],
        },
      },
      {
        text: "Art Movements",
        menu: {
          title: "Art Movements",
          links: [
            {
              text: "Contemporary",
              href: "/collection/contemporary",
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
              text: "Surrealism",
              href: "/collection/surrealism",
            },
            {
              text: "Abstract Expressionism",
              href: "/collection/abstract-expressionism",
            },
            {
              text: "Pop Art",
              href: "/collection/pop-art",
            },
            {
              text: "Minimalism",
              href: "/collection/minimalism",
            },
            {
              text: "Street Art",
              href: "/collection/street-art",
            },
          ],
        },
      },
      {
        text: "Artist Nationality & Region",
        menu: {
          title: "Artist Nationality & Region",
          links: [
            {
              text: "American",
              href: "/collection/american-artists",
            },
            {
              text: "British",
              href: "/collection/british-artists",
            },
            {
              text: "Canadian",
              href: "/collection/canadian-artists",
            },
            {
              text: "Chinese",
              href: "/collection/chinese-artists",
            },
            {
              text: "French",
              href: "/collection/french-artists",
            },
            {
              text: "German",
              href: "/collection/german-artists",
            },
            {
              text: "Italian",
              href: "/collection/italian-artists",
            },
            {
              text: "Japanese",
              href: "/collection/japanese-artists",
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
              text: "Australian & Oceanian",
              href: "/collection/oceanian-artists",
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
            {
              text: "Scandinavian",
              href: "/collection/scandinavian-artists",
            },
            {
              text: "South Asian",
              href: "/collection/south-asian-artists",
            },
          ],
        },
      },
      {
        text: "Top Artists",
        menu: {
          title: "Top Artists",
          links: [
            {
              text: "Yayoi Kusama",
              href: "/artist/yayoi-kusama",
            },
            {
              text: "Roy Lichtenstein",
              href: "/artist/roy-lichtenstein",
            },
            {
              text: "Cindy Sherman",
              href: "/artist/cindy-sherman",
            },
            {
              text: "Keith Haring",
              href: "/artist/keith-haring",
            },
            {
              text: "David Hockney",
              href: "/artist/david-hockney",
            },
            {
              text: "Katherine Bernhardt",
              href: "/artist/katherine-bernhardt",
            },
            {
              text: "Kehinde Wiley",
              href: "/artist/kehinde-wiley",
            },
            {
              text: "Ed Ruscha",
              href: "/artist/ed-ruscha",
            },
            {
              text: "Banksy",
              href: "/artist/banksy",
            },
          ],
        },
        dividerBelow: true,
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
        text: "New this Week",
        href: "/collection/new-this-week",
      },
      {
        text: "Trending this Month",
        href: "/collection/highlights-this-month",
      },
      {
        text: "Exclusively on Artsy",
        href: "/collection/exclusively-on-artsy",
      },
      {
        text: "Closing Soon",
        href: "/collect?at_auction=true",
        dividerBelow: true,
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
              text: "Works on Paper",
              href: "/collection/works-on-paper",
            },
            {
              text: "Sculpture",
              href: "/collection/sculpture",
            },
            {
              text: "Photography",
              href: "/collection/photography",
            },
            {
              text: "Textile Arts",
              href: "/collection/textile-art",
            },
            {
              text: "Ceramics",
              href: "/collection/ceramics",
            },
            {
              text: "Design",
              href: "/collection/design",
            },
          ],
        },
      },
      {
        text: "Genre",
        menu: {
          title: "Genre",
          links: [
            {
              text: "Abstraction",
              href: "/collection/abstract-art",
            },
            {
              text: "Figuration",
              href: "/collection/figurative-art",
            },
            {
              text: "Hyperrealism",
              href: "/collection/hyperrrealism",
            },
            {
              text: "Portraits",
              href: "/collection/portraits",
            },
            {
              text: "Landscapes",
              href: "/collection/landscapes",
            },
            {
              text: "Still Lifes",
              href: "/collection/still-lifes",
            },
          ],
        },
      },
      {
        text: "Rarity",
        menu: {
          title: "Rarity",
          links: [
            {
              text: "Unique",
              href: "/collection/unique-works",
            },
            {
              text: "Limited Edition",
              href: "/collection/limited-edition-works",
            },
            {
              text: "Open Edition",
              href: "/collection/open-edition-works",
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
              text: "$10,000–$50,000",
              href: "/collect?price_range=10000-50000",
            },
            {
              text: "$5,000–$10,000",
              href: "/collect?price_range=5000-10000",
            },
            {
              text: "$1,000–$5,000",
              href: "/collect?price_range=1000-5000",
            },
            {
              text: "Under $1,000",
              href: "/collect?price_range=%2A-1000",
            },
          ],
        },
      },
      {
        text: "Seller Location",
        menu: {
          title: "Seller Location",
          links: [
            {
              text: "New York City",
              href: "/collection/new-york-spotlight",
            },
            {
              text: "Los Angeles",
              href: "/collection/los-angeles-spotlight",
            },
            {
              text: "London",
              href: "/collection/london-gallery-spotlight",
            },
            {
              text: "Berlin",
              href: "/collection/berlin-gallery-spotlight",
            },
            {
              text: "Paris",
              href: "/collection/paris-gallery-spotlight",
            },
            {
              text: "Hong Kong",
              href: "/collection/hong-kong-gallery-spotlight",
            },
            {
              text: "Mexico City",
              href: "/collection/mexico-city-gallery-spotlight",
            },
            {
              text: "More",
              href: "/galleries",
            },
          ],
        },
        dividerBelow: true,
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
