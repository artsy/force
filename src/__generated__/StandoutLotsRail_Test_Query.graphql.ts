/**
 * @generated SignedSource<<c2847535b86b78445955356923c7a586>>
 * @relayHash de75b2400b876020793f292009485d9d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID de75b2400b876020793f292009485d9d

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StandoutLotsRail_Test_Query$variables = Record<PropertyKey, never>;
export type StandoutLotsRail_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"StandoutLotsRail_viewer">;
  } | null | undefined;
};
export type StandoutLotsRail_Test_Query = {
  response: StandoutLotsRail_Test_Query$data;
  variables: StandoutLotsRail_Test_Query$variables;
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
  (v5/*: any*/),
  (v3/*: any*/)
],
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v13 = {
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
    "name": "StandoutLotsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StandoutLotsRail_viewer"
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
    "name": "StandoutLotsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "standoutLotsRailConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              },
              {
                "kind": "Literal",
                "name": "forSale",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "geneIDs",
                "value": [
                  "our-top-auction-lots"
                ]
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
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
                        "kind": "ScalarField",
                        "name": "isUnlisted",
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
                        "selections": (v7/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": "artworksConnection(first:50,forSale:true,geneIDs:[\"our-top-auction-lots\"])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "de75b2400b876020793f292009485d9d",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.standoutLotsRailConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "viewer.standoutLotsRailConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "viewer.standoutLotsRailConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.standoutLotsRailConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewer.standoutLotsRailConnection.edges.node.artist.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "viewer.standoutLotsRailConnection.edges.node.artist.targetSupply.isP1": (v9/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artistNames": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewer.standoutLotsRailConnection.edges.node.artists.href": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists.name": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.standoutLotsRailConnection.edges.node.attributionClass.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.attributionClass.name": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collecting_institution": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v11/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.auction.lotClosesAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v11/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.endAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "viewer.standoutLotsRailConnection.edges.node.cultural_maker": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.date": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.href": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.standoutLotsRailConnection.edges.node.image.blurhashDataURL": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.height": (v12/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.src": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.width": (v12/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.internalID": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.isUnlisted": (v11/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "viewer.standoutLotsRailConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "viewer.standoutLotsRailConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "viewer.standoutLotsRailConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "viewer.standoutLotsRailConnection.edges.node.mediumType.filterGene.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.mediumType.filterGene.name": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewer.standoutLotsRailConnection.edges.node.partner.href": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner.name": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewer.standoutLotsRailConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v12/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.endAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v12/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.isOpen": (v9/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.is_auction": (v9/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.is_closed": (v9/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.startAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.saleArtwork": (v13/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.saleArtwork.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.saleArtwork.lotID": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork": (v13/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.endAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.formattedEndDateTime": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.highest_bid.display": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.id": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.lotID": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.lotLabel": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.opening_bid.display": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_message": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.slug": (v8/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.title": (v10/*: any*/),
        "viewer.standoutLotsRailConnection.id": (v8/*: any*/)
      }
    },
    "name": "StandoutLotsRail_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "916caacdf3e41aed40fa3ae389bc1eb3";

export default node;
