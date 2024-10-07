/**
 * @generated SignedSource<<e975624e51f085bf4e9e6f9ea16e23ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewWorksFromGalleriesYouFollowApp_test_Query$variables = {
  first?: number | null | undefined;
};
export type NewWorksFromGalleriesYouFollowApp_test_Query$data = {
  readonly me: {
    readonly newWorksFromGalleriesYouFollowConnection: {
      readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection">;
    } | null | undefined;
  } | null | undefined;
};
export type NewWorksFromGalleriesYouFollowApp_test_Query = {
  response: NewWorksFromGalleriesYouFollowApp_test_Query$data;
  variables: NewWorksFromGalleriesYouFollowApp_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v4/*: any*/)
],
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewWorksFromGalleriesYouFollowApp_test_Query",
    "selections": [
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
            "args": (v1/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "newWorksFromGalleriesYouFollowConnection",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewWorksFromGalleriesYouFollowApp_test_Query",
    "selections": [
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
            "args": (v1/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "newWorksFromGalleriesYouFollowConnection",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
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
                                "name": "lotWatcherCount",
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
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "priceWithDiscount",
                                "plural": false,
                                "selections": (v3/*: any*/),
                                "storageKey": null
                              },
                              (v4/*: any*/)
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
                        "name": "isUnlisted",
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
                        "args": (v6/*: any*/),
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
                          (v4/*: any*/)
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
                        "args": (v6/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/)
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
                        "args": (v6/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v5/*: any*/),
                          (v4/*: any*/)
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
                          (v2/*: any*/),
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
                          (v4/*: any*/)
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v2/*: any*/),
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
                            "selections": (v3/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v3/*: any*/),
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
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
                          (v8/*: any*/),
                          (v4/*: any*/)
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
                        "selections": (v9/*: any*/),
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
                            "selections": (v9/*: any*/),
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5614f40d2ac662ee7c35efb099f1deb6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.targetSupply.isP1": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artistNames": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.href": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collecting_institution": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.bidCount": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.lotClosesAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.lotWatcherCount": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.endAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.cultural_maker": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.date": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.href": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.blurhashDataURL": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.height": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.src": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.width": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.internalID": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isUnlisted": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.href": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.endAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.is_auction": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.is_closed": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.startAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.saleArtwork": (v16/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.saleArtwork.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.saleArtwork.lotID": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork": (v16/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.endAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.formattedEndDateTime": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.lotID": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.lotLabel": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_message": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.slug": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.title": (v12/*: any*/)
      }
    },
    "name": "NewWorksFromGalleriesYouFollowApp_test_Query",
    "operationKind": "query",
    "text": "query NewWorksFromGalleriesYouFollowApp_test_Query(\n  $first: Int\n) {\n  me {\n    newWorksFromGalleriesYouFollowConnection(first: $first) {\n      ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection\n    }\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection on ArtworkConnection {\n  edges {\n    node {\n      internalID\n      slug\n      collectorSignals {\n        primaryLabel\n        auction {\n          bidCount\n          lotWatcherCount\n        }\n      }\n      ...ShelfArtwork_artwork\n      id\n    }\n  }\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  collectorSignals {\n    primaryLabel\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n"
  }
};
})();

(node as any).hash = "46563339635a2165db01c357f3f336de";

export default node;
