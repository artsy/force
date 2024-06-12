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
        text: "New from Galleries",
        menu: {
          title: "New from Galleries",
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
          ],
        },
      },
      {
        text: "Curators’ Picks",
        menu: {
          title: "Curators’ Picks",
          links: [
            {
              text: "Curators’ Picks: Emerging",
              href: "/collection/curators-picks-emerging",
            },
            {
              text: "Curators’ Picks: Blue Chip",
              href: "/collection/curators-picks-blue-chip",
            },
          ],
        },
      },
      {
        text: "New on Artsy",
        menu: {
          title: "New on Artsy",
          links: [
            {
              text: "New This Week",
              href: "/collection/new-this-week",
            },
            {
              text: "Trending Now",
              href: "/collection/trending-now",
            },
          ],
        },
      },
      {
        text: "Trending Artists",
        menu: {
          title: "Trending Artists",
          links: [
            {
              text: "TJ Rinoski",
              href: "/artist/tj-rinoski",
            },
            {
              text: "Jo Dennis",
              href: "/artist/jo-dennis-1",
            },
            {
              text: "Kira Maria Shewfelt",
              href: "/artist/kira-maria-shewfelt",
            },
            {
              text: "Hildur Ásgeirsdóttir Jónsson",
              href: "/artist/hildur-asgeirsdottir-jonsson",
            },
            {
              text: "Masaomi Yasunaga",
              href: "/artist/masaomi-yasunaga-1",
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
        text: "Curators’ Picks",
        menu: {
          title: "Curators’ Picks",
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
          ],
        },
      },
      {
        text: "Categories",
        menu: {
          title: "Categories",
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
              text: "Street Art",
              href: "/collection/street-art",
            },
            {
              text: "Abstract Art",
              href: "/collection/abstract-art",
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
              text: "Impressionist and Modern Art",
              href: "/collection/impressionist-and-modern",
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
              text: "Design",
              href: "/collection/design",
            },
            {
              text: "NFTs",
              href: "/collect?additional_gene_ids%5B0%5D=nft",
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
