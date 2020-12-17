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
  menu: {
    links: [
      {
        href: "/collection/queer-love-pride-month-2020",
        text: "Portrayals of Queer Love",
      },
      {
        href: "/collection/contemporary-women-surrealists",
        text: "Contemporary Women Surrealists",
      },
      {
        href: "/collection/black-figurative-painters",
        text: "Black Figurative Painters on the Rise",
      },
      {
        dividerBelow: true,
        href: "/collection/master-works",
        text: "Modern & Contemporary Masters",
      },
      {
        menu: {
          links: [
            {
              href: "/collection/blue-chip-artists",
              text: "Blue-Chip Artists",
            },
            {
              href: "/collection/critically-acclaimed-artists",
              text: "Critically Acclaimed Artists",
            },
            {
              href: "/collection/trending-emerging-artists",
              text: "Trending Emerging Artists",
            },
            {
              href: "/collection/new-and-noteworthy-artists",
              text: "New & Noteworthy Artists",
            },
          ],
          title: "Career Stage",
        },
        text: "Career Stage",
      },
      {
        menu: {
          links: [
            {
              href: "/collection/african-artists",
              text: "African",
            },
            {
              href: "/collection/asian-artists",
              text: "Asian",
            },
            {
              href: "/collection/oceanian-artists",
              text: "Australian & Oceanian",
            },
            {
              href: "/collection/european-artists",
              text: "European",
            },
            {
              href: "/collection/latin-american-artists",
              text: "Latin American",
            },
            {
              href: "/collection/middle-eastern-artists",
              text: "Middle Eastern",
            },
            {
              href: "/collection/north-american-artists",
              text: "North American",
            },
          ],
          title: "Artist Nationality & Region",
        },
        text: "Artist Nationality & Region",
      },
      {
        menu: {
          links: [
            {
              href: "/artist/agnes-martin/works-for-sale",
              text: "Agnes Martin",
            },
            {
              href: "/artist/julie-mehretu/works-for-sale",
              text: "Julie Mehretu",
            },
            {
              href: "/artist/eddie-martinez/works-for-sale",
              text: "Eddie Martinez",
            },
            {
              href: "/artist/otis-kwame-kye-quaicoe/works-for-sale",
              text: "Otis Kwame Kye Quaicoe",
            },
            {
              href: "/artist/zanele-muholi/works-for-sale",
              text: "Zanele Muholi",
            },
            {
              href: "/artist/lee-ufan/works-for-sale",
              text: "Lee Ufan",
            },
            {
              href: "/artist/massimo-vitali/works-for-sale",
              text: "Massimo Vitali",
            },
          ],
          title: "Featured Artists",
        },
        text: "Featured Artists",
      },
      {
        dividerBelow: true,
        menu: {
          links: [
            {
              href: "/collection/in-demand-artists",
              text: "In-Demand Artists",
            },
            {
              href: "/collection/emerging-painters",
              text: "Emerging Painters",
            },
            {
              href: "/collection/critically-acclaimed-photographers",
              text: "Critically Acclaimed Photographers",
            },
            {
              href: "/collection/notable-street-artists",
              text: "Notable Street Artists",
            },
            {
              href: "/collection/limited-edition-prints-trending-artists",
              text: "Limited-Edition Prints by Leading Artists",
            },
          ],
          title: "Top Categories",
        },
        text: "Top Categories",
      },
      {
        href: "/artists",
        text: "View all artists",
      },
    ],
    title: "Artists",
  },
  text: "Artists",
}

export const ARTWORKS_SUBMENU_DATA: MenuLinkData = {
  menu: {
    links: [
      {
        href: "/collection/new-this-week",
        text: "New This Week",
      },
      {
        href: "/collection/highlights-this-month",
        text: "What’s Trending",
      },
      {
        href: "/collection/exclusively-on-artsy",
        text: "Exclusively on Artsy",
      },
      {
        dividerBelow: true,
        href: "/collection/limited-edition-works",
        text: "Limited Editions",
      },
      {
        menu: {
          links: [
            {
              href: "/collection/auction-highlights",
              text: "Auction",
            },
            {
              href: "/collection/art-fair-highlights",
              text: "Art Fairs",
            },
            {
              href: "/collection/gallery-show-highlights",
              text: "Gallery Shows",
            },
            {
              href: "/collection/nonprofit-shops",
              text: "Nonprofit Shops",
            },
          ],
          title: "Highlights From",
        },
        text: "Highlights From",
      },
      {
        menu: {
          links: [
            {
              href: "/collect?price_range=50000-%2A",
              text: "$50,000 and Above",
            },
            {
              href: "/collect?price_range=25000-50000",
              text: "$25,000–$50,000",
            },
            {
              href: "/collect?price_range=10000-25000",
              text: "$10,000–$25,000",
            },
            {
              href: "/collect?price_range=5000-10000",
              text: "$5,000–$10,000",
            },
            {
              href: "/collect?price_range=0-5000",
              text: "Under $5,000",
            },
          ],
          title: "Price",
        },
        text: "Price",
      },
      {
        menu: {
          links: [
            {
              href: "/collection/painting",
              text: "Painting",
            },
            {
              href: "/collection/prints",
              text: "Prints",
            },
            {
              href: "/collection/photography",
              text: "Photography",
            },
            {
              href: "/collection/sculpture",
              text: "Sculpture",
            },
            {
              href: "/collection/drawing",
              text: "Drawing",
            },
            {
              href: "/collection/mixed-media",
              text: "Mixed Media",
            },
            {
              href: "/collection/design",
              text: "Design",
            },
          ],
          title: "Medium",
        },
        text: "Medium",
      },
      {
        dividerBelow: true,
        menu: {
          links: [
            {
              href: "/collection/contemporary",
              text: "Contemporary",
            },
            {
              href: "/collection/street-art",
              text: "Street Art",
            },
            {
              href: "/collection/pop-art",
              text: "Pop Art",
            },
            {
              href: "/collection/abstract-expressionism",
              text: "Abstract Expressionism",
            },
            {
              href: "/collection/post-war",
              text: "Post-War",
            },
            {
              href: "/collection/impressionist-and-modern",
              text: "Impressionism & Modernism",
            },
            {
              href: "/collection/old-masters",
              text: "Old Masters",
            },
          ],
          title: "Movements",
        },
        text: "Movements",
      },
      { href: "/collect", text: "View all artworks" },
    ],
    title: "Artworks",
  },
  text: "Artworks",
}

export const MENU_DATA: MenuData = {
  // root menu, so no title
links: [
    { ...ARTISTS_SUBMENU_DATA },
    { ...ARTWORKS_SUBMENU_DATA },
    {
      href: "/auctions",
      text: "Auctions",
    },
    {
      href: "/viewing-rooms",
      text: "Viewing Rooms",
    },
    {
      href: "/articles",
      text: "Editorial",
    },
    {
      href: "/galleries",
      text: "Galleries",
    },
    {
      href: "/fairs",
      text: "Fairs",
    },
    {
      href: "/shows",
      text: "Shows",
    },
    {
      href: "/institutions",
      text: "Museums",
    },
    {
      href: "/consign",
      text: "Consign",
    },
    {
      href: "/gallery-partnerships",
      text: "Artsy for Galleries",
    },
    // NB. that desktop and mobile currently handle logged-in/out state links
    // such as "log in" or "account" separately
  ], 
  title: "",
}
