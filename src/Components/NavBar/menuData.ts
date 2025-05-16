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

export const WHATS_NEW_SUBMENU_DATA: MenuLinkData = {
  text: "What’s New",
  menu: {
    title: "What’s New",
    links: [
      {
        text: "By Price",
        menu: {
          title: "By Price",
          links: [
            {
              text: "Art under $500",
              href: "/collect?price_range=%2A-500",
            },
            {
              text: "Art under $1,000",
              href: "/collect?price_range=501-1000",
            },
            {
              text: "Art under $2,500",
              href: "/collect?price_range=1001-2500",
            },
            {
              text: "Art under $5,000",
              href: "/collect?price_range=2501-5000",
            },
            {
              text: "Art under $10,000",
              href: "/collect?price_range=5001-10000",
            },
            {
              text: "Art under $25,000",
              href: "/collect?price_range=10001-25000",
            },
            {
              text: "Art above $25,000",
              href: "/collect?price_range=25000-%2A",
            },
          ],
        },
      },
      {
        text: "By Seller",
        menu: {
          title: "By Seller",
          links: [
            {
              text: "New from Leading Galleries",
              href: "/collection/new-from-leading-galleries",
            },
            {
              text: "New from Tastemaking Galleries",
              href: "/collection/new-from-tastemaking-galleries",
            },
            {
              text: "New from Small Galleries",
              href: "/collection/new-from-small-galleries",
            },
            {
              text: "New from Nonprofits",
              href: "/collection/new-from-nonprofits",
            },
            {
              text: "The Artsy Edition Shop",
              href: "/fair/the-artsy-edition-shop/artworks",
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
              text: "Best Bids",
              href: "/collection/best-bids",
            },
            {
              text: "Most Loved",
              href: "/collection/most-loved",
            },
            {
              text: "Street Art Edit",
              href: "/collection/street-art-edit",
            },
            {
              text: "Icons",
              href: "/collection/icons",
            },
            {
              text: "Bleeding Edge",
              href: "/collection/bleeding-edge",
            },
          ],
        },
      },
      {
        text: "By Style",
        menu: {
          title: "By Style",
          links: [
            {
              text: "Statement Pieces",
              href: "/collection/statement-pieces",
            },
            {
              text: "Little Gems",
              href: "/collection/little-gems",
            },
            {
              text: "Understated",
              href: "/collection/understated",
            },
            {
              text: "Transcendent",
              href: "/collection/transcendent",
            },
            {
              text: "Feast for the Eyes",
              href: "/collection/feast-for-the-eyes",
            },
            {
              text: "Flora and Fauna",
              href: "/collection/flora-and-fauna",
            },
          ],
        },
      },
    ],
  },
}

export const ARTISTS_SUBMENU_DATA: MenuLinkData = {
  text: "Artists",
  menu: {
    title: "Artists",
    links: [
      {
        text: "Blue-Chip Artists",
        menu: {
          title: "Blue-Chip Artists",
          links: [
            {
              text: "Banksy",
              href: "/artist/banksy",
            },
            {
              text: "Cecily Brown",
              href: "/artist/cecily-brown",
            },
            {
              text: "KAWS",
              href: "/artist/kaws",
            },
            {
              text: "Ed Ruscha",
              href: "/artist/ed-ruscha",
            },
            {
              text: "Marlene Dumas",
              href: "/artist/marlene-dumas",
            },
          ],
        },
      },
      {
        text: "Trending on Artsy",
        menu: {
          title: "Trending on Artsy",
          links: [
            {
              text: "Julie Mehretu",
              href: "/artist/julie-mehretu",
            },
            {
              text: "Frank Stella",
              href: "/artist/frank-stella",
            },
            {
              text: "Takashi Murakami",
              href: "/artist/takashi-murakami",
            },
            {
              text: "Jenny Holzer",
              href: "/artist/jenny-holzer",
            },
            {
              text: "Jonas Wood",
              href: "/artist/jonas-wood",
            },
          ],
        },
      },
      {
        text: "Recent Auction Records",
        menu: {
          title: "Recent Auction Records",
          links: [
            {
              text: "Faith Ringgold",
              href: "/artist/faith-ringgold",
            },
            {
              text: "Lucy Bull",
              href: "/artist/lucy-bull",
            },
            {
              text: "Martin Wong",
              href: "/artist/martin-wong",
            },
            {
              text: "Reggie Burrows Hodges",
              href: "/artist/reggie-burrows-hodges",
            },
            {
              text: "Ana Mendieta",
              href: "/artist/ana-mendieta",
            },
          ],
        },
      },
      {
        text: "New Representation",
        menu: {
          title: "New Representation",
          links: [
            {
              text: "Sarah Blaustein",
              href: "/artist/sarah-blaustein",
            },
            {
              text: "Francesca Mollett",
              href: "/artist/francesca-mollett",
            },
            {
              text: "Jessie Stevenson",
              href: "/artist/jessie-stevenson",
            },
            {
              text: "Soojin Kang",
              href: "/artist/soojin-kang",
            },
            {
              text: "Sam Moyer",
              href: "/artist/sam-moyer",
            },
          ],
        },
        dividerBelow: true,
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
        text: "By Size",
        menu: {
          title: "By Size",
          links: [
            {
              text: "Small (under 16in)",
              href: "/collect?sizes%5B0%5D=SMALL",
            },
            {
              text: "Medium (16in - 40in)",
              href: "/collect?sizes%5B0%5D=MEDIUM",
            },
            {
              text: "Large (over 40in)",
              href: "/collect?sizes%5B0%5D=LARGE",
            },
          ],
        },
      },
      {
        text: "By Color",
        menu: {
          title: "By Color",
          links: [
            {
              text: "Black and White",
              href: "/collect?colors%5B0%5D=black-and-white",
            },
            {
              text: "Red",
              href: "/collect?colors%5B0%5D=red",
            },
            {
              text: "Orange",
              href: "/collect?colors%5B0%5D=orange",
            },
            {
              text: "Yellow",
              href: "/collect?colors%5B0%5D=yellow",
            },
            {
              text: "Green",
              href: "/collect?colors%5B0%5D=green",
            },
            {
              text: "Blue",
              href: "/collect?colors%5B0%5D=blue",
            },
            {
              text: "Pink",
              href: "/collect?colors%5B0%5D=pink",
            },
            {
              text: "Brown",
              href: "/collect?colors%5B0%5D=brown",
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
              text: "Contemporary Art",
              href: "/collection/contemporary",
            },
            {
              text: "Emerging Art",
              href: "/collection/emerging-art",
            },
            {
              text: "Post-War Art",
              href: "/collection/post-war",
            },
            {
              text: "Abstract Art",
              href: "/collection/abstract-art",
            },
            {
              text: "Minimalist Art",
              href: "/collection/minimalism",
            },
            {
              text: "Pop Art",
              href: "/collection/pop-art",
            },
            {
              text: "Impressionist and Modern Art",
              href: "/collection/impressionist-and-modern",
            },
            {
              text: "Street Art",
              href: "/collection/street-art",
            },
          ],
        },
      },
      {
        text: "Mediums",
        menu: {
          title: "Mediums",
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
              text: "Photography",
              href: "/collection/photography",
            },
            {
              text: "Sculpture",
              href: "/collection/sculpture",
            },
            {
              text: "Ceramics",
              href: "/collection/ceramics",
            },
            {
              text: "Textile Art",
              href: "/collection/textile-art",
            },
            {
              text: "Design Objects and Furniture",
              href: "/collection/design",
            },
          ],
        },
        dividerBelow: true,
      },
      {
        text: "View All Artworks",
        href: "/collect",
      },
    ],
  },
}
