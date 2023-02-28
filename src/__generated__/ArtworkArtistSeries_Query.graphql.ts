/**
 * @generated SignedSource<<e29b1f750c3745919d9a8b31f6d5f847>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkArtistSeries_Query$variables = {};
export type ArtworkArtistSeries_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkArtistSeries_artwork">;
  } | null;
};
export type ArtworkArtistSeries_Query = {
  response: ArtworkArtistSeries_Query$data;
  variables: ArtworkArtistSeries_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
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
  "name": "slug",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
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
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = [
  (v8/*: any*/),
  (v6/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistSeriesConnection"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtistSeriesEdge"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistSeries"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkArtistSeries_Query",
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
            "name": "ArtworkArtistSeries_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkArtistSeries_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistSeriesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeries",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v1/*: any*/),
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
                            "value": "-decayed_merch"
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
                                  (v1/*: any*/),
                                  (v4/*: any*/),
                                  (v5/*: any*/),
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
                                    "args": null,
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
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": null
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
                                    "args": (v7/*: any*/),
                                    "concreteType": "Artist",
                                    "kind": "LinkedField",
                                    "name": "artists",
                                    "plural": true,
                                    "selections": [
                                      (v6/*: any*/),
                                      (v4/*: any*/),
                                      (v8/*: any*/)
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
                                    "args": (v7/*: any*/),
                                    "concreteType": "Partner",
                                    "kind": "LinkedField",
                                    "name": "partner",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      (v4/*: any*/),
                                      (v6/*: any*/)
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
                                      (v9/*: any*/),
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
                                      (v6/*: any*/)
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
                                      (v9/*: any*/),
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
                                        "selections": (v10/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "opening_bid",
                                        "args": null,
                                        "concreteType": "SaleArtworkOpeningBid",
                                        "kind": "LinkedField",
                                        "name": "openingBid",
                                        "plural": false,
                                        "selections": (v10/*: any*/),
                                        "storageKey": null
                                      },
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/),
                                  {
                                    "alias": "is_saved",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isSaved",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "AttributionClass",
                                    "kind": "LinkedField",
                                    "name": "attributionClass",
                                    "plural": false,
                                    "selections": (v11/*: any*/),
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
                                        "selections": (v11/*: any*/),
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
                                      (v12/*: any*/),
                                      (v13/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": "filterArtworksConnection(first:20,sort:\"-decayed_merch\")"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistSeriesConnection(first:1)"
          },
          {
            "alias": "seriesArtist",
            "args": (v7/*: any*/),
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
                    "name": "first",
                    "value": 50
                  }
                ],
                "concreteType": "ArtistSeriesConnection",
                "kind": "LinkedField",
                "name": "artistSeriesConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeriesEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistSeries",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v5/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "featured",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworksCountMessage",
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
                                    "name": "height",
                                    "value": 244
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 325
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  (v13/*: any*/),
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
                                "storageKey": "cropped(height:244,width:325)"
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
                "storageKey": "artistSeriesConnection(first:50)"
              },
              (v6/*: any*/)
            ],
            "storageKey": "artist(shallow:true)"
          },
          {
            "alias": "seriesForCounts",
            "args": (v3/*: any*/),
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistSeriesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeries",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artworksCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistSeriesConnection(first:1)"
          },
          (v6/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "5057009fd13f0e29c9e0010a2f71c761",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v14/*: any*/),
        "artwork.artistSeriesConnection": (v15/*: any*/),
        "artwork.artistSeriesConnection.edges": (v16/*: any*/),
        "artwork.artistSeriesConnection.edges.node": (v17/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node": (v14/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artist": (v18/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artist.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artist.targetSupply.isP1": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artistNames": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists.href": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists.name": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.attributionClass.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.attributionClass.name": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.collecting_institution": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.cultural_maker": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.date": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.href": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image": (v22/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.height": (v23/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.src": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.width": (v23/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.internalID": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.is_saved": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.mediumType.filterGene.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.mediumType.filterGene.name": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.href": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.name": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v23/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.endAt": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v23/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_auction": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_closed": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.startAt": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.endAt": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.lotID": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.lotLabel": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_message": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.slug": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.title": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.id": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.internalID": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.slug": (v24/*: any*/),
        "artwork.id": (v19/*: any*/),
        "artwork.internalID": (v19/*: any*/),
        "artwork.seriesArtist": (v18/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection": (v15/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges": (v16/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node": (v17/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.artworksCountMessage": (v21/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.featured": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image": (v22/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.height": (v25/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.src": (v24/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.srcSet": (v24/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.width": (v25/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.internalID": (v19/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.slug": (v24/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.title": (v24/*: any*/),
        "artwork.seriesArtist.id": (v19/*: any*/),
        "artwork.seriesForCounts": (v15/*: any*/),
        "artwork.seriesForCounts.edges": (v16/*: any*/),
        "artwork.seriesForCounts.edges.node": (v17/*: any*/),
        "artwork.seriesForCounts.edges.node.artworksCount": (v25/*: any*/),
        "artwork.slug": (v19/*: any*/)
      }
    },
    "name": "ArtworkArtistSeries_Query",
    "operationKind": "query",
    "text": "query ArtworkArtistSeries_Query {\n  artwork(id: \"example\") {\n    ...ArtworkArtistSeries_artwork\n    id\n  }\n}\n\nfragment ArtistSeriesArtworkRail_artwork on Artwork {\n  internalID\n  slug\n  artistSeriesConnection(first: 1) {\n    edges {\n      node {\n        slug\n        internalID\n        filterArtworksConnection(sort: \"-decayed_merch\", first: 20) {\n          edges {\n            node {\n              slug\n              internalID\n              ...ShelfArtwork_artwork\n              id\n            }\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistSeriesItem_artistSeries on ArtistSeries {\n  title\n  slug\n  featured\n  internalID\n  artworksCountMessage\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistSeriesRail_artist on Artist {\n  artistSeriesConnection(first: 50) {\n    edges {\n      node {\n        internalID\n        ...ArtistSeriesItem_artistSeries\n      }\n    }\n  }\n}\n\nfragment ArtworkArtistSeries_artwork on Artwork {\n  ...ArtistSeriesArtworkRail_artwork\n  internalID\n  slug\n  seriesArtist: artist(shallow: true) {\n    artistSeriesConnection(first: 50) {\n      edges {\n        node {\n          internalID\n        }\n      }\n    }\n    ...ArtistSeriesRail_artist\n    id\n  }\n  seriesForCounts: artistSeriesConnection(first: 1) {\n    edges {\n      node {\n        artworksCount\n      }\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToCollectionsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment SaveArtworkToCollectionsButton_artwork on Artwork {\n  id\n  internalID\n  is_saved: isSaved\n  slug\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "0baf6c1d6cace923944b236c96b1253f";

export default node;
