/* tslint:disable */
/* eslint-disable */

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
                                readonly url: string;
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
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "forSale",
      "type": "Boolean"
    }
  ],
  "kind": "Fragment",
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
  "name": "WorksForYouFeed_viewer",
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
              "alias": "notifications",
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
              "kind": "LinkedField",
              "name": "__WorksForYou_notifications_connection",
              "plural": false,
              "selections": [
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
                  "concreteType": "FollowedArtistsArtworksGroupEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "FollowedArtistsArtworksGroup",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "id",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "href",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "summary",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "artists",
                          "storageKey": null
                        },
                        {
                          "alias": "published_at",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "format",
                              "value": "MMM DD"
                            }
                          ],
                          "kind": "ScalarField",
                          "name": "publishedAt",
                          "storageKey": "publishedAt(format:\"MMM DD\")"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "ArtworkConnection",
                          "kind": "LinkedField",
                          "name": "artworksConnection",
                          "plural": false,
                          "selections": [
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "ArtworkGrid_artworks"
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
                              "alias": null,
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
                              "kind": "LinkedField",
                              "name": "resized",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "url",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": "resized(height:80,width:80)"
                            }
                          ],
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "cursor",
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
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'bd5d74879f1919eade9e0b94cdbcb3f6';
export default node;
