/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_viewerMe = {
    readonly me: {
        readonly followsAndSaves: {
            readonly artistsConnection: {
                readonly totalCount: number | null;
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly artist: {
                            readonly name: string | null;
                            readonly slug: string;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
            readonly bundledArtworksByArtistConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "WorksForYouApp_viewerMe";
};
export type WorksForYouApp_viewerMe$data = WorksForYouApp_viewerMe;
export type WorksForYouApp_viewerMe$key = {
    readonly " $data"?: WorksForYouApp_viewerMe$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerMe">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForYouApp_viewerMe",
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 99
                }
              ],
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
                              "kind": "ScalarField",
                              "name": "name",
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "slug",
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
              "storageKey": "artistsConnection(first:99)"
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 1
                },
                {
                  "kind": "Literal",
                  "name": "forSale",
                  "value": true
                }
              ],
              "concreteType": "FollowedArtistsArtworksGroupConnection",
              "kind": "LinkedField",
              "name": "bundledArtworksByArtistConnection",
              "plural": false,
              "selections": [
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
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": "bundledArtworksByArtistConnection(first:1,forSale:true)"
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
(node as any).hash = '59756fcfef6d5f4aed844db5bbf18075';
export default node;
