/**
 * @generated SignedSource<<3300fd66619fb4a7da558ac7c3ac2034>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_Test_Query$variables = {};
export type ArtworkSidebar_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar_artwork">;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar_me">;
  } | null;
};
export type ArtworkSidebar_Test_Query = {
  response: ArtworkSidebar_Test_Query$data;
  variables: ArtworkSidebar_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "alias": "is_acquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v2 = {
  "alias": "is_offerable",
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
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
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v10 = {
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v13 = [
  (v12/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
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
  "type": "FormattedNumber"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "BidderPosition"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
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
            "alias": "is_biddable",
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerifiedSeller",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cities",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
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
              (v6/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedNationalityAndBirthday",
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
                    "name": "artworks",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "forSaleArtworks",
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
              (v3/*: any*/),
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
            "alias": "edition_sets",
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
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
              (v3/*: any*/),
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
              (v11/*: any*/),
              {
                "alias": "current_bid",
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v13/*: any*/),
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
                  (v14/*: any*/),
                  (v12/*: any*/)
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
          (v10/*: any*/),
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
                "name": "shortArrayDescription",
                "storageKey": null
              },
              (v3/*: any*/),
              (v6/*: any*/)
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
              (v6/*: any*/),
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v3/*: any*/),
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
              (v7/*: any*/),
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
                  (v3/*: any*/)
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
                "name": "cascadingEndTimeIntervalMinutes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveStartAt",
                "storageKey": null
              },
              (v15/*: any*/),
              (v16/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
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
                "selections": (v13/*: any*/),
                "storageKey": null
              },
              (v3/*: any*/),
              (v15/*: any*/),
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
                "kind": "ScalarField",
                "name": "extendedBiddingEndAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotID",
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
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingPeriodMinutes",
                    "storageKey": null
                  },
                  (v17/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 0
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
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:0)"
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
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
                  (v3/*: any*/)
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
                      (v12/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myLotStanding(live:true)"
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Gene",
                "kind": "LinkedField",
                "name": "filterGene",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v4/*: any*/),
                  (v3/*: any*/)
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
                "selections": (v13/*: any*/),
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v13/*: any*/),
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
          (v9/*: any*/),
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
            "name": "isInquireable",
            "storageKey": null
          },
          (v3/*: any*/)
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
              (v6/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b7c04fce1f76b89e70fe79cd00d2acd1",
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
        "artwork.artists.avatar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.artists.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artwork.artists.avatar.cropped.src": (v18/*: any*/),
        "artwork.artists.avatar.cropped.srcSet": (v18/*: any*/),
        "artwork.artists.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artwork.artists.counts.artworks": (v19/*: any*/),
        "artwork.artists.counts.forSaleArtworks": (v19/*: any*/),
        "artwork.artists.formattedNationalityAndBirthday": (v20/*: any*/),
        "artwork.artists.href": (v20/*: any*/),
        "artwork.artists.id": (v21/*: any*/),
        "artwork.artists.initials": (v20/*: any*/),
        "artwork.artists.internalID": (v21/*: any*/),
        "artwork.artists.is_consignable": (v22/*: any*/),
        "artwork.artists.name": (v20/*: any*/),
        "artwork.artists.slug": (v21/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v21/*: any*/),
        "artwork.attributionClass.internalID": (v21/*: any*/),
        "artwork.attributionClass.shortArrayDescription": (v23/*: any*/),
        "artwork.culturalMaker": (v20/*: any*/),
        "artwork.date": (v20/*: any*/),
        "artwork.dimensions": (v24/*: any*/),
        "artwork.dimensions.cm": (v20/*: any*/),
        "artwork.dimensions.in": (v20/*: any*/),
        "artwork.edition_of": (v20/*: any*/),
        "artwork.edition_sets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.edition_sets.__isSellable": (v18/*: any*/),
        "artwork.edition_sets.__typename": (v18/*: any*/),
        "artwork.edition_sets.dimensions": (v24/*: any*/),
        "artwork.edition_sets.dimensions.cm": (v20/*: any*/),
        "artwork.edition_sets.dimensions.in": (v20/*: any*/),
        "artwork.edition_sets.edition_of": (v20/*: any*/),
        "artwork.edition_sets.id": (v21/*: any*/),
        "artwork.edition_sets.internalID": (v21/*: any*/),
        "artwork.edition_sets.is_acquireable": (v22/*: any*/),
        "artwork.edition_sets.is_offerable": (v22/*: any*/),
        "artwork.edition_sets.sale_message": (v20/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v22/*: any*/),
        "artwork.id": (v21/*: any*/),
        "artwork.internalID": (v21/*: any*/),
        "artwork.isInquireable": (v22/*: any*/),
        "artwork.isOfferableFromInquiry": (v22/*: any*/),
        "artwork.isPriceHidden": (v22/*: any*/),
        "artwork.is_acquireable": (v22/*: any*/),
        "artwork.is_biddable": (v22/*: any*/),
        "artwork.is_for_sale": (v22/*: any*/),
        "artwork.is_in_auction": (v22/*: any*/),
        "artwork.is_inquireable": (v22/*: any*/),
        "artwork.is_offerable": (v22/*: any*/),
        "artwork.is_sold": (v22/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v18/*: any*/),
        "artwork.listPrice.display": (v20/*: any*/),
        "artwork.medium": (v20/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.mediumType.filterGene.id": (v21/*: any*/),
        "artwork.mediumType.filterGene.name": (v20/*: any*/),
        "artwork.mediumType.filterGene.slug": (v21/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.active_bid": (v25/*: any*/),
        "artwork.myLotStanding.active_bid.id": (v21/*: any*/),
        "artwork.myLotStanding.active_bid.is_winning": (v22/*: any*/),
        "artwork.myLotStanding.most_recent_bid": (v25/*: any*/),
        "artwork.myLotStanding.most_recent_bid.id": (v21/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.cents": (v26/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid.display": (v20/*: any*/),
        "artwork.partner": (v27/*: any*/),
        "artwork.partner.cities": (v23/*: any*/),
        "artwork.partner.href": (v20/*: any*/),
        "artwork.partner.id": (v21/*: any*/),
        "artwork.partner.isVerifiedSeller": (v22/*: any*/),
        "artwork.partner.name": (v20/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v20/*: any*/),
        "artwork.sale": (v28/*: any*/),
        "artwork.sale.cascadingEndTimeIntervalMinutes": (v29/*: any*/),
        "artwork.sale.endAt": (v20/*: any*/),
        "artwork.sale.extendedBiddingIntervalMinutes": (v29/*: any*/),
        "artwork.sale.href": (v20/*: any*/),
        "artwork.sale.id": (v21/*: any*/),
        "artwork.sale.internalID": (v21/*: any*/),
        "artwork.sale.isBenefit": (v22/*: any*/),
        "artwork.sale.isClosed": (v22/*: any*/),
        "artwork.sale.is_closed": (v22/*: any*/),
        "artwork.sale.is_live_open": (v22/*: any*/),
        "artwork.sale.is_open": (v22/*: any*/),
        "artwork.sale.is_preview": (v22/*: any*/),
        "artwork.sale.is_registration_closed": (v22/*: any*/),
        "artwork.sale.is_with_buyers_premium": (v22/*: any*/),
        "artwork.sale.liveStartAt": (v20/*: any*/),
        "artwork.sale.name": (v20/*: any*/),
        "artwork.sale.partner": (v27/*: any*/),
        "artwork.sale.partner.id": (v21/*: any*/),
        "artwork.sale.partner.name": (v20/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v21/*: any*/),
        "artwork.sale.registrationStatus.qualified_for_bidding": (v22/*: any*/),
        "artwork.sale.requireIdentityVerification": (v22/*: any*/),
        "artwork.sale.slug": (v21/*: any*/),
        "artwork.sale.startAt": (v20/*: any*/),
        "artwork.saleArtwork": (v30/*: any*/),
        "artwork.saleArtwork.currentBid": (v31/*: any*/),
        "artwork.saleArtwork.currentBid.display": (v20/*: any*/),
        "artwork.saleArtwork.endAt": (v20/*: any*/),
        "artwork.saleArtwork.endedAt": (v20/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v20/*: any*/),
        "artwork.saleArtwork.formattedStartDateTime": (v20/*: any*/),
        "artwork.saleArtwork.id": (v21/*: any*/),
        "artwork.saleArtwork.lotID": (v20/*: any*/),
        "artwork.saleArtwork.sale": (v28/*: any*/),
        "artwork.saleArtwork.sale.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "artwork.saleArtwork.sale.artworksConnection.totalCount": (v29/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingIntervalMinutes": (v29/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingPeriodMinutes": (v29/*: any*/),
        "artwork.saleArtwork.sale.id": (v21/*: any*/),
        "artwork.saleArtwork.sale.internalID": (v21/*: any*/),
        "artwork.saleArtwork.sale.startAt": (v20/*: any*/),
        "artwork.sale_artwork": (v30/*: any*/),
        "artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.sale_artwork.counts.bidder_positions": (v19/*: any*/),
        "artwork.sale_artwork.current_bid": (v31/*: any*/),
        "artwork.sale_artwork.current_bid.display": (v20/*: any*/),
        "artwork.sale_artwork.endedAt": (v20/*: any*/),
        "artwork.sale_artwork.estimate": (v20/*: any*/),
        "artwork.sale_artwork.id": (v21/*: any*/),
        "artwork.sale_artwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.sale_artwork.increments.cents": (v26/*: any*/),
        "artwork.sale_artwork.increments.display": (v20/*: any*/),
        "artwork.sale_artwork.is_with_reserve": (v22/*: any*/),
        "artwork.sale_artwork.lot_label": (v20/*: any*/),
        "artwork.sale_artwork.reserve_message": (v20/*: any*/),
        "artwork.sale_artwork.reserve_status": (v20/*: any*/),
        "artwork.sale_message": (v20/*: any*/),
        "artwork.shippingInfo": (v20/*: any*/),
        "artwork.shippingOrigin": (v20/*: any*/),
        "artwork.slug": (v21/*: any*/),
        "artwork.title": (v20/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v21/*: any*/),
        "me.identityVerified": (v22/*: any*/),
        "me.pendingIdentityVerification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "IdentityVerification"
        },
        "me.pendingIdentityVerification.id": (v21/*: any*/),
        "me.pendingIdentityVerification.internalID": (v21/*: any*/)
      }
    },
    "name": "ArtworkSidebar_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar_artwork\n    id\n  }\n  me {\n    ...ArtworkSidebar_me\n    id\n  }\n}\n\nfragment ArtworkSidebar2BiddingClosedMessage_artwork on Artwork {\n  artists {\n    internalID\n    id\n  }\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  culturalMaker\n  artists {\n    ...EntityHeaderArtist_artist\n    internalID\n    slug\n    name\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {\n  internalID\n  sale {\n    isClosed\n    id\n  }\n  saleArtwork {\n    currentBid {\n      display\n    }\n    id\n  }\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_me on Me {\n  ...ArtworkSidebarBidAction_me\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeIntervalMinutes\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  identityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  artists {\n    internalID\n    id\n  }\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  artists {\n    internalID\n    id\n  }\n  internalID\n  isOfferableFromInquiry\n  isPriceHidden\n  is_acquireable: isAcquireable\n  is_for_sale: isForSale\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  is_sold: isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  slug\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  ...ArtworkSidebar2BiddingClosedMessage_artwork\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  is_in_auction: isInAuction\n  partner {\n    name\n    href\n    cities\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction: isInAuction\n  is_sold: isSold\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  hasCertificateOfAuthenticity\n  partner {\n    isVerifiedSeller\n    id\n  }\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarAuctionInfoPolling_artwork\n  ...ArtworkSidebarAuctionTimer_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  ...SecurePayment_artwork\n  ...VerifiedSeller_artwork\n  ...AuthenticityCertificate_artwork\n  ...BuyerGuarantee_artwork\n  ...CreateArtworkAlertSection_artwork\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  sale {\n    is_closed: isClosed\n    startAt\n    internalID\n    extendedBiddingIntervalMinutes\n    id\n  }\n  saleArtwork {\n    endAt\n    endedAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  artists {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebar_me on Me {\n  ...ArtworkSidebarAuctionInfoPolling_me\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n\nfragment BuyerGuarantee_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment CreateArtworkAlertSection_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  extendedBiddingEndAt\n  lotID\n  sale {\n    startAt\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    internalID\n    artworksConnection(first: 0) {\n      totalCount\n    }\n    id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "87135352fd24172d7ca36ff211f2a3f1";

export default node;
