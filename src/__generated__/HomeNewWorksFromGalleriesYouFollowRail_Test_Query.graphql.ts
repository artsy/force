/**
 * @generated SignedSource<<d29c864fd87273601b029ce85f9ba359>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksFromGalleriesYouFollowRail_Test_Query$variables = Record<PropertyKey, never>;
export type HomeNewWorksFromGalleriesYouFollowRail_Test_Query$data = {
  readonly me: {
    readonly newWorksFromGalleriesYouFollowConnection: {
      readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection">;
    } | null | undefined;
  } | null | undefined;
};
export type HomeNewWorksFromGalleriesYouFollowRail_Test_Query = {
  response: HomeNewWorksFromGalleriesYouFollowRail_Test_Query$data;
  variables: HomeNewWorksFromGalleriesYouFollowRail_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
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
  "type": "Int"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v15 = {
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
    "name": "HomeNewWorksFromGalleriesYouFollowRail_Test_Query",
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
            "args": (v0/*: any*/),
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
            "storageKey": "newWorksFromGalleriesYouFollowConnection(first:20)"
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
    "name": "HomeNewWorksFromGalleriesYouFollowRail_Test_Query",
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
            "args": (v0/*: any*/),
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isUnlisted",
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
                        "args": (v5/*: any*/),
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
                        "args": (v5/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v6/*: any*/)
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
                        "args": (v5/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v4/*: any*/),
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
                          (v7/*: any*/),
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
                          (v7/*: any*/),
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
              }
            ],
            "storageKey": "newWorksFromGalleriesYouFollowConnection(first:20)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "839819b7047d37243c93e982c007cf3e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v9/*: any*/),
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
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.targetSupply.isP1": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artistNames": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.href": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.name": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass.name": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collecting_institution": (v11/*: any*/),
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
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.bidCount": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.lotClosesAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.lotWatcherCount": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.endAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v11/*: any*/),
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
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.cultural_maker": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.date": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.href": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.height": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.src": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.width": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.internalID": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isUnlisted": (v13/*: any*/),
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
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene.name": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.href": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.name": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.endAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.isOpen": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.is_auction": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.is_closed": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.startAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.saleArtwork": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.saleArtwork.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.saleArtwork.lotID": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork": (v15/*: any*/),
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
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.endAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.formattedEndDateTime": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.highest_bid.display": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.id": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.lotID": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.lotLabel": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.opening_bid.display": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_message": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.slug": (v9/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.title": (v11/*: any*/)
      }
    },
    "name": "HomeNewWorksFromGalleriesYouFollowRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeNewWorksFromGalleriesYouFollowRail_Test_Query {\n  me {\n    newWorksFromGalleriesYouFollowConnection(first: 20) {\n      ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection\n    }\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection on ArtworkConnection {\n  edges {\n    node {\n      internalID\n      slug\n      collectorSignals {\n        primaryLabel\n        auction {\n          bidCount\n          lotWatcherCount\n        }\n      }\n      ...ShelfArtwork_artwork\n      id\n    }\n  }\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "516279f7e842fda5bf1fd1ccb4920c04";

export default node;
