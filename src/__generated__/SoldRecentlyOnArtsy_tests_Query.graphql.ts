/**
 * @generated SignedSource<<079da4383becf5519e4810fa90249f71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldRecentlyOnArtsy_tests_Query$variables = Record<PropertyKey, never>;
export type SoldRecentlyOnArtsy_tests_Query$data = {
  readonly recentlySoldArtworks: {
    readonly " $fragmentSpreads": FragmentRefs<"SoldRecentlyOnArtsy_recentlySoldArtworks">;
  } | null | undefined;
};
export type SoldRecentlyOnArtsy_tests_Query = {
  response: SoldRecentlyOnArtsy_tests_Query$data;
  variables: SoldRecentlyOnArtsy_tests_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
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
  "name": "lotID",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minor",
    "storageKey": null
  }
],
v8 = [
  (v5/*: any*/),
  (v3/*: any*/)
],
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Long"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SoldRecentlyOnArtsy_recentlySoldArtworks"
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
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RecentlySoldArtworkTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RecentlySoldArtworkType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
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
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v0/*: any*/),
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
                        "concreteType": "CollectorSignals",
                        "kind": "LinkedField",
                        "name": "collectorSignals",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "primaryLabel",
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
                                "name": "bidCount",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotClosesAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "liveBiddingStarted",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "registrationEndsAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "onlineBiddingExtended",
                                "storageKey": null
                              }
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
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "priceWithDiscount",
                                "plural": false,
                                "selections": (v2/*: any*/),
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
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
                            "kind": "ScalarField",
                            "name": "increasedInterest",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Show",
                            "kind": "LinkedField",
                            "name": "runningShow",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "city",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "sale_message",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
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
                        "args": (v4/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
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
                                "name": "isP1",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": "artist(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkPriceInsights",
                        "kind": "LinkedField",
                        "name": "marketPriceInsights",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "demandRank",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v0/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": "collecting_institution",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "collectingInstitution",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v0/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
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
                            "name": "extendedBiddingIntervalMinutes",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": null
                          },
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOpen",
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
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v1/*: any*/),
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
                            "name": "formattedEndDateTime",
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
                            "alias": "highest_bid",
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "kind": "LinkedField",
                            "name": "highestBid",
                            "plural": false,
                            "selections": (v2/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v2/*: any*/),
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPurchasable",
                        "storageKey": null
                      },
                      {
                        "alias": "countryCode",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "shippingCountry",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "domesticShippingFee",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "euShippingOrigin",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "internationalShippingFee",
                        "plural": false,
                        "selections": (v7/*: any*/),
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
                        "kind": "ScalarField",
                        "name": "pickupAvailable",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "onlyShipsDomestically",
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
                          (v6/*: any*/),
                          (v3/*: any*/)
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
                        "selections": (v8/*: any*/),
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
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
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
                            "alias": "src",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "larger",
                                  "large"
                                ]
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"larger\",\"large\"])"
                          },
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
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "blurhashDataURL",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "lowEstimate",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "highEstimate",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "priceRealized",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
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
    ]
  },
  "params": {
    "cacheID": "9760d73625c602bfe0924caaa95136af",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "recentlySoldArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkTypeConnection"
        },
        "recentlySoldArtworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "RecentlySoldArtworkTypeEdge"
        },
        "recentlySoldArtworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkType"
        },
        "recentlySoldArtworks.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "recentlySoldArtworks.edges.node.artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "recentlySoldArtworks.edges.node.artwork.artist.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "recentlySoldArtworks.edges.node.artwork.artist.targetSupply.isP1": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artistNames": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "recentlySoldArtworks.edges.node.artwork.artists.href": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.name": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artsyShippingDomestic": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artsyShippingInternational": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "recentlySoldArtworks.edges.node.artwork.attributionClass.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.attributionClass.name": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collecting_institution": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.auction.liveBiddingStarted": (v12/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.auction.lotClosesAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.auction.onlineBiddingExtended": (v12/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.auction.registrationEndsAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.curatorsPick": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.increasedInterest": (v12/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.partnerOffer.endAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.partnerOffer.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.partnerOffer.priceWithDiscount": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.partnerOffer.priceWithDiscount.display": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.runningShow": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.runningShow.city": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collectorSignals.runningShow.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.countryCode": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.cultural_maker": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.date": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.domesticShippingFee": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.domesticShippingFee.minor": (v14/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.euShippingOrigin": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.href": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "recentlySoldArtworks.edges.node.artwork.image.blurhashDataURL": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.height": (v15/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.src": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.width": (v15/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.internalID": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.internationalShippingFee": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.internationalShippingFee.minor": (v14/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.isPurchasable": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.isUnlisted": (v12/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "recentlySoldArtworks.edges.node.artwork.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene.name": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.onlyShipsDomestically": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "recentlySoldArtworks.edges.node.artwork.partner.href": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner.name": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.pickupAvailable": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "recentlySoldArtworks.edges.node.artwork.sale.cascadingEndTimeIntervalMinutes": (v15/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.endAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.extendedBiddingIntervalMinutes": (v15/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.isOpen": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_auction": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_closed": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.startAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.saleArtwork": (v16/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.saleArtwork.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.saleArtwork.lotID": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork": (v16/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.endAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.extendedBiddingEndAt": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.formattedEndDateTime": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.highest_bid.display": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.id": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.lotID": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.lotLabel": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.opening_bid.display": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_message": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.slug": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.title": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate.display": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate.display": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized": (v13/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized.display": (v11/*: any*/)
      }
    },
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "operationKind": "query",
    "text": "query SoldRecentlyOnArtsy_tests_Query {\n  recentlySoldArtworks {\n    ...SoldRecentlyOnArtsy_recentlySoldArtworks\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...LegacyPrimaryLabelLine_artwork\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment LegacyPrimaryLabelLine_artwork on Artwork {\n  collectorSignals {\n    primaryLabel\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  ...useFulfillmentOptions_artwork\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n    curatorsPick\n    increasedInterest\n    runningShow {\n      city\n      id\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n\nfragment SoldRecentlyOnArtsy_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {\n  edges {\n    node {\n      artwork {\n        ...ShelfArtwork_artwork\n        slug\n        href\n        internalID\n        id\n      }\n      lowEstimate {\n        display\n      }\n      highEstimate {\n        display\n      }\n      priceRealized {\n        display\n      }\n    }\n  }\n}\n\nfragment useFulfillmentOptions_artwork on Artwork {\n  isPurchasable\n  countryCode: shippingCountry\n  domesticShippingFee {\n    minor\n  }\n  euShippingOrigin\n  internationalShippingFee {\n    minor\n  }\n  artsyShippingDomestic\n  artsyShippingInternational\n  pickupAvailable\n  onlyShipsDomestically\n}\n"
  }
};
})();

(node as any).hash = "442ff54b073be1549339a7f7e4ad3479";

export default node;
