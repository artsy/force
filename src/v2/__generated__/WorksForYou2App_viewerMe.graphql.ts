/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYou2App_viewerMe = {
    readonly me: {
        readonly followsAndSaves: {
            readonly bundledArtworksByArtistConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "WorksForYou2App_viewerMe";
};
export type WorksForYou2App_viewerMe$data = WorksForYou2App_viewerMe;
export type WorksForYou2App_viewerMe$key = {
    readonly " $data"?: WorksForYou2App_viewerMe$data;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYou2App_viewerMe">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForYou2App_viewerMe",
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
(node as any).hash = '33c8270c06e2c1f2f1de6a079c8f2fdd';
export default node;
