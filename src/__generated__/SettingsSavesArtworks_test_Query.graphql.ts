/**
 * @generated SignedSource<<cd6804fad33ce7e8e20083e041f4fea0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesArtworks_test_Query$variables = {
  page?: number | null;
};
export type SettingsSavesArtworks_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesArtworks_me">;
  } | null;
};
export type SettingsSavesArtworks_test_Query = {
  response: SettingsSavesArtworks_test_Query$data;
  variables: SettingsSavesArtworks_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "page"
  }
],
v1 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "private",
    "value": true
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
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
  (v11/*: any*/),
  (v9/*: any*/)
],
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsSavesArtworks_test_Query",
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
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "SettingsSavesArtworks_me"
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
    "name": "SettingsSavesArtworks_test_Query",
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
            "args": null,
            "concreteType": "FollowsAndSaves",
            "kind": "LinkedField",
            "name": "followsAndSaves",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "SavedArtworksConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursors",
                    "kind": "LinkedField",
                    "name": "pageCursors",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "around",
                        "plural": true,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "first",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "last",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "previous",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SavedArtworksEdge",
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
                          (v7/*: any*/),
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
                            "name": "imageTitle",
                            "storageKey": null
                          },
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
                                "name": "aspectRatio",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "versions",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "image(includeAll:false)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          (v8/*: any*/),
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
                              (v9/*: any*/)
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
                            "args": (v10/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v8/*: any*/),
                              (v11/*: any*/)
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
                            "args": (v10/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v11/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/)
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
                              (v12/*: any*/),
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
                              (v9/*: any*/),
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
                              (v12/*: any*/),
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
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v9/*: any*/),
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
                            "alias": "customCollections",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "default",
                                "value": false
                              },
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 0
                              },
                              {
                                "kind": "Literal",
                                "name": "saves",
                                "value": true
                              }
                            ],
                            "concreteType": "CollectionsConnection",
                            "kind": "LinkedField",
                            "name": "collectionsConnection",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/)
                            ],
                            "storageKey": "collectionsConnection(default:false,first:0,saves:true)"
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
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
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
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "filters": [
                  "private",
                  "page"
                ],
                "handle": "connection",
                "key": "SettingsSavesArtworks_artworksConnection",
                "kind": "LinkedHandle",
                "name": "artworksConnection"
              }
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fe84ebde74ce9501f446378d693eb310",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.followsAndSaves": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowsAndSaves"
        },
        "me.followsAndSaves.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SavedArtworksConnection"
        },
        "me.followsAndSaves.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SavedArtworksEdge"
        },
        "me.followsAndSaves.artworksConnection.edges.cursor": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.followsAndSaves.artworksConnection.edges.node.__typename": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.followsAndSaves.artworksConnection.edges.node.artist.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "me.followsAndSaves.artworksConnection.edges.node.artist.targetSupply.isP1": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artistNames": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.followsAndSaves.artworksConnection.edges.node.artists.href": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists.name": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.followsAndSaves.artworksConnection.edges.node.attributionClass.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.attributionClass.name": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.collecting_institution": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.cultural_maker": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.customCollections": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectionsConnection"
        },
        "me.followsAndSaves.artworksConnection.edges.node.customCollections.totalCount": (v19/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.date": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.href": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image": (v20/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "me.followsAndSaves.artworksConnection.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "me.followsAndSaves.artworksConnection.edges.node.image.placeholder": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image.url": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "me.followsAndSaves.artworksConnection.edges.node.imageTitle": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.internalID": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.isSaved": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.is_biddable": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "me.followsAndSaves.artworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "me.followsAndSaves.artworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "me.followsAndSaves.artworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "me.followsAndSaves.artworksConnection.edges.node.mediumType.filterGene.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.mediumType.filterGene.name": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.followsAndSaves.artworksConnection.edges.node.partner.href": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner.name": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.preview": (v20/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.preview.url": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v19/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.display_timely_at": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.endAt": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v19/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_auction": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_closed": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_preview": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.startAt": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.endAt": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.id": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.lotID": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.lotLabel": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_message": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.slug": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.title": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "me.followsAndSaves.artworksConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "me.followsAndSaves.artworksConnection.pageCursors.around.cursor": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.around.isCurrent": (v21/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.around.page": (v22/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first": (v23/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first.cursor": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first.isCurrent": (v21/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first.page": (v22/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last": (v23/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last.cursor": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last.isCurrent": (v21/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last.page": (v22/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.previous": (v23/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.previous.cursor": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.previous.page": (v22/*: any*/),
        "me.followsAndSaves.artworksConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.followsAndSaves.artworksConnection.pageInfo.endCursor": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.pageInfo.hasNextPage": (v21/*: any*/),
        "me.followsAndSaves.artworksConnection.totalCount": (v19/*: any*/),
        "me.id": (v16/*: any*/)
      }
    },
    "name": "SettingsSavesArtworks_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesArtworks_test_Query(\n  $page: Int\n) {\n  me {\n    ...SettingsSavesArtworks_me_2Pg8Wv\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  customCollections: collectionsConnection(first: 0, default: false, saves: true) {\n    totalCount\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment SettingsSavesArtworks_me_2Pg8Wv on Me {\n  followsAndSaves {\n    artworksConnection(first: 10, private: true, page: $page) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      pageCursors {\n        ...Pagination_pageCursors\n      }\n      edges {\n        node {\n          internalID\n          ...GridItem_artwork\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "129c660fa56e39aff0b953d941d66b38";

export default node;
