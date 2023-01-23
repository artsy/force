export interface MenuData {
  title: string
  links: LinkData[]
}

export type LinkData = MenuLinkData | SimpleLinkData

export const isMenuLinkData = (
  linkData: LinkData
): linkData is MenuLinkData => {
  return "menu" in linkData
}

// e.g. "Editorial"
export interface SimpleLinkData {
  text: string
  href: string
  dividerBelow?: boolean
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void
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
        text: "New This Week",
        href: "/collection/new-this-week",
      },
      {
        text: "Trending Now",
        href: "/collection/trending-this-week",
      },
      {
        text: "Artsy Vanguard Artists",
        href: "/collection/the-artsy-vanguard",
        dividerBelow: true,
      },
      {
        text: "Curator's Picks",
        menu: {
          title: "Curator's Picks",
          links: [
            {
              text: "Rising Artists of Africa & Its Diaspora",
              href: "/collection/rising-artists-of-africa-and-its-diaspora",
            },
            {
              text: "Women Artists Now",
              href: "/collection/women-artists-to-watch",
            },
            {
              text: "Rising Artists of Asia & Its Diaspora",
              href: "/collection/rising-artists-of-asia-and-its-diaspora",
            },
          ],
        },
        dividerBelow: true,
      },
      {
        text: "Artist Nationality and Region",
        menu: {
          title: "Artist Nationality and Region",
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
              text: "Barbara Kruger",
              href: "/artist/barbara-kruger/works-for-sale",
            },
            {
              text: "Carrie Mae Weems",
              href: "/artist/carrie-mae-weems/works-for-sale",
            },
            {
              text: "Daniel Arsham",
              href: "/artist/daniel-arsham/works-for-sale",
            },
            {
              text: "Sam Gilliam",
              href: "/artist/sam-gilliam/works-for-sale",
            },
            {
              text: "Takashi Murakami",
              href: "/artist/takashi-murakami/works-for-sale",
            },
            {
              text: "Tracey Emin",
              href: "/artist/tracey-emin/works-for-sale",
            },
            {
              text: "Yinka Shonibare",
              href: "/artist/yinka-shonibare/works-for-sale",
            },
          ],
        },
      },
      {
        text: "View All Artists",
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
        text: "Curators’ Picks: Emerging",
        href: "/collection/curators-picks-emerging",
      },
      {
        text: "Top Auction Lots",
        href: "/collection/top-auction-lots",
      },
      {
        text: "Curators’ Picks: Blue-Chip",
        href: "/collection/curators-picks-blue-chip",
      },
      {
        text: "Best of Prints & Editions",
        href: "/collection/iconic-prints",
      },
      {
        text: "Price",
        menu: {
          title: "Price",
          links: [
            {
              text: "Finds Under $25,000",
              href: "/collection/finds-under-25000-dollars",
            },
            {
              text: "Finds Under $10,000",
              href: "/collection/finds-under-10000-dollars",
            },
            {
              text: "Finds Under $5,000",
              href: "/collection/finds-under-5000-dollars",
            },
            {
              text: "Finds Under $1,000",
              href: "/collection/finds-under-1000-dollars",
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
              text: "Impressionism and Modernism",
              href: "/collection/impressionist-and-modern",
            },
            {
              text: "Old Masters",
              href: "/collection/old-masters",
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
            {
              text: "NFTs",
              href: "/collect?additional_gene_ids[0]=nft",
            },
          ],
        },
        dividerBelow: true,
      },
      { text: "View All Artworks", href: "/collect" },
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
