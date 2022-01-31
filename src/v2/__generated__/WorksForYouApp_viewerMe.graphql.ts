/**
 * @generated SignedSource<<f1eaa34dd6d06aeb7e686daec648d6f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_viewerMe$data = {
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
  readonly " $fragmentType": "WorksForYouApp_viewerMe";
};
export type WorksForYouApp_viewerMe$key = {
  readonly " $data"?: WorksForYouApp_viewerMe$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerMe">;
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

(node as any).hash = "5431c8b86b3a270ae920743cd1044a39";

export default node;
