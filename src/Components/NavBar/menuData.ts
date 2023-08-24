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
        href: "/collection/trending-now",
      },
      {
        text: "Curator's Picks",
        menu: {
          title: "Curator's Picks",
          links: [
            {
              text: "Curators’ Picks: Emerging",
              href: "/collection/curators-picks-emerging",
            },
            {
              text: "Curators’ Picks: Blue-Chip",
              href: "/collection/curators-picks-blue-chip",
            },
          ],
        },
        dividerBelow: true,
      },
      {
        text: "Featured Artists",
        menu: {
          title: "Featured Artists",
          links: [
            {
              text: "Barbara Kruger",
              href: "/artist/barbara-kruger",
            },
            {
              text: "Carrie Mae Weems",
              href: "/artist/carrie-mae-weems",
            },
            {
              text: "Daniel Arsham",
              href: "/artist/daniel-arsham",
            },
            {
              text: "Sam Gilliam",
              href: "/artist/sam-gilliam",
            },
            {
              text: "Takashi Murakami",
              href: "/artist/takashi-murakami",
            },
            {
              text: "Tracey Emin",
              href: "/artist/tracey-emin",
            },
            {
              text: "Yinka Shonibare",
              href: "/artist/yinka-shonibare",
            },
          ],
        },
      },
      // Empty column
      {
        text: "",
        menu: {
          title: "",
          links: [],
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
        text: "Contemporary Abstraction",
        href: "/collection/contemporary-abstraction",
      },
      {
        text: "Top Auction Lots",
        href: "/collection/top-auction-lots",
      },
      {
        text: "Best of Prints & Editions",
        href: "/collection/best-of-prints-and-editions",
      },
      {
        text: "Price",
        menu: {
          title: "Price",
          links: [
            {
              text: "Finds Under $1,000",
              href: "/collection/finds-under-1000-dollars",
            },
            {
              text: "Finds Under $5,000",
              href: "/collection/finds-under-5000-dollars",
            },
            {
              text: "Finds Under $10,000",
              href: "/collection/finds-under-10000-dollars",
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
