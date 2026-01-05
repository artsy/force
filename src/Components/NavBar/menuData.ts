export interface MenuData {
  title: string
  links: LinkData[]
}

export type LinkData = MenuLinkData | SimpleLinkData

export const isMenuLinkData = (
  linkData: LinkData,
): linkData is MenuLinkData => {
  return "menu" in linkData
}

type BasicLinkData = {
  dividerBelow?: boolean
  dividerBefore?: boolean
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void
}

// e.g. "Editorial"
export type SimpleLinkData =
  | (BasicLinkData & { text: string; href: string; type?: never })
  | (BasicLinkData & { type: "Article"; text: string; href?: never })

// e.g. "Art Movement >"
export interface MenuLinkData {
  text: string
  menu: MenuData
  dividerBelow?: boolean
}

const ArticleSubmenuItem: SimpleLinkData = {
  text: "Further Reading in Art Market",
  type: "Article",
}

export const WHATS_NEW_SUBMENU_DATA: MenuLinkData = {
  text: "What’s New",
  menu: {
    title: "What’s New",
    links: [
      {
        text: "What’s New",
        menu: {
          title: "What’s New",
          links: [
            {
              text: "New This Week",
              href: "/collection/new-this-week",
            },
            {
              text: "Art under $1,000",
              href: "/collection/art-under-1000-dollars",
            },
            {
              text: "Art under $2,500",
              href: "/collection/art-under-2500-dollars",
            },
            {
              text: "Most Loved",
              href: "/collection/most-loved",
            },
            {
              text: "New from Small Galleries",
              href: "/collection/new-from-small-galleries",
            },
          ],
        },
      },
      {
        text: "Current Events",
        menu: {
          title: "Current Events",
          links: [
            {
              text: "Shows",
              href: "/shows",
            },
            {
              text: "Fairs",
              href: "/art-fairs",
            },
            {
              text: "Auctions",
              href: "/auctions",
            },
          ],
        },
      },
      {
        text: "Our Picks",
        menu: {
          title: "Our Picks",
          links: [
            {
              text: "Curators' Picks",
              href: "/collection/curators-picks",
            },
            {
              text: "Blue-Chip Icons",
              href: "/collection/icons",
            },
            {
              text: "Street Art Edit",
              href: "/collection/street-art-edit",
            },
            {
              text: "Best Bids",
              href: "/collection/best-bids",
            },
          ],
        },
      },
      {
        text: "Trending Now",
        menu: {
          title: "Trending Now",
          links: [
            {
              text: "Into the Blue",
              href: "/collection/into-the-blue",
            },
            {
              text: "Mini Art, Major Impact",
              href: "/collection/mini-art-major-impact",
            },
            {
              text: "The Tablescape Renaissance",
              href: "/collection/the-tablescape-renaissance",
            },
            {
              text: "Back to the Land",
              href: "/collection/back-to-the-land",
            },
            {
              text: "David Hockney Etchings",
              href: "/collection/david-hockney-etchings",
            },
          ],
        },
      },
      ArticleSubmenuItem,
    ],
  },
}

export const ARTISTS_SUBMENU_DATA: MenuLinkData = {
  text: "Artists",
  menu: {
    title: "Artists",
    links: [
      {
        text: "Browse by Identity",
        menu: {
          title: "Browse by Identity",
          links: [
            {
              text: "AAPI Artists",
              href: "/collection/aapi-artists-to-know",
            },
            {
              text: "Black Artists",
              href: "/collection/black-artists-to-know",
            },
            {
              text: "Queer Artists",
              href: "/collection/queer-artists-to-know",
            },
            {
              text: "Women Artists",
              href: "/collection/women-artists-to-know",
            },
          ],
        },
      },
      {
        text: "Artists on Our Radar",
        menu: {
          title: "Artists on Our Radar",
          links: [
            {
              text: "Imogen Allen",
              href: "/artist/imogen-allen",
            },
            {
              text: "Elian Almeida",
              href: "/artist/elian-almeida",
            },
            {
              text: "ektor garcia",
              href: "/artist/ektor-garcia",
            },
            {
              text: "Eny Lee Parker",
              href: "/artist/eny-lee-parker",
            },
            {
              text: "Jesse Zuo",
              href: "/artist/jesse-zuo",
            },
          ],
        },
      },
      {
        text: "Browse by Nationality",
        menu: {
          title: "Browse by Nationality",
          links: [
            {
              text: "American",
              href: "/collect?artist_nationalities%5B0%5D=American",
            },
            {
              text: "Brazilian",
              href: "/collect?artist_nationalities%5B0%5D=Brazilian",
            },
            {
              text: "British",
              href: "/collect?artist_nationalities%5B0%5D=British",
            },
            {
              text: "Chinese",
              href: "/collect?artist_nationalities%5B0%5D=Chinese",
            },
            {
              text: "French",
              href: "/collect?artist_nationalities%5B0%5D=French",
            },
            {
              text: "Indian",
              href: "/collect?artist_nationalities%5B0%5D=Indian",
            },
            {
              text: "Japanese",
              href: "/collect?artist_nationalities%5B0%5D=Japanese",
            },
          ],
        },
      },
      {
        text: "In-Demand Artists",
        menu: {
          title: "In-Demand Artists",
          links: [
            {
              text: "David Lynch",
              href: "/artist/david-lynch",
            },
            {
              text: "Guim Tió Zarraluki",
              href: "/artist/guim-tio-zarraluki",
            },
            {
              text: "Danny Fox",
              href: "/artist/danny-fox",
            },
            {
              text: "Amy Sherald",
              href: "/artist/amy-sherald",
            },
            {
              text: "Hilary Pecis",
              href: "/artist/hilary-pecis",
            },
          ],
        },
        dividerBelow: true,
      },
      ArticleSubmenuItem,
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
        text: "The Home Edit",
        menu: {
          title: "The Home Edit",
          links: [
            {
              text: "Art for Small Spaces",
              href: "/collection/art-for-small-spaces",
            },
            {
              text: "Art for Large Spaces",
              href: "/collection/art-for-large-spaces",
            },
            {
              text: "Table Lamps",
              href: "/collection/table-lamps",
            },
          ],
        },
      },
      {
        text: "Shop by Scenery",
        menu: {
          title: "Shop by Scenery",
          links: [
            {
              text: "Landscapes",
              href: "/collection/contemporary-landscapes",
            },
            {
              text: "Cityscapes",
              href: "/collection/cityscapes",
            },
            {
              text: "Beaches & Seascapes",
              href: "/collection/beaches-and-seascapes",
            },
            {
              text: "Interiors",
              href: "/collection/contemporary-interiors",
            },
          ],
        },
      },
      {
        text: "Shop by Mood",
        menu: {
          title: "Shop by Mood",
          links: [
            {
              text: "Calm",
              href: "/collection/understated",
            },
            {
              text: "Bold",
              href: "/collection/statement-pieces",
            },
            {
              text: "Romantic",
              href: "/collection/romantic",
            },
            {
              text: "Transcendent",
              href: "/collection/transcendent",
            },
          ],
        },
      },
      {
        text: "Shop by Medium",
        menu: {
          title: "Shop by Medium",
          links: [
            {
              text: "Painting",
              href: "/collection/painting",
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
              text: "Prints",
              href: "/collection/prints",
            },
            {
              text: "Works on Paper",
              href: "/collection/works-on-paper",
            },
            {
              text: "Textile Art",
              href: "/collection/textile-art",
            },
            {
              text: "Ceramics",
              href: "/collection/ceramics",
            },
            {
              text: "Design Objects and Furniture",
              href: "/collection/design",
            },
          ],
        },
        dividerBelow: true,
      },
      ArticleSubmenuItem,
      {
        text: "View All Artworks",
        href: "/collect",
      },
    ],
  },
}
