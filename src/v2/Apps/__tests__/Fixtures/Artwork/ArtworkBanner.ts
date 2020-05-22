import { ArtworkBanner_Test_QueryRawResponse } from "v2/__generated__/ArtworkBanner_Test_Query.graphql"

export const ArtworkNoBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  id: "richard-anuszkiewicz-lino-yellow-318",
  context: null,
  partner: {
    id: "opaque-partner-id",
    // type: "Auction House",
    name: "Doyle",
    initials: "D",
    // profile: null,
  },
  sale: null,
}

export const ArtworkAuctionBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  id: "richard-anuszkiewicz-lino-yellow-318",
  context: {
    __typename: "Sale",
    id: "opaque-sale-id",
    name: "Doyle: Post-War & Contemporary Art",
    href: "/auction/doyle-post-war-and-contemporary-art-2",
    // is_auction: true,
    // is_closed: false,
    // is_open: true,
    // live_start_at: "2018-11-07T19:00:00+00:00",
    // live_url_if_open: null,
  },
  partner: {
    id: "opaque-partner-id",
    // type: "Auction House",
    name: "Doyle",
    initials: "D",
    // profile: null,
  },
  sale: {
    id: "opaque-sale-id",
    // name: "Doyle: Post-War & Contemporary Art",
    is_auction: true,
    isBenefit: false,
    isGalleryAuction: false,
    cover_image: {
      url:
        "https://d32dm0rphc51dk.cloudfront.net/teoB9Znrq-78iSh6_Vh6Og/square.jpg",
    },
  },
}

export const ArtworkBenefitAuctionBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  id: "richard-anuszkiewicz-lino-yellow-318",
  context: {
    __typename: "Sale",
    id: "opaque-sale-id",
    name: "BFAMI: Live Benefit Auction 2019",
    href: "/auction/bfami-live-benefit-auction-2019",
    // is_auction: true,
    // is_closed: false,
    // is_open: true,
    // live_start_at: "2019-01-29T21:35:00+00:00",
    // live_url_if_open: null,
  },
  partner: {
    id: "opaque-partner-id",
    // type: "Auction House",
    name: "BFAMI: Live Benefit Auction 2019 partner name",
    initials: "BLB",
    // profile: null,
  },
  sale: {
    id: "opaque-sale-id",
    is_auction: true,
    isBenefit: true,
    isGalleryAuction: false,
    cover_image: {
      url:
        "https://d32dm0rphc51dk.cloudfront.net/0XJ7rzO9dlu60lXl2OuH6g/square.jpg",
    },
  },
}

export const ArtworkFairBannerFixture: ArtworkBanner_Test_QueryRawResponse["artwork"] = {
  id: "raqib-shaw-the-garden-of-earthly-delights-xiv",
  context: {
    __typename: "Fair",
    id: "opaque-fair-id",
    name: "West Bund Art & Design 2018",
    href: "/west-bund-art-and-design-2018",
    // isActive: true,
    // start_at: "2018-11-08T02:00:00+00:00",
    // end_at: "2018-11-11T08:00:00+00:00",
    profile: {
      id: "opaque-profile-id",
      initials: "WBA",
      icon: {
        img: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fr8ATQCRifOr_5eAh8lPoAg%2Fsquare140.png",
        },
      },
    },
  },
  partner: {
    id: "opaque-partner-id",
    // type: "Gallery",
    name: "White Cube",
    initials: "WC",
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
  id: "claudia-giraudo-affinita-verde-amarillo",
  context: {
    __typename: "Show",
    id: "opaque-show-id",
    name: "Claudia Giraudo | The age of innocence",
    href: "/show/galleria-punto-sullarte-claudia-giraudo-the-age-of-innocence",
    // type: "Show",
    status: "upcoming",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbBv1DcVHmabkA2K3B7EO2A%2Fsquare.jpg",
      },
    },
  },
  partner: {
    id: "opaque-partner-id",
    // type: "Gallery",
    name: "Galleria Punto Sull'Arte",
    initials: "GPS",
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
  id: "marcel-barbeau-diamants-larmes",
  context: {
    __typename: "Show",
    id: "opaque-show-id",
    // name: "Marcel Barbeau : Jours d’envol",
    href: "/show/galerie-deste-marcel-barbeau-jours-denvol",
    // type: "Show",
    status: "running",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fal6PoLl3HsQFbXNyxeOtdA%2Fsquare.jpg",
      },
    },
  },
  partner: {
    id: "opaque-partner-id",
    // type: "Gallery",
    name: "Galerie D'Este",
    initials: "GDE",
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
  id:
    "julio-le-parc-la-longue-marche-etape-n-degrees-6-the-long-march-step-n-degrees-6",
  context: {
    __typename: "Show",
    id: "opaque-show-id",
    name: "Julio Le Parc: Form into Action",
    href: "/show/perez-art-museum-miami-pamm-julio-le-parc-form-into-action",
    // type: "Show",
    status: "closed",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCsea_INcKjXkmLNqwJbvKQ%2Fsquare.jpg",
      },
    },
  },
  partner: {
    id: "opaque-partner-id",
    // type: "Institution",
    name: "Pérez Art Museum Miami (PAMM)",
    initials: "PAM",
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
