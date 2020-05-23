/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYouFeed_viewer = {
    readonly me: {
        readonly followsAndSaves: {
            readonly notifications: {
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                    readonly endCursor: string | null;
                };
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                        readonly href: string | null;
                        readonly summary: string | null;
                        readonly artists: string | null;
                        readonly published_at: string | null;
                        readonly artworksConnection: {
                            readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
                        } | null;
                        readonly image: {
                            readonly resized: {
                                readonly url: string | null;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "WorksForYouFeed_viewer";
};
export type WorksForYouFeed_viewer$data = WorksForYouFeed_viewer;
export type WorksForYouFeed_viewer$key = {
    readonly " $data"?: WorksForYouFeed_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYouFeed_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "WorksForYouFeed_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "me",
          "followsAndSaves",
          "notifications"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "forSale",
      "type": "Boolean",
      "defaultValue": true
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "me",
      "storageKey": null,
      "args": null,
      "concreteType": "Me",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "followsAndSaves",
          "storageKey": null,
          "args": null,
          "concreteType": "FollowsAndSaves",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": "notifications",
              "name": "__WorksForYou_notifications_connection",
              "storageKey": null,
              "args": [
                {
                  "kind": "Variable",
                  "name": "forSale",
                  "variableName": "forSale"
                },
                {
                  "kind": "Literal",
                  "name": "sort",
                  "value": "PUBLISHED_AT_DESC"
                }
              ],
              "concreteType": "FollowedArtistsArtworksGroupConnection",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "pageInfo",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageInfo",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "hasNextPage",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "endCursor",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "edges",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "FollowedArtistsArtworksGroupEdge",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "node",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "FollowedArtistsArtworksGroup",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "id",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "href",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "summary",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "artists",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": "published_at",
                          "name": "publishedAt",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "format",
                              "value": "MMM DD"
                            }
                          ],
                          "storageKey": "publishedAt(format:\"MMM DD\")"
                        },
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "artworksConnection",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "ArtworkConnection",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "FragmentSpread",
                              "name": "ArtworkGrid_artworks",
                              "args": null
                            }
                          ]
                        },
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "image",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "Image",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "LinkedField",
                              "alias": null,
                              "name": "resized",
                              "storageKey": "resized(height:80,width:80)",
                              "args": [
                                {
                                  "kind": "Literal",
                                  "name": "height",
                                  "value": 80
                                },
                                {
                                  "kind": "Literal",
                                  "name": "width",
                                  "value": 80
                                }
                              ],
                              "concreteType": "ResizedImageUrl",
                              "plural": false,
                              "selections": [
                                {
                                  "kind": "ScalarField",
                                  "alias": null,
                                  "name": "url",
                                  "args": null,
                                  "storageKey": null
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "__typename",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "cursor",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'bd5d74879f1919eade9e0b94cdbcb3f6';
export default node;
