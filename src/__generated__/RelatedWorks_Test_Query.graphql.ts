/**
 * @generated SignedSource<<043cbef7fa61643e8843c90956e97699>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RelatedWorks_Test_Query$variables = {
  slug: string;
};
export type RelatedWorks_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"RelatedWorks_artwork">;
  } | null | undefined;
};
export type RelatedWorks_Test_Query = {
  response: RelatedWorks_Test_Query$data;
  variables: RelatedWorks_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
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
  "name": "title",
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
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
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
v14 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v23 = {
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
    "name": "RelatedWorks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RelatedWorks_artwork"
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
    "name": "RelatedWorks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "main"
              }
            ],
            "concreteType": "ArtworkLayer",
            "kind": "LinkedField",
            "name": "layer",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 8
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
                          (v2/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
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
                              (v6/*: any*/),
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "includeAll",
                                    "value": false
                                  }
                                ],
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "aspectRatio",
                                    "storageKey": null
                                  },
                                  (v7/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "placeholder",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      (v8/*: any*/)
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:[\"larger\",\"large\"])"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "versions",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "blurhashDataURL",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      (v8/*: any*/),
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 445
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
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
                                    "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                                  }
                                ],
                                "storageKey": "image(includeAll:false)"
                              },
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "imageTitle",
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
                                "args": (v9/*: any*/),
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
                                  (v5/*: any*/)
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
                                "args": (v9/*: any*/),
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artists",
                                "plural": true,
                                "selections": [
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v4/*: any*/)
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
                                "args": (v9/*: any*/),
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  (v6/*: any*/),
                                  (v5/*: any*/)
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
                                  (v10/*: any*/),
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
                                  (v5/*: any*/),
                                  {
                                    "alias": "is_preview",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isPreview",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "display_timely_at",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "displayTimelyAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "extendedBiddingPeriodMinutes",
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
                                  (v11/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lotLabel",
                                    "storageKey": null
                                  },
                                  (v10/*: any*/),
                                  (v12/*: any*/),
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
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isSaved",
                                "storageKey": null
                              },
                              {
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isSavedToList",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AttributionClass",
                                "kind": "LinkedField",
                                "name": "attributionClass",
                                "plural": false,
                                "selections": (v14/*: any*/),
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
                                    "selections": (v14/*: any*/),
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
                              {
                                "alias": "is_biddable",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isBiddable",
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
                                  (v10/*: any*/),
                                  (v12/*: any*/),
                                  (v11/*: any*/),
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "image_title",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "imageTitle",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ArtworkConnectionInterface",
                    "abstractKey": "__isArtworkConnectionInterface"
                  }
                ],
                "storageKey": "artworksConnection(first:8)"
              },
              (v5/*: any*/)
            ],
            "storageKey": "layer(id:\"main\")"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "118274e3e35354582ee91a6a5d266b4c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v15/*: any*/),
        "artwork.id": (v16/*: any*/),
        "artwork.layer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkLayer"
        },
        "artwork.layer.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "artwork.layer.artworksConnection.__isArtworkConnectionInterface": (v17/*: any*/),
        "artwork.layer.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "artwork.layer.artworksConnection.edges.__isNode": (v17/*: any*/),
        "artwork.layer.artworksConnection.edges.__typename": (v17/*: any*/),
        "artwork.layer.artworksConnection.edges.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node": (v15/*: any*/),
        "artwork.layer.artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.layer.artworksConnection.edges.node.artist.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artwork.layer.artworksConnection.edges.node.artist.targetSupply.isP1": (v18/*: any*/),
        "artwork.layer.artworksConnection.edges.node.artistNames": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.layer.artworksConnection.edges.node.artists.href": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.artists.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.artists.name": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.layer.artworksConnection.edges.node.attributionClass.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.attributionClass.name": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.collecting_institution": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.cultural_maker": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.date": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.href": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image": (v20/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artwork.layer.artworksConnection.edges.node.image.blurhashDataURL": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "artwork.layer.artworksConnection.edges.node.image.placeholder": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.layer.artworksConnection.edges.node.image.resized.height": (v21/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.resized.src": (v17/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.resized.srcSet": (v17/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.resized.width": (v21/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.url": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.layer.artworksConnection.edges.node.imageTitle": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.image_title": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.internalID": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.isSaved": (v18/*: any*/),
        "artwork.layer.artworksConnection.edges.node.isSavedToList": (v22/*: any*/),
        "artwork.layer.artworksConnection.edges.node.isUnlisted": (v22/*: any*/),
        "artwork.layer.artworksConnection.edges.node.is_biddable": (v18/*: any*/),
        "artwork.layer.artworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.layer.artworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artwork.layer.artworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.layer.artworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.layer.artworksConnection.edges.node.mediumType.filterGene.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.mediumType.filterGene.name": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.layer.artworksConnection.edges.node.partner.href": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.partner.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.partner.name": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.preview": (v20/*: any*/),
        "artwork.layer.artworksConnection.edges.node.preview.url": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.layer.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v21/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.display_timely_at": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.endAt": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v21/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v21/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.is_auction": (v18/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.is_closed": (v18/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.is_preview": (v18/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale.startAt": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.saleArtwork": (v23/*: any*/),
        "artwork.layer.artworksConnection.edges.node.saleArtwork.endAt": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.saleArtwork.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.saleArtwork.lotID": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork": (v23/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.layer.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.layer.artworksConnection.edges.node.sale_artwork.endAt": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artwork.layer.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.id": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.lotID": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.lotLabel": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artwork.layer.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.sale_message": (v19/*: any*/),
        "artwork.layer.artworksConnection.edges.node.slug": (v16/*: any*/),
        "artwork.layer.artworksConnection.edges.node.title": (v19/*: any*/),
        "artwork.layer.id": (v16/*: any*/),
        "artwork.layer.name": (v19/*: any*/),
        "artwork.slug": (v16/*: any*/),
        "artwork.title": (v19/*: any*/)
      }
    },
    "name": "RelatedWorks_Test_Query",
    "operationKind": "query",
    "text": "query RelatedWorks_Test_Query(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    ...RelatedWorks_artwork\n    id\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_3QDGWC\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork_3QDGWC on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment RelatedWorks_artwork on Artwork {\n  slug\n  title\n  layer(id: \"main\") {\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          slug\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "fe79097e9d042dd10922fd52f63dfb54";

export default node;
