/**
 * @generated SignedSource<<d7a4efeb8d350791e1470d99c6043dd0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesArtworks_me$data = {
  readonly followsAndSaves: {
    readonly artworksConnection: {
      readonly totalCount: number | null;
      readonly pageInfo: {
        readonly hasNextPage: boolean;
        readonly endCursor: string | null;
      };
      readonly pageCursors: {
        readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
      };
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
          readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
        } | null;
      } | null> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "SettingsSavesArtworks_me";
};
export type SettingsSavesArtworks_me$key = {
  readonly " $data"?: SettingsSavesArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesArtworks_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "followsAndSaves",
          "artworksConnection"
        ]
      }
    ]
  },
  "name": "SettingsSavesArtworks_me",
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
          "alias": "artworksConnection",
          "args": [
            {
              "kind": "Variable",
              "name": "page",
              "variableName": "page"
            },
            {
              "kind": "Literal",
              "name": "private",
              "value": true
            }
          ],
          "concreteType": "SavedArtworksConnection",
          "kind": "LinkedField",
          "name": "__SettingsSavesArtworks_artworksConnection_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Pagination_pageCursors"
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "internalID",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "GridItem_artwork"
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
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "d28b43b24dd886e7ef21e1e599d3157e";

export default node;
