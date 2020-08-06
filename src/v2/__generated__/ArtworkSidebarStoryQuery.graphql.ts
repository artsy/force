/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarStoryQueryVariables = {};
export type ArtworkSidebarStoryQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_artwork">;
    } | null;
};
export type ArtworkSidebarStoryQuery = {
    readonly response: ArtworkSidebarStoryQueryResponse;
    readonly variables: ArtworkSidebarStoryQueryVariables;
};



/*
query ArtworkSidebarStoryQuery {
  artwork(id: "unused") {
    ...ArtworkSidebar_artwork
    id
  }
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  cultural_maker: culturalMaker
  artists {
    id
    internalID
    slug
    name
    href
    ...FollowArtistButton_artist_2eN9lh
  }
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  partner {
    name
    id
  }
  sale_artwork: saleArtwork {
    estimate
    id
  }
  sale {
    internalID
    is_closed: isClosed
    id
  }
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    most_recent_bid: mostRecentBid {
      max_bid: maxBid {
        cents
      }
      id
    }
  }
  slug
  internalID
  sale {
    slug
    registrationStatus {
      qualified_for_bidding: qualifiedForBidding
      id
    }
    is_preview: isPreview
    is_open: isOpen
    is_live_open: isLiveOpen
    is_closed: isClosed
    is_registration_closed: isRegistrationClosed
    requireIdentityVerification
    id
  }
  sale_artwork: saleArtwork {
    increments {
      cents
      display
    }
    id
  }
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attribution_class: attributionClass {
    short_description: shortDescription
    id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  slug
  internalID
  is_for_sale: isForSale
  is_acquireable: isAcquireable
  is_inquireable: isInquireable
  is_offerable: isOfferable
  listPrice {
    __typename
    ... on PriceRange {
      display
    }
    ... on Money {
      display
    }
  }
  priceIncludesTaxDisplay
  sale_message: saleMessage
  shippingInfo
  shippingOrigin
  edition_sets: editionSets {
    internalID
    id
    is_acquireable: isAcquireable
    is_offerable: isOfferable
    sale_message: saleMessage
    ...ArtworkSidebarSizeInfo_piece
  }
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  sale {
    is_closed: isClosed
    is_live_open: isLiveOpen
    internalID
    is_with_buyers_premium: isWithBuyersPremium
    id
  }
  sale_artwork: saleArtwork {
    is_with_reserve: isWithReserve
    reserve_message: reserveMessage
    reserve_status: reserveStatus
    current_bid: currentBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
  myLotStanding(live: true) {
    active_bid: activeBid {
      is_winning: isWinning
      id
    }
    most_recent_bid: mostRecentBid {
      max_bid: maxBid {
        display
      }
      id
    }
  }
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  internalID
  is_in_auction: isInAuction
  is_for_sale: isForSale
  is_acquireable: isAcquireable
  is_inquireable: isInquireable
  artists {
    is_consignable: isConsignable
    id
  }
  sale {
    is_closed: isClosed
    isBenefit
    partner {
      name
      id
    }
    id
  }
}

fragment ArtworkSidebarMetadata_artwork on Artwork {
  is_biddable: isBiddable
  edition_sets: editionSets {
    __typename
    id
  }
  sale_artwork: saleArtwork {
    lot_label: lotLabel
    id
  }
  ...ArtworkSidebarTitleInfo_artwork
  ...ArtworkSidebarSizeInfo_piece
  ...ArtworkSidebarClassification_artwork
}

fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
  partner {
    name
    href
    locations {
      city
      id
    }
    id
  }
  sale {
    name
    href
    id
  }
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  dimensions {
    in
    cm
  }
  edition_of: editionOf
}

fragment ArtworkSidebarTitleInfo_artwork on Artwork {
  title
  date
  medium
}

fragment ArtworkSidebar_artwork on Artwork {
  is_in_auction: isInAuction
  ...ArtworkSidebarArtists_artwork
  ...ArtworkSidebarMetadata_artwork
  ...ArtworkSidebarAuctionPartnerInfo_artwork
  ...ArtworkSidebarCurrentBidInfo_artwork
  ...ArtworkSidebarBidAction_artwork
  ...ArtworkSidebarCommercial_artwork
  ...ArtworkSidebarPartnerInfo_artwork
  ...ArtworkSidebarExtraLinks_artwork
  ...SecurePayment_artwork
  ...VerifiedSeller_artwork
  ...AuthenticityCertificate_artwork
  sale {
    is_closed: isClosed
    ...AuctionTimer_sale
    id
  }
}

fragment AuctionTimer_sale on Sale {
  live_start_at: liveStartAt
  end_at: endAt
}

fragment AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  is_biddable: isBiddable
}

fragment FollowArtistButton_artist_2eN9lh on Artist {
  id
  internalID
  name
  is_followed: isFollowed
  counts {
    follows
  }
  ...FollowArtistPopover_artist
}

fragment FollowArtistPopoverRow_artist on Artist {
  internalID
  name
  image {
    cropped(width: 45, height: 45) {
      url
    }
  }
}

fragment FollowArtistPopover_artist on Artist {
  related {
    suggestedConnection(first: 3, excludeFollowedArtists: true) {
      edges {
        node {
          id
          internalID
          ...FollowArtistPopoverRow_artist
        }
      }
    }
  }
}

fragment SecurePayment_artwork on Artwork {
  is_acquireable: isAcquireable
  is_offerable: isOfferable
}

fragment VerifiedSeller_artwork on Artwork {
  is_biddable: isBiddable
  partner {
    isVerifiedSeller
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": "is_acquireable",
  "name": "isAcquireable",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": "is_offerable",
  "name": "isOfferable",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": "sale_message",
  "name": "saleMessage",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "dimensions",
  "storageKey": null,
  "args": null,
  "concreteType": "dimensions",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "in",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cm",
      "args": null,
      "storageKey": null
    }
  ]
},
v11 = {
  "kind": "ScalarField",
  "alias": "edition_of",
  "name": "editionOf",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v13 = [
  (v12/*: any*/)
],
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebar_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": "is_in_auction",
            "name": "isInAuction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "cultural_maker",
            "name": "culturalMaker",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "is_followed",
                "name": "isFollowed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "follows",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "related",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "suggestedConnection",
                    "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "excludeFollowedArtists",
                        "value": true
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      }
                    ],
                    "concreteType": "ArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              (v4/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "cropped",
                                    "storageKey": "cropped(height:45,width:45)",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 45
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "url",
                                        "args": null,
                                        "storageKey": null
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "is_consignable",
                "name": "isConsignable",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": "is_biddable",
            "name": "isBiddable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "edition_sets",
            "name": "editionSets",
            "storageKey": null,
            "args": null,
            "concreteType": "EditionSet",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "sale_artwork",
            "name": "saleArtwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "lot_label",
                "name": "lotLabel",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "estimate",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_with_reserve",
                "name": "isWithReserve",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "reserve_message",
                "name": "reserveMessage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "reserve_status",
                "name": "reserveStatus",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": "current_bid",
                "name": "currentBid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "plural": false,
                "selections": (v13/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": "bidder_positions",
                    "name": "bidderPositions",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  (v14/*: any*/),
                  (v12/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "medium",
            "args": null,
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "LinkedField",
            "alias": "attribution_class",
            "name": "attributionClass",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributionClass",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "short_description",
                "name": "shortDescription",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v1/*: any*/),
              (v5/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "locations",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "city",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isVerifiedSeller",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "is_closed",
                "name": "isClosed",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "is_live_open",
                "name": "isLiveOpen",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_with_buyers_premium",
                "name": "isWithBuyersPremium",
                "args": null,
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "registrationStatus",
                "storageKey": null,
                "args": null,
                "concreteType": "Bidder",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": "qualified_for_bidding",
                    "name": "qualifiedForBidding",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "is_preview",
                "name": "isPreview",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_open",
                "name": "isOpen",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_registration_closed",
                "name": "isRegistrationClosed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "requireIdentityVerification",
                "args": null,
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isBenefit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partner",
                "storageKey": null,
                "args": null,
                "concreteType": "Partner",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v1/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "live_start_at",
                "name": "liveStartAt",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "end_at",
                "name": "endAt",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "myLotStanding",
            "storageKey": "myLotStanding(live:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "active_bid",
                "name": "activeBid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": "is_winning",
                    "name": "isWinning",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": "most_recent_bid",
                "name": "mostRecentBid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": "max_bid",
                    "name": "maxBid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v14/*: any*/)
                    ]
                  },
                  (v1/*: any*/)
                ]
              }
            ]
          },
          (v3/*: any*/),
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": "is_for_sale",
            "name": "isForSale",
            "args": null,
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "kind": "ScalarField",
            "alias": "is_inquireable",
            "name": "isInquireable",
            "args": null,
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "listPrice",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "PriceRange",
                "selections": (v13/*: any*/)
              },
              {
                "kind": "InlineFragment",
                "type": "Money",
                "selections": (v13/*: any*/)
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "priceIncludesTaxDisplay",
            "args": null,
            "storageKey": null
          },
          (v9/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingInfo",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingOrigin",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasCertificateOfAuthenticity",
            "args": null,
            "storageKey": null
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarStoryQuery",
    "id": null,
    "text": "query ArtworkSidebarStoryQuery {\n  artwork(id: \"unused\") {\n    ...ArtworkSidebar_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  cultural_maker: culturalMaker\n  artists {\n    id\n    internalID\n    slug\n    name\n    href\n    ...FollowArtistButton_artist_2eN9lh\n  }\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attribution_class: attributionClass {\n    short_description: shortDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  slug\n  internalID\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    href\n    locations {\n      city\n      id\n    }\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction: isInAuction\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  ...SecurePayment_artwork\n  ...VerifiedSeller_artwork\n  ...AuthenticityCertificate_artwork\n  sale {\n    is_closed: isClosed\n    ...AuctionTimer_sale\n    id\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  live_start_at: liveStartAt\n  end_at: endAt\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_artist\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '443ee3d12e770a1438ce579d26760270';
export default node;
