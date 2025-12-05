/**
 * @generated SignedSource<<b6b597ce2cae2a3c981fcc0e815503b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkSidebar_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar_artwork">;
  } | null | undefined;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "in",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cm",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "details",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionOf",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
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
  "name": "isInquireable",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v20 = [
  (v19/*: any*/)
],
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayText",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endedAt",
  "storageKey": null
},
v23 = [
  (v18/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v25 = [
  (v9/*: any*/),
  (v8/*: any*/)
],
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v31 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v32 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v35 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v37 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v38 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "BidderPosition"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v42 = {
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
            "name": "title",
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
            "args": [
              {
                "kind": "Literal",
                "name": "shallow",
                "value": true
              }
            ],
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isUnlisted",
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
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEdition",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v1/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "dimensions",
                "kind": "LinkedField",
                "name": "dimensions",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/)
                ],
                "type": "Sellable",
                "abstractKey": "__isSellable"
              }
            ],
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
                "name": "shortArrayDescription",
                "storageKey": null
              },
              (v1/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CollectorSignals",
            "kind": "LinkedField",
            "name": "collectorSignals",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "ignore",
                    "value": [
                      "PARTNER_OFFER"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "primaryLabel",
                "storageKey": "primaryLabel(ignore:[\"PARTNER_OFFER\"])"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Show",
                "kind": "LinkedField",
                "name": "runningShow",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollector",
                "kind": "LinkedField",
                "name": "partnerOffer",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "increasedInterest",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "curatorsPick",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionCollectorSignals",
                "kind": "LinkedField",
                "name": "auction",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotWatcherCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidCount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEligibleToCreateAlert",
            "storageKey": null
          },
          (v5/*: any*/),
          (v2/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSold",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceListedDisplay",
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
              (v17/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v18/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
                    "plural": false,
                    "selections": (v20/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v20/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v18/*: any*/),
                  (v19/*: any*/)
                ],
                "type": "Money",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
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
                  (v2/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v17/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "longDescription",
                "storageKey": null
              }
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "icon",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "square140"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:\"square140\")"
                      }
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPubliclyVisible",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cities",
                "storageKey": null
              },
              (v16/*: any*/),
              (v2/*: any*/),
              (v5/*: any*/)
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
            "name": "shippingInfo",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pickupAvailable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TaxInfo",
            "kind": "LinkedField",
            "name": "taxInfo",
            "plural": false,
            "selections": [
              (v21/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TaxMoreInfo",
                "kind": "LinkedField",
                "name": "moreInfo",
                "plural": false,
                "selections": [
                  (v21/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
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
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
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
              (v14/*: any*/),
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isLiveOpenHappened",
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": "is_with_buyers_premium",
                "args": null,
                "kind": "ScalarField",
                "name": "isWithBuyersPremium",
                "storageKey": null
              },
              (v2/*: any*/),
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
                  (v1/*: any*/)
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
                "alias": "is_live_open",
                "args": null,
                "kind": "ScalarField",
                "name": "isLiveOpen",
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
                "name": "isAuction",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
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
                "kind": "ScalarField",
                "name": "estimate",
                "storageKey": null
              },
              (v1/*: any*/),
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
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingPeriodMinutes",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingIntervalMinutes",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v23/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotLabel",
                "storageKey": null
              }
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
              (v22/*: any*/),
              {
                "alias": "current_bid",
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v23/*: any*/),
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v24/*: any*/),
                  (v18/*: any*/)
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
                  (v1/*: any*/)
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
                      (v18/*: any*/),
                      (v24/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myLotStanding(live:true)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "series",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "publisher",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "manufacturer",
            "storageKey": null
          },
          {
            "alias": "image_rights",
            "args": null,
            "kind": "ScalarField",
            "name": "imageRights",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "canRequestLotConditionsReport",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "signatureInfo",
            "plural": false,
            "selections": (v25/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v25/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v25/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "diameterCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedHeight",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedWidth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedDepth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedDiameter",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedMetric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFramed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingWeight",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingWeightMetric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "widthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artsyShippingDomestic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artsyShippingInternational",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "internationalShippingFee",
            "plural": false,
            "selections": (v20/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEligibleForArtsyGuarantee",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "c8e8dc440a11ad2db2ceb92602dabe34",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.href": (v26/*: any*/),
        "artwork.artists.id": (v27/*: any*/),
        "artwork.artists.internalID": (v27/*: any*/),
        "artwork.artists.name": (v26/*: any*/),
        "artwork.artists.slug": (v27/*: any*/),
        "artwork.artsyShippingDomestic": (v28/*: any*/),
        "artwork.artsyShippingInternational": (v28/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v27/*: any*/),
        "artwork.attributionClass.internalID": (v27/*: any*/),
        "artwork.attributionClass.name": (v26/*: any*/),
        "artwork.attributionClass.shortArrayDescription": (v29/*: any*/),
        "artwork.canRequestLotConditionsReport": (v28/*: any*/),
        "artwork.category": (v26/*: any*/),
        "artwork.certificateOfAuthenticity": (v30/*: any*/),
        "artwork.certificateOfAuthenticity.details": (v26/*: any*/),
        "artwork.certificateOfAuthenticity.label": (v26/*: any*/),
        "artwork.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "artwork.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "artwork.collectorSignals.auction.bidCount": (v31/*: any*/),
        "artwork.collectorSignals.auction.lotWatcherCount": (v31/*: any*/),
        "artwork.collectorSignals.curatorsPick": (v28/*: any*/),
        "artwork.collectorSignals.increasedInterest": (v32/*: any*/),
        "artwork.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "artwork.collectorSignals.partnerOffer.endAt": (v26/*: any*/),
        "artwork.collectorSignals.partnerOffer.id": (v27/*: any*/),
        "artwork.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "artwork.collectorSignals.runningShow": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "artwork.collectorSignals.runningShow.endAt": (v26/*: any*/),
        "artwork.collectorSignals.runningShow.href": (v26/*: any*/),
        "artwork.collectorSignals.runningShow.id": (v27/*: any*/),
        "artwork.collectorSignals.runningShow.name": (v26/*: any*/),
        "artwork.collectorSignals.runningShow.startAt": (v26/*: any*/),
        "artwork.conditionDescription": (v30/*: any*/),
        "artwork.conditionDescription.details": (v26/*: any*/),
        "artwork.conditionDescription.label": (v26/*: any*/),
        "artwork.culturalMaker": (v26/*: any*/),
        "artwork.date": (v26/*: any*/),
        "artwork.depthCm": (v33/*: any*/),
        "artwork.diameterCm": (v33/*: any*/),
        "artwork.dimensions": (v34/*: any*/),
        "artwork.dimensions.cm": (v26/*: any*/),
        "artwork.dimensions.in": (v26/*: any*/),
        "artwork.editionOf": (v26/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.__isSellable": (v35/*: any*/),
        "artwork.editionSets.dimensions": (v34/*: any*/),
        "artwork.editionSets.dimensions.cm": (v26/*: any*/),
        "artwork.editionSets.dimensions.in": (v26/*: any*/),
        "artwork.editionSets.editionOf": (v26/*: any*/),
        "artwork.editionSets.id": (v27/*: any*/),
        "artwork.editionSets.internalID": (v27/*: any*/),
        "artwork.editionSets.isAcquireable": (v28/*: any*/),
        "artwork.editionSets.isOfferable": (v28/*: any*/),
        "artwork.editionSets.saleMessage": (v26/*: any*/),
        "artwork.framed": (v30/*: any*/),
        "artwork.framed.details": (v26/*: any*/),
        "artwork.framed.label": (v26/*: any*/),
        "artwork.framedDepth": (v26/*: any*/),
        "artwork.framedDiameter": (v26/*: any*/),
        "artwork.framedHeight": (v26/*: any*/),
        "artwork.framedMetric": (v26/*: any*/),
        "artwork.framedWidth": (v26/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v28/*: any*/),
        "artwork.heightCm": (v33/*: any*/),
        "artwork.id": (v27/*: any*/),
        "artwork.image_rights": (v26/*: any*/),
        "artwork.internalID": (v27/*: any*/),
        "artwork.internationalShippingFee": (v36/*: any*/),
        "artwork.internationalShippingFee.major": (v37/*: any*/),
        "artwork.isAcquireable": (v28/*: any*/),
        "artwork.isBiddable": (v28/*: any*/),
        "artwork.isEdition": (v28/*: any*/),
        "artwork.isEligibleForArtsyGuarantee": (v32/*: any*/),
        "artwork.isEligibleToCreateAlert": (v32/*: any*/),
        "artwork.isFramed": (v28/*: any*/),
        "artwork.isInAuction": (v28/*: any*/),
        "artwork.isInquireable": (v28/*: any*/),
        "artwork.isOfferable": (v28/*: any*/),
        "artwork.isSold": (v28/*: any*/),
        "artwork.isUnlisted": (v32/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v35/*: any*/),
        "artwork.listPrice.display": (v26/*: any*/),
        "artwork.listPrice.major": (v37/*: any*/),
        "artwork.listPrice.maxPrice": (v36/*: any*/),
        "artwork.listPrice.maxPrice.major": (v37/*: any*/),
        "artwork.listPrice.minPrice": (v36/*: any*/),
        "artwork.listPrice.minPrice.major": (v37/*: any*/),
        "artwork.manufacturer": (v26/*: any*/),
        "artwork.medium": (v26/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.__typename": (v35/*: any*/),
        "artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.mediumType.filterGene.id": (v27/*: any*/),
        "artwork.mediumType.filterGene.slug": (v27/*: any*/),
        "artwork.mediumType.longDescription": (v26/*: any*/),
        "artwork.mediumType.name": (v26/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.active_bid": (v38/*: any*/),
        "artwork.myLotStanding.active_bid.id": (v27/*: any*/),
        "artwork.myLotStanding.active_bid.is_winning": (v28/*: any*/),
        "artwork.myLotStanding.most_recent_bid": (v38/*: any*/),
        "artwork.myLotStanding.most_recent_bid.id": (v27/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.cents": (v33/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid.display": (v26/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.cities": (v29/*: any*/),
        "artwork.partner.href": (v26/*: any*/),
        "artwork.partner.id": (v27/*: any*/),
        "artwork.partner.internalID": (v27/*: any*/),
        "artwork.partner.isInquireable": (v32/*: any*/),
        "artwork.partner.name": (v26/*: any*/),
        "artwork.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artwork.partner.profile.icon": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.partner.profile.icon.url": (v26/*: any*/),
        "artwork.partner.profile.id": (v27/*: any*/),
        "artwork.partner.profile.isPubliclyVisible": (v28/*: any*/),
        "artwork.partner.slug": (v27/*: any*/),
        "artwork.pickupAvailable": (v28/*: any*/),
        "artwork.priceCurrency": (v26/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v26/*: any*/),
        "artwork.priceListedDisplay": (v26/*: any*/),
        "artwork.publisher": (v26/*: any*/),
        "artwork.sale": (v39/*: any*/),
        "artwork.sale.cascadingEndTimeIntervalMinutes": (v40/*: any*/),
        "artwork.sale.endAt": (v26/*: any*/),
        "artwork.sale.href": (v26/*: any*/),
        "artwork.sale.id": (v27/*: any*/),
        "artwork.sale.internalID": (v27/*: any*/),
        "artwork.sale.isAuction": (v28/*: any*/),
        "artwork.sale.isClosed": (v28/*: any*/),
        "artwork.sale.isLiveOpenHappened": (v28/*: any*/),
        "artwork.sale.is_closed": (v28/*: any*/),
        "artwork.sale.is_live_open": (v28/*: any*/),
        "artwork.sale.is_open": (v28/*: any*/),
        "artwork.sale.is_preview": (v28/*: any*/),
        "artwork.sale.is_registration_closed": (v28/*: any*/),
        "artwork.sale.is_with_buyers_premium": (v28/*: any*/),
        "artwork.sale.liveStartAt": (v26/*: any*/),
        "artwork.sale.name": (v26/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v27/*: any*/),
        "artwork.sale.registrationStatus.qualified_for_bidding": (v28/*: any*/),
        "artwork.sale.requireIdentityVerification": (v28/*: any*/),
        "artwork.sale.slug": (v27/*: any*/),
        "artwork.sale.startAt": (v26/*: any*/),
        "artwork.saleArtwork": (v41/*: any*/),
        "artwork.saleArtwork.currentBid": (v42/*: any*/),
        "artwork.saleArtwork.currentBid.display": (v26/*: any*/),
        "artwork.saleArtwork.endAt": (v26/*: any*/),
        "artwork.saleArtwork.endedAt": (v26/*: any*/),
        "artwork.saleArtwork.estimate": (v26/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v26/*: any*/),
        "artwork.saleArtwork.formattedStartDateTime": (v26/*: any*/),
        "artwork.saleArtwork.id": (v27/*: any*/),
        "artwork.saleArtwork.lotID": (v26/*: any*/),
        "artwork.saleArtwork.lotLabel": (v26/*: any*/),
        "artwork.saleArtwork.sale": (v39/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingIntervalMinutes": (v40/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingPeriodMinutes": (v40/*: any*/),
        "artwork.saleArtwork.sale.id": (v27/*: any*/),
        "artwork.saleArtwork.sale.internalID": (v27/*: any*/),
        "artwork.saleArtwork.sale.startAt": (v26/*: any*/),
        "artwork.saleMessage": (v26/*: any*/),
        "artwork.sale_artwork": (v41/*: any*/),
        "artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.sale_artwork.current_bid": (v42/*: any*/),
        "artwork.sale_artwork.current_bid.display": (v26/*: any*/),
        "artwork.sale_artwork.endedAt": (v26/*: any*/),
        "artwork.sale_artwork.id": (v27/*: any*/),
        "artwork.sale_artwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.sale_artwork.increments.cents": (v33/*: any*/),
        "artwork.sale_artwork.increments.display": (v26/*: any*/),
        "artwork.sale_artwork.is_with_reserve": (v28/*: any*/),
        "artwork.sale_artwork.reserve_message": (v26/*: any*/),
        "artwork.sale_artwork.reserve_status": (v26/*: any*/),
        "artwork.series": (v26/*: any*/),
        "artwork.shippingInfo": (v26/*: any*/),
        "artwork.shippingOrigin": (v26/*: any*/),
        "artwork.shippingWeight": (v33/*: any*/),
        "artwork.shippingWeightMetric": (v26/*: any*/),
        "artwork.signatureInfo": (v30/*: any*/),
        "artwork.signatureInfo.details": (v26/*: any*/),
        "artwork.signatureInfo.label": (v26/*: any*/),
        "artwork.slug": (v27/*: any*/),
        "artwork.taxInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "TaxInfo"
        },
        "artwork.taxInfo.displayText": (v35/*: any*/),
        "artwork.taxInfo.moreInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "TaxMoreInfo"
        },
        "artwork.taxInfo.moreInfo.displayText": (v35/*: any*/),
        "artwork.taxInfo.moreInfo.url": (v35/*: any*/),
        "artwork.title": (v26/*: any*/),
        "artwork.widthCm": (v33/*: any*/)
      }
    },
    "name": "ArtworkSidebar_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar_artwork\n    id\n  }\n}\n\nfragment ArtsyShippingEstimate_artwork on Artwork {\n  depthCm\n  diameterCm\n  framedHeight\n  framedWidth\n  framedDepth\n  framedDiameter\n  framedMetric\n  heightCm\n  isFramed\n  listPrice {\n    __typename\n    ... on Money {\n      major\n    }\n    ... on PriceRange {\n      maxPrice {\n        major\n      }\n      minPrice {\n        major\n      }\n    }\n  }\n  mediumType {\n    name\n  }\n  priceCurrency\n  shippingOrigin\n  shippingWeight\n  shippingWeightMetric\n  widthCm\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  culturalMaker\n  artists(shallow: true) {\n    id\n    slug\n    name\n    href\n  }\n}\n\nfragment ArtworkSidebarArtsyGuarantee_artwork on Artwork {\n  isUnlisted\n}\n\nfragment ArtworkSidebarArtworkTitle_artwork on Artwork {\n  date\n  title\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {\n  internalID\n  sale {\n    isClosed\n    id\n  }\n  saleArtwork {\n    currentBid {\n      display\n    }\n    id\n  }\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeIntervalMinutes\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarAuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  isBiddable\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n  collectorSignals {\n    auction {\n      bidCount\n      lotWatcherCount\n    }\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  isEligibleToCreateAlert\n  artists(shallow: true) {\n    internalID\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCollectorSignal_artwork on Artwork {\n  collectorSignals {\n    primaryLabel(ignore: [PARTNER_OFFER])\n    runningShow {\n      name\n      href\n      startAt\n      endAt\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarCommercialButtons_artwork on Artwork {\n  ...ArtworkSidebarEditionSets_artwork\n  isEligibleToCreateAlert\n  artists(shallow: true) {\n    internalID\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  internalID\n  slug\n  saleMessage\n  isInquireable\n  isAcquireable\n  isOfferable\n  isSold\n  priceListedDisplay\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  mediumType {\n    filterGene {\n      slug\n      id\n    }\n  }\n  editionSets {\n    id\n    internalID\n    isAcquireable\n    isOfferable\n    saleMessage\n    dimensions {\n      in\n      cm\n    }\n  }\n  partner {\n    profile {\n      icon {\n        url(version: \"square140\")\n      }\n      id\n    }\n    id\n  }\n  collectorSignals {\n    partnerOffer {\n      endAt\n      id\n    }\n    increasedInterest\n    curatorsPick\n  }\n}\n\nfragment ArtworkSidebarCreateAlert_artwork on Artwork {\n  isEligibleToCreateAlert\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    isLiveOpenHappened\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n}\n\nfragment ArtworkSidebarDetails_artwork on Artwork {\n  isUnlisted\n  medium\n  dimensions {\n    in\n    cm\n  }\n  framed {\n    details\n  }\n  editionOf\n  isEdition\n  editionSets {\n    internalID\n    id\n  }\n  ...ArtworkSidebarClassification_artwork\n  ...ArtworkSidebarAuthenticityCertificate_artwork\n  ...ArtworkSidebarCollectorSignal_artwork\n}\n\nfragment ArtworkSidebarEditionSets_artwork on Artwork {\n  isInquireable\n  isOfferable\n  isAcquireable\n  editionSets {\n    id\n    internalID\n    isOfferable\n    isAcquireable\n    saleMessage\n    dimensions {\n      cm\n      in\n    }\n    ...ArtworkSidebarSizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebarEstimatedValue_artwork on Artwork {\n  saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarLinks_artwork on Artwork {\n  isInAuction\n  isUnlisted\n  sale {\n    isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  isUnlisted\n  partner {\n    name\n    href\n    cities\n    isInquireable\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n  collectorSignals {\n    partnerOffer {\n      endAt\n      id\n    }\n    increasedInterest\n    curatorsPick\n  }\n}\n\nfragment ArtworkSidebarPrivateArtwork_artwork on Artwork {\n  partner {\n    name\n    slug\n    profile {\n      isPubliclyVisible\n      id\n    }\n    id\n  }\n  isUnlisted\n}\n\nfragment ArtworkSidebarShippingInformation_artwork on Artwork {\n  isUnlisted\n  priceIncludesTaxDisplay\n  shippingOrigin\n  shippingInfo\n  pickupAvailable\n  taxInfo {\n    displayText\n    moreInfo {\n      displayText\n      url\n    }\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  editionOf\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  ...ArtworkSidebarArtworkTitle_artwork\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarDetails_artwork\n  ...ArtworkSidebarCommercialButtons_artwork\n  ...ArtworkSidebarShippingInformation_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarCreateAlert_artwork\n  ...ArtworkSidebarLinks_artwork\n  ...ArtworkSidebarEstimatedValue_artwork\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  ...ArtworkSidebarAuctionTimer_artwork\n  ...ArtworkSidebarAuctionInfoPolling_artwork\n  ...ArtworkSidebarPrivateArtwork_artwork\n  ...ArtworkSidebarArtsyGuarantee_artwork\n  ...PrivateArtworkAdditionalInfo_artwork\n  ...ArtsyShippingEstimate_artwork\n  artists(shallow: true) {\n    internalID\n    id\n  }\n  artsyShippingDomestic\n  artsyShippingInternational\n  editionSets {\n    internalID\n    id\n  }\n  internationalShippingFee {\n    major\n  }\n  isAcquireable\n  isBiddable\n  isEdition\n  isEligibleForArtsyGuarantee\n  isEligibleToCreateAlert\n  isInAuction\n  isOfferable\n  isSold\n  isUnlisted\n  partner {\n    internalID\n    id\n  }\n  sale {\n    endAt\n    startAt\n    isClosed\n    isAuction\n    id\n  }\n  saleArtwork {\n    lotID\n    lotLabel\n    extendedBiddingEndAt\n    endAt\n    endedAt\n    id\n  }\n  saleMessage\n  shippingWeight\n  shippingWeightMetric\n  slug\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  extendedBiddingEndAt\n  lotID\n  sale {\n    startAt\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    internalID\n    id\n  }\n}\n\nfragment PrivateArtworkAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  image_rights: imageRights\n  canRequestLotConditionsReport\n  internalID\n  isUnlisted\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  dimensions {\n    in\n    cm\n  }\n  attributionClass {\n    name\n    id\n  }\n  medium\n  ...ArtworkDetailsMediumModal_artwork\n}\n"
  }
};
})();

(node as any).hash = "8d062c794738c7fd0b326a3d1f731d25";

export default node;
