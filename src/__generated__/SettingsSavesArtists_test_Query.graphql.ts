/**
 * @generated SignedSource<<45b64c2be4fe0a1107f3a2e58d774bce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesArtists_test_Query$variables = {
  after?: string | null | undefined;
};
export type SettingsSavesArtists_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesArtists_me">;
  } | null | undefined;
};
export type SettingsSavesArtists_test_Query = {
  response: SettingsSavesArtists_test_Query$data;
  variables: SettingsSavesArtists_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "slug",
  "storageKey": null
},
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
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
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
  (v6/*: any*/),
  (v7/*: any*/)
],
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsSavesArtists_test_Query",
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
            "name": "SettingsSavesArtists_me"
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
    "name": "SettingsSavesArtists_test_Query",
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
                "concreteType": "FollowArtistConnection",
                "kind": "LinkedField",
                "name": "artistsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FollowArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowArtist",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artist",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
                              (v6/*: any*/),
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
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "coverArtwork",
                                "plural": false,
                                "selections": [
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
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "first",
                                    "value": 10
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
                                          (v3/*: any*/),
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
                                            "args": (v8/*: any*/),
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
                                              (v7/*: any*/)
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
                                            "args": (v8/*: any*/),
                                            "concreteType": "Artist",
                                            "kind": "LinkedField",
                                            "name": "artists",
                                            "plural": true,
                                            "selections": [
                                              (v7/*: any*/),
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
                                            "args": (v8/*: any*/),
                                            "concreteType": "Partner",
                                            "kind": "LinkedField",
                                            "name": "partner",
                                            "plural": false,
                                            "selections": [
                                              (v6/*: any*/),
                                              (v4/*: any*/),
                                              (v7/*: any*/)
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
                                              (v7/*: any*/)
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
                                              (v7/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v7/*: any*/),
                                          (v5/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isSaved",
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
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "artworksConnection(first:10)"
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
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
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
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
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "SettingsSavesArtists_artistsConnection",
                "kind": "LinkedHandle",
                "name": "artistsConnection"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4462b2942919f3f525daeea5e486cef1",
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
        "me.followsAndSaves.artistsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowArtistConnection"
        },
        "me.followsAndSaves.artistsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FollowArtistEdge"
        },
        "me.followsAndSaves.artistsConnection.edges.cursor": (v12/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowArtist"
        },
        "me.followsAndSaves.artistsConnection.edges.node.__typename": (v12/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist": (v13/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node": (v14/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artist": (v13/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artist.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artist.targetSupply.isP1": (v16/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artistNames": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artists.href": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artists.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.artists.name": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.attributionClass.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.attributionClass.name": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.collecting_institution": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.cultural_maker": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.date": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.href": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.image": (v18/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.image.blurhashDataURL": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.image.height": (v19/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.image.src": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.image.width": (v19/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.internalID": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.isSaved": (v16/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.isSavedToList": (v20/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.isUnlisted": (v20/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.mediumType.filterGene.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.mediumType.filterGene.name": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.partner.href": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.partner.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.partner.name": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.preview": (v18/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.preview.url": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v19/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.endAt": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v19/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.is_auction": (v16/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.is_closed": (v16/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale.startAt": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v21/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.endAt": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.lotID": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.lotLabel": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.sale_message": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.slug": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.artworksConnection.edges.node.title": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.counts.artworks": (v21/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.counts.forSaleArtworks": (v21/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.coverArtwork": (v14/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.coverArtwork.avatar": (v18/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.coverArtwork.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "me.followsAndSaves.artistsConnection.edges.node.artist.coverArtwork.avatar.cropped.src": (v12/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.coverArtwork.avatar.cropped.srcSet": (v12/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.coverArtwork.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.formattedNationalityAndBirthday": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.href": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.initials": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.internalID": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.name": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.artist.slug": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.id": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.edges.node.internalID": (v15/*: any*/),
        "me.followsAndSaves.artistsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.followsAndSaves.artistsConnection.pageInfo.endCursor": (v17/*: any*/),
        "me.followsAndSaves.artistsConnection.pageInfo.hasNextPage": (v20/*: any*/),
        "me.followsAndSaves.artistsConnection.totalCount": (v19/*: any*/),
        "me.id": (v15/*: any*/)
      }
    },
    "name": "SettingsSavesArtists_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesArtists_test_Query(\n  $after: String\n) {\n  me {\n    ...SettingsSavesArtists_me_WGPvJ\n    id\n  }\n}\n\nfragment ArtistRail_artist on Artist {\n  ...EntityHeaderArtist_artist\n  name\n  artworksConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        ...ShelfArtwork_artwork\n        id\n      }\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment SettingsSavesArtists_me_WGPvJ on Me {\n  followsAndSaves {\n    artistsConnection(first: 4, after: $after) {\n      totalCount\n      edges {\n        node {\n          internalID\n          artist {\n            ...ArtistRail_artist\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n"
  }
};
})();

(node as any).hash = "eade452028e09aedf84a0d4c1fc4ab97";

export default node;
