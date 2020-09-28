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
        text: "Portrayals of Queer Love",
        href: "/collection/queer-love-pride-month-2020",
      },
      {
        text: "Contemporary Women Surrealists",
        href: "/collection/contemporary-women-surrealists",
      },
      {
        text: "Black Figurative Painters on the Rise",
        href: "/collection/black-figurative-painters",
      },
      {
        text: "Modern & Contemporary Masters",
        href: "/collection/master-works",
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
        text: "Artist Nationality & Region",
        menu: {
          title: "Artist Nationality & Region",
          links: [
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
              text: "North American",
              href: "/collection/north-american-artists",
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
              text: "Agnes Martin",
              href: "/artist/agnes-martin/works-for-sale",
            },
            {
              text: "Julie Mehretu",
              href: "/artist/julie-mehretu/works-for-sale",
            },
            {
              text: "Eddie Martinez",
              href: "/artist/eddie-martinez/works-for-sale",
            },
            {
              text: "Otis Kwame Kye Quaicoe",
              href: "/artist/otis-kwame-kye-quaicoe/works-for-sale",
            },
            {
              text: "Zanele Muholi",
              href: "/artist/zanele-muholi/works-for-sale",
            },
            {
              text: "Lee Ufan",
              href: "/artist/lee-ufan/works-for-sale",
            },
            {
              text: "Massimo Vitali",
              href: "/artist/massimo-vitali/works-for-sale",
            },
          ],
        },
      },
      {
        text: "Top Categories",
        menu: {
          title: "Top Categories",
          links: [
            {
              text: "In-Demand Artists",
              href: "/collection/in-demand-artists",
            },
            {
              text: "Emerging Painters",
              href: "/collection/emerging-painters",
            },
            {
              text: "Critically Acclaimed Photographers",
              href: "/collection/critically-acclaimed-photographers",
            },
            {
              text: "Notable Street Artists",
              href: "/collection/notable-street-artists",
            },
            {
              text: "Limited-Edition Prints by Leading Artists",
              href: "/collection/limited-edition-prints-trending-artists",
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
        text: "New This Week",
        href: "/collection/new-this-week",
      },
      {
        text: "What’s Trending",
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
              text: "Nonprofit Shops",
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
              text: "Drawing",
              href: "/collection/drawing",
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
