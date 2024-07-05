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

export const WHATS_NEW_SUBMENU_DATA: MenuLinkData = {
  text: "What’s New",
  menu: {
    title: "What’s New",
    links: [
      {
        text: "Start Here",
        menu: {
          title: "Start Here",
          links: [
            {
              text: "New This Week",
              href: "/collection/new-this-week?metric=in",
            },
            {
              text: "Trending Now",
              href: "/collection/trending-now",
            },
            {
              text: "Top Auction Lots",
              href: "/collection/top-auction-lots",
            },
            {
              text: "New Abstract Art",
              href: "/collection/new-abstract-art",
            },
            {
              text: "New Figurative Art",
              href: "/collection/new-figurative-art",
            },
          ],
        },
      },
      {
        text: "By Price",
        menu: {
          title: "By Price",
          links: [
            {
              text: "Art under $500",
              href: "/collection/art-under-500-dollars?metric=in",
            },
            {
              text: "Art under $1,000",
              href: "/collection/art-under-1000-dollars?metric=in",
            },
            {
              text: "Art under $2,500",
              href: "/collection/art-under-2500-dollars?metric=in",
            },
            {
              text: "Art under $5,000",
              href: "/collection/art-under-5000-dollars?metric=in",
            },
            {
              text: "Art under $10,000",
              href: "/collection/art-under-10000-dollars?metric=in",
            },
          ],
        },
      },
      {
        text: "Curators’ Picks",
        menu: {
          title: "Curators’ Picks",
          links: [
            {
              text: "Curators’ Picks: Emerging Artists",
              href: "/collection/curators-picks-emerging-artists?metric=in",
            },
            {
              text: "Curators’ Picks: Blue-Chip Artists",
              href: "/collection/curators-picks-blue-chip-artists?metric=in",
            },
            {
              text: "The Artsy Vanguard Artists",
              href: "/collection/artsy-vanguard-artists",
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
              href: "/collection/new-from-leading-galleries?metric=in",
            },
            {
              text: "New from Tastemaking Galleries",
              href: "/collection/new-from-tastemaking-galleries?metric=in",
            },
            {
              text: "New from Small Galleries",
              href: "/collection/new-from-small-galleries?metric=in",
            },
            {
              text: "New from Nonprofits",
              href: "/collection/new-from-nonprofits?metric=in",
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
              text: "David Hockney",
              href: "/artist/david-hockney",
            },
            {
              text: "Cindy Sherman",
              href: "/artist/cindy-sherman",
            },
            {
              text: "Katharina Grosse",
              href: "/artist/katharina-grosse",
            },
            {
              text: "Imi Knoebel",
              href: "/artist/imi-knoebel",
            },
            {
              text: "Ugo Rondinone",
              href: "/artist/ugo-rondinone",
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
              text: "Jess Allen",
              href: "/artist/jess-allen",
            },
            {
              text: "Alexis Ralaivao",
              href: "/artist/alexis-ralaivao",
            },
            {
              text: "Zoe McGuire",
              href: "/artist/zoe-mcguire",
            },
            {
              text: "Louise Giovanelli",
              href: "/artist/louise-giovanelli",
            },
            {
              text: "GaHee Park",
              href: "/artist/gahee-park",
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
              text: "Bob Thompson",
              href: "/artist/bob-thompson",
            },
            {
              text: "Katsushika Hokusai",
              href: "/artist/katsushika-hokusai",
            },
            {
              text: "Faith Ringgold",
              href: "/artist/faith-ringgold",
            },
            {
              text: "Lucy Bull",
              href: "/artist/lucy-bull",
            },
            {
              text: "Seund Ja Rhee",
              href: "/artist/seund-ja-rhee",
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
              text: "Ali Banisadr",
              href: "/artist/ali-banisadr",
            },
            {
              text: "Scott Kahn",
              href: "/artist/scott-kahn",
            },
            {
              text: "Mire Lee",
              href: "/artist/mire-lee",
            },
            {
              text: "Sidival Fila",
              href: "/artist/sidival-fila",
            },
            {
              text: "Terry Winters",
              href: "/artist/terry-winters",
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
              text: "Art for Small Spaces",
              href: "/collection/art-for-small-spaces",
            },
            {
              text: "Art for Large Spaces",
              href: "/collection/art-for-large-spaces",
            },
            {
              text: "Tabletop Sculpture",
              href: "/collection/tabletop-sculpture",
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
              text: "Cool-Toned Artworks",
              href: "/collection/cool-toned-artworks?metric=in",
            },
            {
              text: "Warm-Toned Artworks",
              href: "/collection/warm-toned-artworks?metric=in",
            },
            {
              text: "Neutral Artworks",
              href: "/collection/neutral-artworks",
            },
            {
              text: "Black-and-White Artworks",
              href: "/collection/black-and-white-artworks",
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
              href: "/collection/emerging-art?metric=in",
            },
            {
              text: "Post-War Art",
              href: "/collection/post-war",
            },
            {
              text: "Abstract Art",
              href: "/collection/abstract-art?metric=in",
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
              href: "/collection/impressionist-and-modern?metric=in",
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
              href: "/collection/prints?metric=in",
            },
            {
              text: "Works on Paper",
              href: "/collection/works-on-paper?metric=in",
            },
            {
              text: "Photography",
              href: "/collection/photography?metric=in",
            },
            {
              text: "Sculpture",
              href: "/collection/sculpture?metric=in",
            },
            {
              text: "Ceramics",
              href: "/collection/ceramics",
            },
            {
              text: "Textile Art",
              href: "/collection/textile-art?metric=in",
            },
            {
              text: "Design Objects and Furniture",
              href: "/collection/design?metric=in",
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
