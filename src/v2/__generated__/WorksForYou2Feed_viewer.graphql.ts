/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYou2Feed_viewer = {
    readonly me: {
        readonly followsAndSaves: {
            readonly bundledArtworksByArtistConnection: {
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
                        readonly publishedAt: string | null;
                        readonly artworksConnection: {
                            readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
                        } | null;
                        readonly image: {
                            readonly resized: {
                                readonly src: string;
                                readonly srcSet: string;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "WorksForYou2Feed_viewer";
};
export type WorksForYou2Feed_viewer$data = WorksForYou2Feed_viewer;
export type WorksForYou2Feed_viewer$key = {
    readonly " $data"?: WorksForYou2Feed_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYou2Feed_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 25,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
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
          "bundledArtworksByArtistConnection"
        ]
      }
    ]
  },
  "name": "WorksForYou2Feed_viewer",
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
              "alias": "bundledArtworksByArtistConnection",
              "args": [
                {
                  "kind": "Literal",
                  "name": "forSale",
                  "value": true
                },
                {
                  "kind": "Literal",
                  "name": "sort",
                  "value": "PUBLISHED_AT_DESC"
                }
              ],
              "concreteType": "FollowedArtistsArtworksGroupConnection",
              "kind": "LinkedField",
              "name": "__WorksForYou2Feed_bundledArtworksByArtistConnection_connection",
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
                          "alias": null,
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
              "storageKey": "__WorksForYou2Feed_bundledArtworksByArtistConnection_connection(forSale:true,sort:\"PUBLISHED_AT_DESC\")"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '9fd22901c933047f39b228d067b21e5a';
export default node;
