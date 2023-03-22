/**
 * @generated SignedSource<<b58db19902df1d7272365a9d7f58afc9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworksGrid_me$data = {
  readonly collection: {
    readonly artworks: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null;
      } | null> | null;
      readonly pageCursors: {
        readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
      };
      readonly pageInfo: {
        readonly hasNextPage: boolean;
      };
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
    } | null;
    readonly internalID: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SavesEmptyState_me">;
  readonly " $fragmentType": "SavesArtworksGrid_me";
};
export type SavesArtworksGrid_me$key = {
  readonly " $data"?: SavesArtworksGrid_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "collectionID"
    },
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworksGrid_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "collectionID"
        }
      ],
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
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
          "alias": "artworks",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 30
            },
            {
              "kind": "Variable",
              "name": "page",
              "variableName": "page"
            },
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "sort"
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
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "collectionID",
          "variableName": "collectionID"
        }
      ],
      "kind": "FragmentSpread",
      "name": "SavesEmptyState_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "0ef7ff9c1efb53679e42123e3ae26e46";

export default node;
