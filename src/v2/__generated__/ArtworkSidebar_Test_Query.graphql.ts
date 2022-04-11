/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_Test_QueryVariables = {};
export type ArtworkSidebar_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_me">;
    } | null;
};
export type ArtworkSidebar_Test_Query = {
    readonly response: ArtworkSidebar_Test_QueryResponse;
    readonly variables: ArtworkSidebar_Test_QueryVariables;
};



/*
query ArtworkSidebar_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebar_artwork
    id
  }
  me {
    ...ArtworkSidebar_me
    id
  }
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  cultural_maker: culturalMaker
  artists {
    ...EntityHeaderArtist_artist
    internalID
    slug
    name
    ...FollowArtistButton_artist_2eN9lh
    id
  }
}

fragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {
  internalID
  sale {
    isClosed
    id
  }
  saleArtwork {
    currentBid {
      display
    }
    id
  }
  ...ArtworkSidebarCurrentBidInfo_artwork
  ...ArtworkSidebarBidAction_artwork
}

fragment ArtworkSidebarAuctionInfoPolling_me on Me {
  ...ArtworkSidebarBidAction_me
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

fragment ArtworkSidebarAuctionTimer_artwork on Artwork {
  internalID
  sale {
    cascadingEndTimeInterval
    isClosed
    ...AuctionTimer_sale
    startAt
    id
  }
  saleArtwork {
    ...LotTimer_saleArtwork
    endAt
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
    endedAt
    id
  }
}

fragment ArtworkSidebarBidAction_me on Me {
  identityVerified
  pendingIdentityVerification {
    internalID
    id
  }
}

fragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {
  ...ArtworkSidebarCreateAlertButton_artwork
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attributionClass {
    shortDescription
    id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  edition_sets: editionSets {
    internalID
    id
    is_acquireable: isAcquireable
    is_offerable: isOfferable
    sale_message: saleMessage
    ...ArtworkSidebarSizeInfo_piece
  }
  internalID
  isOfferableFromInquiry
  isPriceHidden
  is_acquireable: isAcquireable
  is_for_sale: isForSale
  is_inquireable: isInquireable
  is_offerable: isOfferable
  is_sold: isSold
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
  slug
  ...ArtworkSidebarCreateAlertButton_artwork
}

fragment ArtworkSidebarCreateAlertButton_artwork on Artwork {
  slug
  internalID
  title
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
    name
    id
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
    endedAt
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
  ...ArtworkSidebarBiddingClosedMessage_artwork
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
  __isSellable: __typename
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
  is_sold: isSold
  ...ArtworkSidebarArtists_artwork
  ...ArtworkSidebarMetadata_artwork
  ...ArtworkSidebarAuctionPartnerInfo_artwork
  ...ArtworkSidebarAuctionInfoPolling_artwork
  ...ArtworkSidebarAuctionTimer_artwork
  ...ArtworkSidebarCommercial_artwork
  ...ArtworkSidebarPartnerInfo_artwork
  ...ArtworkSidebarExtraLinks_artwork
  ...SecurePayment_artwork
  ...VerifiedSeller_artwork
  ...AuthenticityCertificate_artwork
  ...BuyerGuarantee_artwork
  ...CreateArtworkAlertSection_artwork
  ...ArtworkSidebarBiddingClosedMessage_artwork
  sale {
    is_closed: isClosed
    startAt
    id
  }
  saleArtwork {
    endAt
    id
  }
}

fragment ArtworkSidebar_me on Me {
  ...ArtworkSidebarAuctionInfoPolling_me
}

fragment AuctionTimer_sale on Sale {
  liveStartAt
  endAt
}

fragment AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  is_biddable: isBiddable
}

fragment BuyerGuarantee_artwork on Artwork {
  is_acquireable: isAcquireable
  is_offerable: isOfferable
}

fragment CreateArtworkAlertSection_artwork on Artwork {
  internalID
  title
  slug
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
    name
    id
  }
}

fragment EntityHeaderArtist_artist on Artist {
  internalID
  href
  slug
  name
  initials
  formattedNationalityAndBirthday
  counts {
    artworks
    forSaleArtworks
  }
  avatar: image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
}

fragment FollowArtistButton_artist_2eN9lh on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
  ...FollowArtistPopover_artist
}

fragment FollowArtistPopoverRow_artist on Artist {
  internalID
  name
  formattedNationalityAndBirthday
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

fragment LotTimer_saleArtwork on SaleArtwork {
  endAt
  formattedStartDateTime
  sale {
    startAt
    id
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
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedNationalityAndBirthday",
  "storageKey": null
},
v6 = [
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": "is_acquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v10 = {
  "alias": "is_offerable",
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v11 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "edition_of",
      "args": null,
      "kind": "ScalarField",
      "name": "editionOf",
      "storageKey": null
    }
  ],
  "type": "Sellable",
  "abstractKey": "__isSellable"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v14 = [
  (v13/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "BidderPosition"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCurrentBid"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebar_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebar_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebar_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebar_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": "is_in_auction",
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
          {
            "alias": "is_sold",
            "args": null,
            "kind": "ScalarField",
            "name": "isSold",
            "storageKey": null
          },
          {
            "alias": "cultural_maker",
            "args": null,
            "kind": "ScalarField",
            "name": "culturalMaker",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              (v5/*: any*/),
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
                    "name": "artworks",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "follows",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "avatar",
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v6/*: any*/),
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "src",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "srcSet",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:45,width:45)"
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/),
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
                "concreteType": "ArtistRelatedData",
                "kind": "LinkedField",
                "name": "related",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
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
                    "kind": "LinkedField",
                    "name": "suggestedConnection",
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
                              (v7/*: any*/),
                              (v1/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
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
                                    "args": (v6/*: any*/),
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "cropped(height:45,width:45)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "is_consignable",
                "args": null,
                "kind": "ScalarField",
                "name": "isConsignable",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "is_biddable",
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          {
            "alias": "edition_sets",
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v7/*: any*/),
              (v1/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "sale_artwork",
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": "lot_label",
                "args": null,
                "kind": "ScalarField",
                "name": "lotLabel",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "estimate",
                "storageKey": null
              },
              {
                "alias": "is_with_reserve",
                "args": null,
                "kind": "ScalarField",
                "name": "isWithReserve",
                "storageKey": null
              },
              {
                "alias": "reserve_message",
                "args": null,
                "kind": "ScalarField",
                "name": "reserveMessage",
                "storageKey": null
              },
              {
                "alias": "reserve_status",
                "args": null,
                "kind": "ScalarField",
                "name": "reserveStatus",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endedAt",
                "storageKey": null
              },
              {
                "alias": "current_bid",
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v14/*: any*/),
                "storageKey": null
              },
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
                "alias": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v15/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortDescription",
                "storageKey": null
              },
              (v7/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v7/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "locations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "city",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerifiedSeller",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": "is_live_open",
                "args": null,
                "kind": "ScalarField",
                "name": "isLiveOpen",
                "storageKey": null
              },
              {
                "alias": "is_with_buyers_premium",
                "args": null,
                "kind": "ScalarField",
                "name": "isWithBuyersPremium",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Bidder",
                "kind": "LinkedField",
                "name": "registrationStatus",
                "plural": false,
                "selections": [
                  {
                    "alias": "qualified_for_bidding",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "qualifiedForBidding",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
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
                "alias": "is_open",
                "args": null,
                "kind": "ScalarField",
                "name": "isOpen",
                "storageKey": null
              },
              {
                "alias": "is_registration_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "requireIdentityVerification",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cascadingEndTimeInterval",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveStartAt",
                "storageKey": null
              },
              (v16/*: any*/),
              (v17/*: any*/),
              (v4/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBenefit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v14/*: any*/),
                "storageKey": null
              },
              (v7/*: any*/),
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedStartDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v17/*: any*/),
                  (v7/*: any*/)
                ],
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
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "myLotStanding",
            "plural": true,
            "selections": [
              {
                "alias": "active_bid",
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "activeBid",
                "plural": false,
                "selections": [
                  {
                    "alias": "is_winning",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isWinning",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "most_recent_bid",
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "mostRecentBid",
                "plural": false,
                "selections": [
                  {
                    "alias": "max_bid",
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "kind": "LinkedField",
                    "name": "maxBid",
                    "plural": false,
                    "selections": [
                      (v13/*: any*/),
                      (v15/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myLotStanding(live:true)"
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferableFromInquiry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceHidden",
            "storageKey": null
          },
          (v9/*: any*/),
          {
            "alias": "is_for_sale",
            "args": null,
            "kind": "ScalarField",
            "name": "isForSale",
            "storageKey": null
          },
          {
            "alias": "is_inquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "Money",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceIncludesTaxDisplay",
            "storageKey": null
          },
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingInfo",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingOrigin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
            "storageKey": null
          },
          (v7/*: any*/),
          (v12/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "identityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "pendingIdentityVerification",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4bf82c3e58f6f0b14fa307e6b9b32b5f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.__isSellable": (v18/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.avatar": (v19/*: any*/),
        "artwork.artists.avatar.cropped": (v20/*: any*/),
        "artwork.artists.avatar.cropped.src": (v18/*: any*/),
        "artwork.artists.avatar.cropped.srcSet": (v18/*: any*/),
        "artwork.artists.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artwork.artists.counts.artworks": (v21/*: any*/),
        "artwork.artists.counts.follows": (v21/*: any*/),
        "artwork.artists.counts.forSaleArtworks": (v21/*: any*/),
        "artwork.artists.formattedNationalityAndBirthday": (v22/*: any*/),
        "artwork.artists.href": (v22/*: any*/),
        "artwork.artists.id": (v23/*: any*/),
        "artwork.artists.initials": (v22/*: any*/),
        "artwork.artists.internalID": (v23/*: any*/),
        "artwork.artists.is_consignable": (v24/*: any*/),
        "artwork.artists.is_followed": (v24/*: any*/),
        "artwork.artists.name": (v22/*: any*/),
        "artwork.artists.related": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistRelatedData"
        },
        "artwork.artists.related.suggestedConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistConnection"
        },
        "artwork.artists.related.suggestedConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistEdge"
        },
        "artwork.artists.related.suggestedConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.artists.related.suggestedConnection.edges.node.formattedNationalityAndBirthday": (v22/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.id": (v23/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image": (v19/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image.cropped": (v20/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image.cropped.url": (v18/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.internalID": (v23/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.name": (v22/*: any*/),
        "artwork.artists.slug": (v23/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v23/*: any*/),
        "artwork.attributionClass.name": (v22/*: any*/),
        "artwork.attributionClass.shortDescription": (v22/*: any*/),
        "artwork.cultural_maker": (v22/*: any*/),
        "artwork.date": (v22/*: any*/),
        "artwork.dimensions": (v25/*: any*/),
        "artwork.dimensions.cm": (v22/*: any*/),
        "artwork.dimensions.in": (v22/*: any*/),
        "artwork.edition_of": (v22/*: any*/),
        "artwork.edition_sets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.edition_sets.__isSellable": (v18/*: any*/),
        "artwork.edition_sets.__typename": (v18/*: any*/),
        "artwork.edition_sets.dimensions": (v25/*: any*/),
        "artwork.edition_sets.dimensions.cm": (v22/*: any*/),
        "artwork.edition_sets.dimensions.in": (v22/*: any*/),
        "artwork.edition_sets.edition_of": (v22/*: any*/),
        "artwork.edition_sets.id": (v23/*: any*/),
        "artwork.edition_sets.internalID": (v23/*: any*/),
        "artwork.edition_sets.is_acquireable": (v24/*: any*/),
        "artwork.edition_sets.is_offerable": (v24/*: any*/),
        "artwork.edition_sets.sale_message": (v22/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v24/*: any*/),
        "artwork.id": (v23/*: any*/),
        "artwork.internalID": (v23/*: any*/),
        "artwork.isOfferableFromInquiry": (v24/*: any*/),
        "artwork.isPriceHidden": (v24/*: any*/),
        "artwork.is_acquireable": (v24/*: any*/),
        "artwork.is_biddable": (v24/*: any*/),
        "artwork.is_for_sale": (v24/*: any*/),
        "artwork.is_in_auction": (v24/*: any*/),
        "artwork.is_inquireable": (v24/*: any*/),
        "artwork.is_offerable": (v24/*: any*/),
        "artwork.is_sold": (v24/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v18/*: any*/),
        "artwork.listPrice.display": (v22/*: any*/),
        "artwork.medium": (v22/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.active_bid": (v26/*: any*/),
        "artwork.myLotStanding.active_bid.id": (v23/*: any*/),
        "artwork.myLotStanding.active_bid.is_winning": (v24/*: any*/),
        "artwork.myLotStanding.most_recent_bid": (v26/*: any*/),
        "artwork.myLotStanding.most_recent_bid.id": (v23/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.cents": (v27/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid.display": (v22/*: any*/),
        "artwork.partner": (v28/*: any*/),
        "artwork.partner.href": (v22/*: any*/),
        "artwork.partner.id": (v23/*: any*/),
        "artwork.partner.isVerifiedSeller": (v24/*: any*/),
        "artwork.partner.locations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Location"
        },
        "artwork.partner.locations.city": (v22/*: any*/),
        "artwork.partner.locations.id": (v23/*: any*/),
        "artwork.partner.name": (v22/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v22/*: any*/),
        "artwork.sale": (v29/*: any*/),
        "artwork.sale.cascadingEndTimeInterval": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "artwork.sale.endAt": (v22/*: any*/),
        "artwork.sale.href": (v22/*: any*/),
        "artwork.sale.id": (v23/*: any*/),
        "artwork.sale.internalID": (v23/*: any*/),
        "artwork.sale.isBenefit": (v24/*: any*/),
        "artwork.sale.isClosed": (v24/*: any*/),
        "artwork.sale.is_closed": (v24/*: any*/),
        "artwork.sale.is_live_open": (v24/*: any*/),
        "artwork.sale.is_open": (v24/*: any*/),
        "artwork.sale.is_preview": (v24/*: any*/),
        "artwork.sale.is_registration_closed": (v24/*: any*/),
        "artwork.sale.is_with_buyers_premium": (v24/*: any*/),
        "artwork.sale.liveStartAt": (v22/*: any*/),
        "artwork.sale.name": (v22/*: any*/),
        "artwork.sale.partner": (v28/*: any*/),
        "artwork.sale.partner.id": (v23/*: any*/),
        "artwork.sale.partner.name": (v22/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v23/*: any*/),
        "artwork.sale.registrationStatus.qualified_for_bidding": (v24/*: any*/),
        "artwork.sale.requireIdentityVerification": (v24/*: any*/),
        "artwork.sale.slug": (v23/*: any*/),
        "artwork.sale.startAt": (v22/*: any*/),
        "artwork.saleArtwork": (v30/*: any*/),
        "artwork.saleArtwork.currentBid": (v31/*: any*/),
        "artwork.saleArtwork.currentBid.display": (v22/*: any*/),
        "artwork.saleArtwork.endAt": (v22/*: any*/),
        "artwork.saleArtwork.formattedStartDateTime": (v22/*: any*/),
        "artwork.saleArtwork.id": (v23/*: any*/),
        "artwork.saleArtwork.sale": (v29/*: any*/),
        "artwork.saleArtwork.sale.id": (v23/*: any*/),
        "artwork.saleArtwork.sale.startAt": (v22/*: any*/),
        "artwork.sale_artwork": (v30/*: any*/),
        "artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.sale_artwork.counts.bidder_positions": (v21/*: any*/),
        "artwork.sale_artwork.current_bid": (v31/*: any*/),
        "artwork.sale_artwork.current_bid.display": (v22/*: any*/),
        "artwork.sale_artwork.endedAt": (v22/*: any*/),
        "artwork.sale_artwork.estimate": (v22/*: any*/),
        "artwork.sale_artwork.id": (v23/*: any*/),
        "artwork.sale_artwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.sale_artwork.increments.cents": (v27/*: any*/),
        "artwork.sale_artwork.increments.display": (v22/*: any*/),
        "artwork.sale_artwork.is_with_reserve": (v24/*: any*/),
        "artwork.sale_artwork.lot_label": (v22/*: any*/),
        "artwork.sale_artwork.reserve_message": (v22/*: any*/),
        "artwork.sale_artwork.reserve_status": (v22/*: any*/),
        "artwork.sale_message": (v22/*: any*/),
        "artwork.shippingInfo": (v22/*: any*/),
        "artwork.shippingOrigin": (v22/*: any*/),
        "artwork.slug": (v23/*: any*/),
        "artwork.title": (v22/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v23/*: any*/),
        "me.identityVerified": (v24/*: any*/),
        "me.pendingIdentityVerification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "IdentityVerification"
        },
        "me.pendingIdentityVerification.id": (v23/*: any*/),
        "me.pendingIdentityVerification.internalID": (v23/*: any*/)
      }
    },
    "name": "ArtworkSidebar_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar_artwork\n    id\n  }\n  me {\n    ...ArtworkSidebar_me\n    id\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  cultural_maker: culturalMaker\n  artists {\n    ...EntityHeaderArtist_artist\n    internalID\n    slug\n    name\n    ...FollowArtistButton_artist_2eN9lh\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {\n  internalID\n  sale {\n    isClosed\n    id\n  }\n  saleArtwork {\n    currentBid {\n      display\n    }\n    id\n  }\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_me on Me {\n  ...ArtworkSidebarBidAction_me\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeInterval\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  identityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  internalID\n  isOfferableFromInquiry\n  isPriceHidden\n  is_acquireable: isAcquireable\n  is_for_sale: isForSale\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  is_sold: isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  slug\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    name\n    id\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    href\n    locations {\n      city\n      id\n    }\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction: isInAuction\n  is_sold: isSold\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarAuctionInfoPolling_artwork\n  ...ArtworkSidebarAuctionTimer_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  ...SecurePayment_artwork\n  ...VerifiedSeller_artwork\n  ...AuthenticityCertificate_artwork\n  ...BuyerGuarantee_artwork\n  ...CreateArtworkAlertSection_artwork\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  sale {\n    is_closed: isClosed\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    id\n  }\n}\n\nfragment ArtworkSidebar_me on Me {\n  ...ArtworkSidebarAuctionInfoPolling_me\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n\nfragment BuyerGuarantee_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment CreateArtworkAlertSection_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    name\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_artist\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  sale {\n    startAt\n    id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '87135352fd24172d7ca36ff211f2a3f1';
export default node;
