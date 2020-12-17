import { ArtworkBanner_Test_QueryRawResponse } from "v2/__generated__/ArtworkBanner_Test_Query.graphql"

export const ArtworkNoBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: null,
  id: "richard-anuszkiewicz-lino-yellow-318",
  partner: {
    id: "opaque-partner-id",
    
    initials: "D",
    // type: "Auction House",
name: "Doyle",
    // profile: null,
  },
  sale: null,
}

export const ArtworkAuctionBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: {
    __typename: "Sale",
    href: "/auction/doyle-post-war-and-contemporary-art-2",
    id: "opaque-sale-id",
    name: "Doyle: Post-War & Contemporary Art",
    // is_auction: true,
    // is_closed: false,
    // is_open: true,
    // live_start_at: "2018-11-07T19:00:00+00:00",
    // live_url_if_open: null,
  },
  id: "richard-anuszkiewicz-lino-yellow-318",
  partner: {
    id: "opaque-partner-id",
    
    initials: "D",
    // type: "Auction House",
name: "Doyle",
    // profile: null,
  },
  sale: {
    cover_image: {
      url:
        "https://d32dm0rphc51dk.cloudfront.net/teoB9Znrq-78iSh6_Vh6Og/square.jpg",
    },
    
    id: "opaque-sale-id",
    
isBenefit: false,
    
isGalleryAuction: false,
    // name: "Doyle: Post-War & Contemporary Art",
is_auction: true,
  },
}

export const ArtworkBenefitAuctionBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: {
    __typename: "Sale",
    href: "/auction/bfami-live-benefit-auction-2019",
    id: "opaque-sale-id",
    name: "BFAMI: Live Benefit Auction 2019",
    // is_auction: true,
    // is_closed: false,
    // is_open: true,
    // live_start_at: "2019-01-29T21:35:00+00:00",
    // live_url_if_open: null,
  },
  id: "richard-anuszkiewicz-lino-yellow-318",
  partner: {
    id: "opaque-partner-id",
    
    initials: "BLB",
    // type: "Auction House",
name: "BFAMI: Live Benefit Auction 2019 partner name",
    // profile: null,
  },
  sale: {
    cover_image: {
      url:
        "https://d32dm0rphc51dk.cloudfront.net/0XJ7rzO9dlu60lXl2OuH6g/square.jpg",
    },
    id: "opaque-sale-id",
    isBenefit: true,
    isGalleryAuction: false,
    is_auction: true,
  },
}

export const ArtworkFairBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: {
    __typename: "Fair",
    href: "/west-bund-art-and-design-2018",
    id: "opaque-fair-id",
    name: "West Bund Art & Design 2018",
    // isActive: true,
    // start_at: "2018-11-08T02:00:00+00:00",
    // end_at: "2018-11-11T08:00:00+00:00",
    profile: {
      icon: {
        img: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fr8ATQCRifOr_5eAh8lPoAg%2Fsquare140.png",
        },
      },
      id: "opaque-profile-id",
      initials: "WBA",
    },
  },
  id: "raqib-shaw-the-garden-of-earthly-delights-xiv",
  partner: {
    id: "opaque-partner-id",
    
    initials: "WC",
    // type: "Gallery",
name: "White Cube",
    // profile: {
    //   icon: {
    //     url:
    //       "https://d32dm0rphc51dk.cloudfront.net/wayPSO-tWo5yvs0Lu864GA/square140.png",
    //   },
    //   href: "/white-cube",
    // },
  },
  sale: null,
}

export const ArtworkUpcomingShowBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: {
    __typename: "Show",
    href: "/show/galleria-punto-sullarte-claudia-giraudo-the-age-of-innocence",
    id: "opaque-show-id",
    name: "Claudia Giraudo | The age of innocence",
    // type: "Show",
    status: "upcoming",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbBv1DcVHmabkA2K3B7EO2A%2Fsquare.jpg",
      },
    },
  },
  id: "claudia-giraudo-affinita-verde-amarillo",
  partner: {
    id: "opaque-partner-id",
    
    initials: "GPS",
    // type: "Gallery",
name: "Galleria Punto Sull'Arte",
    // profile: {
    //   icon: {
    //     url:
    //       "https://d32dm0rphc51dk.cloudfront.net/5M6lXKjC3NIG5KM-x1SplA/square140.png",
    //   },
    //   href: "/galleria-punto-sullarte",
    // },
  },
  sale: null,
}

export const ArtworkCurrentShowBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: {
    __typename: "Show",
    // name: "Marcel Barbeau : Jours d’envol",
href: "/show/galerie-deste-marcel-barbeau-jours-denvol",
    
    id: "opaque-show-id",
    // type: "Show",
    status: "running",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fal6PoLl3HsQFbXNyxeOtdA%2Fsquare.jpg",
      },
    },
  },
  id: "marcel-barbeau-diamants-larmes",
  partner: {
    id: "opaque-partner-id",
    
    initials: "GDE",
    // type: "Gallery",
name: "Galerie D'Este",
    // profile: {
    //   icon: {
    //     url:
    //       "https://d32dm0rphc51dk.cloudfront.net/9KdRZamUZCROfC6j_xpk_A/square140.png",
    //   },
    //   href: "/galerie-deste",
    // },
  },
  sale: null,
}

export const ArtworkPastShowBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  context: {
    __typename: "Show",
    href: "/show/perez-art-museum-miami-pamm-julio-le-parc-form-into-action",
    id: "opaque-show-id",
    name: "Julio Le Parc: Form into Action",
    // type: "Show",
    status: "closed",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCsea_INcKjXkmLNqwJbvKQ%2Fsquare.jpg",
      },
    },
  },
  id:
    "julio-le-parc-la-longue-marche-etape-n-degrees-6-the-long-march-step-n-degrees-6",
  partner: {
    id: "opaque-partner-id",
    
    initials: "PAM",
    // type: "Institution",
name: "Pérez Art Museum Miami (PAMM)",
    // profile: {
    //   icon: {
    //     url:
    //       "https://d32dm0rphc51dk.cloudfront.net/h4j--cdqWuEdmbJ96B0lPw/square140.png",
    //   },
    //   href: "/pamm",
    // },
  },
  sale: null,
}
