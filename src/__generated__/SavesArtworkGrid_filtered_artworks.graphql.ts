/**
 * @generated SignedSource<<e09ca4c771034e4b544f38ee07ab46bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworkGrid_filtered_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
    } | null;
  } | null> | null;
  readonly pageCursors: {
    readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
  };
  readonly pageInfo: {
    readonly endCursor: string | null;
    readonly hasNextPage: boolean;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  readonly " $fragmentType": "SavesArtworkGrid_filtered_artworks";
};
export type SavesArtworkGrid_filtered_artworks$key = {
  readonly " $data"?: SavesArtworkGrid_filtered_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworkGrid_filtered_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworkGrid_filtered_artworks",
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
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "c766da0407c7aa558de2391a75e8aa8a";

export default node;
