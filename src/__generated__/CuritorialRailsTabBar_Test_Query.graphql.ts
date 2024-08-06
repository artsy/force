/**
 * @generated SignedSource<<e094a5de79fd6ba73d39eb2954f62749>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CuritorialRailsTabBar_Test_Query$variables = Record<PropertyKey, never>;
export type CuritorialRailsTabBar_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"CuritorialRailsTabBar_viewer">;
  } | null | undefined;
};
export type CuritorialRailsTabBar_Test_Query = {
  response: CuritorialRailsTabBar_Test_Query$data;
  variables: CuritorialRailsTabBar_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
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
  "name": "endAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cascadingEndTimeIntervalMinutes",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v7 = {
  "alias": "is_auction",
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v8 = {
  "alias": "is_closed",
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUnlisted",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v13 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v14 = {
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
      "concreteType": "PartnerOfferToCollector",
      "kind": "LinkedField",
      "name": "partnerOffer",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isActive",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "priceWithDiscount",
          "plural": false,
          "selections": (v13/*: any*/),
          "storageKey": null
        },
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v16 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v17 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v18 = {
  "alias": null,
  "args": (v17/*: any*/),
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
    (v2/*: any*/)
  ],
  "storageKey": "artist(shallow:true)"
},
v19 = {
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
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": (v17/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v10/*: any*/),
    (v20/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v22 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": (v17/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v20/*: any*/),
    (v10/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v24 = {
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
      "kind": "ScalarField",
      "name": "lotID",
      "storageKey": null
    },
    {
      "alias": null,
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
      "selections": (v13/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v13/*: any*/),
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v27 = {
  "alias": "preview",
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
          "value": "square"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"square\")"
    }
  ],
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInAuction",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSavedToList",
  "storageKey": null
},
v30 = [
  (v20/*: any*/),
  (v2/*: any*/)
],
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v30/*: any*/),
  "storageKey": null
},
v32 = {
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
      "selections": (v30/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v33 = {
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
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v36 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v37 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ArtistTargetSupply"
},
v38 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CollectorSignals"
},
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerOfferToCollector"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v47 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkPriceInsights"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Gene"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CuritorialRailsTabBar_Test_Query",
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
            "name": "CuritorialRailsTabBar_viewer"
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
    "name": "CuritorialRailsTabBar_Test_Query",
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
            "alias": "trendingLotsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "biddableSale",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "estimateRange",
                "value": "5_000_00-*"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-bidder_positions_count"
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "kind": "LinkedField",
            "name": "saleArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtwork",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
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
                        "alias": null,
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
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v2/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v29/*: any*/),
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtworksConnection(biddableSale:true,estimateRange:\"5_000_00-*\",first:10,sort:\"-bidder_positions_count\")"
          },
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
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v24/*: any*/),
                      (v2/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v29/*: any*/),
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "artworksConnection(first:50,forSale:true,geneIDs:[\"our-top-auction-lots\"])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1a337bb325e113904d8d6a8d62f92af0",
    "id": null,
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
        "viewer.standoutLotsRailConnection.edges.node": (v34/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artist": (v35/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artist.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artist.targetSupply": (v37/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artist.targetSupply.isP1": (v38/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artistNames": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists": (v40/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists.href": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.artists.name": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.attributionClass": (v41/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.attributionClass.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.attributionClass.name": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collecting_institution": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals": (v42/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.bidCount": (v43/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.lotWatcherCount": (v43/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer": (v44/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.endAt": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.isActive": (v38/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v45/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.cultural_maker": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.date": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.href": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image": (v46/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.blurhashDataURL": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.height": (v43/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.src": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.image.width": (v43/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.internalID": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.isInAuction": (v38/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.isSaved": (v38/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.isSavedToList": (v47/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.isUnlisted": (v47/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.marketPriceInsights": (v48/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.marketPriceInsights.demandRank": (v49/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.mediumType": (v50/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.mediumType.filterGene": (v51/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.mediumType.filterGene.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.mediumType.filterGene.name": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner": (v52/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner.href": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.partner.name": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.preview": (v46/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.preview.url": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale": (v53/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v43/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.endAt": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v43/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.is_auction": (v38/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.is_closed": (v38/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale.startAt": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork": (v54/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.counts": (v55/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.counts.bidder_positions": (v56/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.endAt": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.formattedEndDateTime": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.highest_bid": (v57/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.highest_bid.display": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.id": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.lotID": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.lotLabel": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.opening_bid": (v58/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_artwork.opening_bid.display": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.sale_message": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.slug": (v36/*: any*/),
        "viewer.standoutLotsRailConnection.edges.node.title": (v39/*: any*/),
        "viewer.standoutLotsRailConnection.id": (v36/*: any*/),
        "viewer.trendingLotsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworksConnection"
        },
        "viewer.trendingLotsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleArtwork"
        },
        "viewer.trendingLotsConnection.edges.counts": (v55/*: any*/),
        "viewer.trendingLotsConnection.edges.counts.bidderPositions": (v56/*: any*/),
        "viewer.trendingLotsConnection.edges.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node": (v34/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artist": (v35/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artist.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artist.targetSupply": (v37/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artist.targetSupply.isP1": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artistNames": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists": (v40/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.href": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.artists.name": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass": (v41/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.attributionClass.name": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collecting_institution": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals": (v42/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.bidCount": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.lotWatcherCount": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.partnerOffer": (v44/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.partnerOffer.endAt": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.partnerOffer.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.partnerOffer.isActive": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v45/*: any*/),
        "viewer.trendingLotsConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.cultural_maker": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.date": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.href": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image": (v46/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.blurhashDataURL": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.height": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.src": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.image.width": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.internalID": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.isInAuction": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.isSaved": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.isSavedToList": (v47/*: any*/),
        "viewer.trendingLotsConnection.edges.node.isUnlisted": (v47/*: any*/),
        "viewer.trendingLotsConnection.edges.node.marketPriceInsights": (v48/*: any*/),
        "viewer.trendingLotsConnection.edges.node.marketPriceInsights.demandRank": (v49/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType": (v50/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType.filterGene": (v51/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType.filterGene.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.mediumType.filterGene.name": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner": (v52/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.href": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.partner.name": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.preview": (v46/*: any*/),
        "viewer.trendingLotsConnection.edges.node.preview.url": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale": (v53/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.endAt": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v43/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.isClosed": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_auction": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.is_closed": (v38/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale.startAt": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork": (v54/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts": (v55/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.counts.bidder_positions": (v56/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.endAt": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.formattedEndDateTime": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid": (v57/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.highest_bid.display": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.id": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotID": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.lotLabel": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid": (v58/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_artwork.opening_bid.display": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.sale_message": (v39/*: any*/),
        "viewer.trendingLotsConnection.edges.node.slug": (v36/*: any*/),
        "viewer.trendingLotsConnection.edges.node.title": (v39/*: any*/)
      }
    },
    "name": "CuritorialRailsTabBar_Test_Query",
    "operationKind": "query",
    "text": "query CuritorialRailsTabBar_Test_Query {\n  viewer {\n    ...CuritorialRailsTabBar_viewer\n  }\n}\n\nfragment CuritorialRailsTabBar_viewer on Viewer {\n  ...TrendingLotsRail_viewer\n  ...StandoutLotsRail_viewer\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    bidCount\n    lotWatcherCount\n    partnerOffer {\n      endAt\n      isActive\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n\nfragment StandoutLotsRail_viewer on Viewer {\n  standoutLotsRailConnection: artworksConnection(forSale: true, first: 50, geneIDs: [\"our-top-auction-lots\"]) {\n    edges {\n      node {\n        internalID\n        slug\n        ...ShelfArtwork_artwork\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment TrendingLotsRail_viewer on Viewer {\n  trendingLotsConnection: saleArtworksConnection(biddableSale: true, first: 10, sort: \"-bidder_positions_count\", estimateRange: \"5_000_00-*\") {\n    edges {\n      counts {\n        bidderPositions\n      }\n      node {\n        internalID\n        slug\n        sale {\n          isClosed\n          id\n        }\n        ...ShelfArtwork_artwork\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e3911a29d16779b82fa60bc6ef3c996b";

export default node;
