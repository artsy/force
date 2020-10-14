/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_OverviewQueryVariables = {
    artistID: string;
};
export type routes_OverviewQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"Overview_artist">;
    } | null;
};
export type routes_OverviewQueryRawResponse = {
    readonly artist: ({
        readonly biographyBlurb: ({
            readonly text: string | null;
        }) | null;
        readonly currentEvent: ({
            readonly event: {
                readonly __typename: string;
                readonly id: string | null;
            };
            readonly image: ({
                readonly resized: ({
                    readonly url: string;
                }) | null;
            }) | null;
            readonly name: string | null;
            readonly status: string | null;
            readonly details: string | null;
            readonly partner: string | null;
            readonly href: string | null;
        }) | null;
        readonly internalID: string;
        readonly collections: ReadonlyArray<string | null> | null;
        readonly highlights: ({
            readonly partnersConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly categories: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string | null;
                        }) | null> | null;
                        readonly id: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly auctionResultsConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly price_realized: ({
                        readonly display: string | null;
                    }) | null;
                    readonly id: string | null;
                    readonly organization: string | null;
                    readonly sale_date: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly insights: ReadonlyArray<({
            readonly type: string | null;
            readonly label: string | null;
            readonly entities: ReadonlyArray<string | null> | null;
        }) | null> | null;
        readonly related: ({
            readonly genes: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly href: string | null;
                        readonly name: string | null;
                        readonly id: string | null;
                        readonly slug: string;
                    }) | null;
                }) | null> | null;
            }) | null;
            readonly artistsConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly id: string;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly id: string;
        readonly name: string | null;
        readonly slug: string;
        readonly is_followed: boolean | null;
        readonly counts: ({
            readonly follows: number | null;
            readonly partner_shows: number | null;
            readonly forSaleArtworks: number | null;
            readonly ecommerce_artworks: number | null;
            readonly auction_artworks: number | null;
            readonly artworks: number | null;
            readonly has_make_offer_artworks: boolean | null;
        }) | null;
        readonly artworksConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly image: ({
                        readonly url: string | null;
                        readonly aspectRatio: number;
                    }) | null;
                    readonly imageTitle: string | null;
                    readonly title: string | null;
                    readonly href: string | null;
                    readonly date: string | null;
                    readonly sale_message: string | null;
                    readonly cultural_maker: string | null;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                        readonly href: string | null;
                        readonly name: string | null;
                    }) | null> | null;
                    readonly collecting_institution: string | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly id: string | null;
                        readonly type: string | null;
                    }) | null;
                    readonly sale: ({
                        readonly is_auction: boolean | null;
                        readonly is_closed: boolean | null;
                        readonly id: string | null;
                        readonly is_live_open: boolean | null;
                        readonly is_open: boolean | null;
                        readonly is_preview: boolean | null;
                        readonly display_timely_at: string | null;
                    }) | null;
                    readonly sale_artwork: ({
                        readonly counts: ({
                            readonly bidder_positions: number | null;
                        }) | null;
                        readonly highest_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly opening_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly id: string | null;
                    }) | null;
                    readonly is_inquireable: boolean | null;
                    readonly internalID: string;
                    readonly slug: string;
                    readonly is_saved: boolean | null;
                    readonly is_biddable: boolean | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly targetSupply: ({
            readonly isInMicrofunnel: boolean | null;
            readonly isTargetSupply: boolean | null;
        }) | null;
        readonly href: string | null;
        readonly image: ({
            readonly cropped: ({
                readonly url: string;
            }) | null;
        }) | null;
        readonly filterArtworksConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly slug: string;
                    readonly image: ({
                        readonly url: string | null;
                        readonly aspectRatio: number;
                    }) | null;
                    readonly imageTitle: string | null;
                    readonly title: string | null;
                    readonly href: string | null;
                    readonly date: string | null;
                    readonly sale_message: string | null;
                    readonly cultural_maker: string | null;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                        readonly href: string | null;
                        readonly name: string | null;
                    }) | null> | null;
                    readonly collecting_institution: string | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly id: string | null;
                        readonly type: string | null;
                    }) | null;
                    readonly sale: ({
                        readonly is_auction: boolean | null;
                        readonly is_closed: boolean | null;
                        readonly id: string | null;
                        readonly is_live_open: boolean | null;
                        readonly is_open: boolean | null;
                        readonly is_preview: boolean | null;
                        readonly display_timely_at: string | null;
                    }) | null;
                    readonly sale_artwork: ({
                        readonly counts: ({
                            readonly bidder_positions: number | null;
                        }) | null;
                        readonly highest_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly opening_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly id: string | null;
                    }) | null;
                    readonly is_inquireable: boolean | null;
                    readonly internalID: string;
                    readonly is_saved: boolean | null;
                    readonly is_biddable: boolean | null;
                }) | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
        readonly statuses: ({
            readonly artworks: boolean | null;
            readonly cv: boolean | null;
        }) | null;
        readonly showsConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly exhibitionPeriod: string | null;
                    readonly coverImage: ({
                        readonly cropped: ({
                            readonly url: string;
                            readonly width: number;
                            readonly height: number;
                        }) | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly articlesConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly href: string | null;
                    readonly thumbnailTitle: string | null;
                    readonly publishedAt: string | null;
                    readonly thumbnailImage: ({
                        readonly cropped: ({
                            readonly url: string;
                        }) | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
};
export type routes_OverviewQuery = {
    readonly response: routes_OverviewQueryResponse;
    readonly variables: routes_OverviewQueryVariables;
    readonly rawResponse: routes_OverviewQueryRawResponse;
};



/*
query routes_OverviewQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...Overview_artist
    id
  }
}

fragment ArtistBio_bio on Artist {
  biographyBlurb(format: HTML, partnerBio: true) {
    text
  }
}

fragment ArtistConsignButton_artist on Artist {
  targetSupply {
    isInMicrofunnel
    isTargetSupply
  }
  internalID
  slug
  name
  href
  image {
    cropped(width: 66, height: 66) {
      url
    }
  }
}

fragment ArtistTopWorksRail_artist on Artist {
  slug
  id
  filterArtworksConnection(sort: "-weighted_iconicity", first: 10) {
    edges {
      node {
        id
        slug
        ...FillwidthItem_artwork
      }
    }
    id
  }
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
}

fragment CurrentEvent_artist on Artist {
  currentEvent {
    event {
      __typename
      ... on Node {
        id
      }
    }
    image {
      resized(width: 300) {
        url
      }
    }
    name
    status
    details
    partner
    href
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
}

fragment FillwidthItem_artwork on Artwork {
  image {
    url(version: "large")
    aspectRatio
  }
  imageTitle
  title
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment Genes_artist on Artist {
  related {
    genes {
      edges {
        node {
          href
          name
          id
        }
      }
    }
  }
}

fragment MarketInsights_artist on Artist {
  internalID
  collections
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0a")
        }
        id
      }
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment Overview_artist on Artist {
  ...ArtistBio_bio
  ...CurrentEvent_artist
  ...MarketInsights_artist
  ...SelectedCareerAchievements_artist
  ...Genes_artist
  ...FollowArtistButton_artist
  ...WorksForSaleRail_artist
  ...ArtistConsignButton_artist
  ...ArtistTopWorksRail_artist
  slug
  id
  statuses {
    artworks
    cv(minShowCount: 0)
  }
  counts {
    partner_shows: partnerShows
    forSaleArtworks
    ecommerce_artworks: ecommerceArtworks
    auction_artworks: auctionArtworks
    artworks
    has_make_offer_artworks: hasMakeOfferArtworks
  }
  href
  name
  biographyBlurb(format: HTML, partnerBio: true) {
    text
  }
  currentEvent {
    name
  }
  related {
    genes {
      edges {
        node {
          slug
          id
        }
      }
    }
    artistsConnection(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
  showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
    edges {
      node {
        name
        href
        exhibitionPeriod
        coverImage {
          cropped(width: 220, height: 140) {
            url
            width
            height
          }
        }
        id
      }
    }
  }
  articlesConnection(first: 4, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {
    edges {
      node {
        href
        thumbnailTitle
        publishedAt(format: "MMM Do, YYYY")
        thumbnailImage {
          cropped(width: 120, height: 80) {
            url
          }
        }
        id
      }
    }
  }
  internalID
  collections
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
  }
}

fragment Save_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SelectedCareerAchievements_artist on Artist {
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
    label
    entities
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
        id
      }
    }
  }
}

fragment WorksForSaleRail_artist on Artist {
  artworksConnection(first: 20, sort: AVAILABILITY_ASC) {
    edges {
      node {
        id
        ...FillwidthItem_artwork
      }
    }
  }
  ...FollowArtistButton_artist
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artworks",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": "large"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"large\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "aspectRatio",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v17 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v18 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v19 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v20 = {
  "alias": null,
  "args": (v19/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v21 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": (v19/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v6/*: any*/),
    (v2/*: any*/),
    (v11/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "Sale",
  "kind": "LinkedField",
  "name": "sale",
  "plural": false,
  "selections": [
    {
      "alias": "is_auction",
      "args": null,
      "kind": "ScalarField",
      "name": "isAuction",
      "storageKey": null
    },
    {
      "alias": "is_closed",
      "args": null,
      "kind": "ScalarField",
      "name": "isClosed",
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": "is_live_open",
      "args": null,
      "kind": "ScalarField",
      "name": "isLiveOpen",
      "storageKey": null
    },
    {
      "alias": "is_open",
      "args": null,
      "kind": "ScalarField",
      "name": "isOpen",
      "storageKey": null
    },
    {
      "alias": "is_preview",
      "args": null,
      "kind": "ScalarField",
      "name": "isPreview",
      "storageKey": null
    },
    {
      "alias": "display_timely_at",
      "args": null,
      "kind": "ScalarField",
      "name": "displayTimelyAt",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v24 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v25 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": "bidder_positions",
          "args": null,
          "kind": "ScalarField",
          "name": "bidderPositions",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "highest_bid",
      "args": null,
      "concreteType": "SaleArtworkHighestBid",
      "kind": "LinkedField",
      "name": "highestBid",
      "plural": false,
      "selections": (v24/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v24/*: any*/),
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v26 = {
  "alias": "is_inquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isInquireable",
  "storageKey": null
},
v27 = {
  "alias": "is_saved",
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v28 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_OverviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Overview_artist"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "routes_OverviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partnerBio",
                "value": true
              }
            ],
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CurrentEvent",
            "kind": "LinkedField",
            "name": "currentEvent",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "event",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": "resized(width:300)"
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "details",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partner",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "collections",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "displayOnPartnerProfile",
                    "value": true
                  },
                  (v8/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "partnerCategory",
                    "value": [
                      "blue-chip",
                      "top-established",
                      "top-emerging"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "representedBy",
                    "value": true
                  }
                ],
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "kind": "LinkedField",
                            "name": "categories",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v10/*: any*/),
              {
                "kind": "Literal",
                "name": "recordsTrusted",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PRICE_AND_DATE_DESC"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "0a"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": "display(format:\"0a\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "organization",
                        "storageKey": null
                      },
                      {
                        "alias": "sale_date",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": "saleDate(format:\"YYYY\")"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v5/*: any*/),
                          (v2/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  (v10/*: any*/)
                ],
                "concreteType": "ArtistConnection",
                "kind": "LinkedField",
                "name": "artistsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artistsConnection(first:1)"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          (v5/*: any*/),
          (v9/*: any*/),
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "follows",
                "storageKey": null
              },
              {
                "alias": "partner_shows",
                "args": null,
                "kind": "ScalarField",
                "name": "partnerShows",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "forSaleArtworks",
                "storageKey": null
              },
              {
                "alias": "ecommerce_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "ecommerceArtworks",
                "storageKey": null
              },
              {
                "alias": "auction_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "auctionArtworks",
                "storageKey": null
              },
              (v12/*: any*/),
              {
                "alias": "has_make_offer_artworks",
                "args": null,
                "kind": "ScalarField",
                "name": "hasMakeOfferArtworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "AVAILABILITY_ASC"
              }
            ],
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v6/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artworksConnection(first:20,sort:\"AVAILABILITY_ASC\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistTargetSupply",
            "kind": "LinkedField",
            "name": "targetSupply",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInMicrofunnel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isTargetSupply",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 66
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 66
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": "cropped(height:66,width:66)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v8/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-weighted_iconicity"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v9/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v6/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v7/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:10,sort:\"-weighted_iconicity\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "kind": "LinkedField",
            "name": "statuses",
            "plural": false,
            "selections": [
              (v12/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "minShowCount",
                    "value": 0
                  }
                ],
                "kind": "ScalarField",
                "name": "cv",
                "storageKey": "cv(minShowCount:0)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "END_AT_ASC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "running"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 140
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 220
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:140,width:220)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:5,sort:\"END_AT_ASC\",status:\"running\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 4
              },
              {
                "kind": "Literal",
                "name": "inEditorialFeed",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PUBLISHED_AT_DESC"
              }
            ],
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArticleEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Article",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "thumbnailTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM Do, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "thumbnailImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 80
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 120
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "cropped(height:80,width:120)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:4,inEditorialFeed:true,sort:\"PUBLISHED_AT_DESC\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "routes_OverviewQuery",
    "operationKind": "query",
    "text": "query routes_OverviewQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...Overview_artist\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML, partnerBio: true) {\n    text\n  }\n}\n\nfragment ArtistConsignButton_artist on Artist {\n  targetSupply {\n    isInMicrofunnel\n    isTargetSupply\n  }\n  internalID\n  slug\n  name\n  href\n  image {\n    cropped(width: 66, height: 66) {\n      url\n    }\n  }\n}\n\nfragment ArtistTopWorksRail_artist on Artist {\n  slug\n  id\n  filterArtworksConnection(sort: \"-weighted_iconicity\", first: 10) {\n    edges {\n      node {\n        id\n        slug\n        ...FillwidthItem_artwork\n      }\n    }\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment CurrentEvent_artist on Artist {\n  currentEvent {\n    event {\n      __typename\n      ... on Node {\n        id\n      }\n    }\n    image {\n      resized(width: 300) {\n        url\n      }\n    }\n    name\n    status\n    details\n    partner\n    href\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"large\")\n    aspectRatio\n  }\n  imageTitle\n  title\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment Genes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment MarketInsights_artist on Artist {\n  internalID\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0a\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Overview_artist on Artist {\n  ...ArtistBio_bio\n  ...CurrentEvent_artist\n  ...MarketInsights_artist\n  ...SelectedCareerAchievements_artist\n  ...Genes_artist\n  ...FollowArtistButton_artist\n  ...WorksForSaleRail_artist\n  ...ArtistConsignButton_artist\n  ...ArtistTopWorksRail_artist\n  slug\n  id\n  statuses {\n    artworks\n    cv(minShowCount: 0)\n  }\n  counts {\n    partner_shows: partnerShows\n    forSaleArtworks\n    ecommerce_artworks: ecommerceArtworks\n    auction_artworks: auctionArtworks\n    artworks\n    has_make_offer_artworks: hasMakeOfferArtworks\n  }\n  href\n  name\n  biographyBlurb(format: HTML, partnerBio: true) {\n    text\n  }\n  currentEvent {\n    name\n  }\n  related {\n    genes {\n      edges {\n        node {\n          slug\n          id\n        }\n      }\n    }\n    artistsConnection(first: 1) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n  showsConnection(first: 5, sort: END_AT_ASC, status: \"running\") {\n    edges {\n      node {\n        name\n        href\n        exhibitionPeriod\n        coverImage {\n          cropped(width: 220, height: 140) {\n            url\n            width\n            height\n          }\n        }\n        id\n      }\n    }\n  }\n  articlesConnection(first: 4, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {\n    edges {\n      node {\n        href\n        thumbnailTitle\n        publishedAt(format: \"MMM Do, YYYY\")\n        thumbnailImage {\n          cropped(width: 120, height: 80) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n  internalID\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n  }\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SelectedCareerAchievements_artist on Artist {\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n    label\n    entities\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n}\n\nfragment WorksForSaleRail_artist on Artist {\n  artworksConnection(first: 20, sort: AVAILABILITY_ASC) {\n    edges {\n      node {\n        id\n        ...FillwidthItem_artwork\n      }\n    }\n  }\n  ...FollowArtistButton_artist\n}\n"
  }
};
})();
(node as any).hash = '7b363bda8a21441a1f70cdb91afd3ce7';
export default node;
