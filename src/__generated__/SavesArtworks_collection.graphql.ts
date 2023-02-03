/**
 * @generated SignedSource<<2cf7e797802fa77f51879514c3ff1cb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworks_collection$data = {
  readonly artworks: {
    readonly totalCount: number | null;
    readonly " $fragmentSpreads": FragmentRefs<"SavesArtworkGrid_filtered_artworks">;
  } | null;
  readonly name: string;
  readonly " $fragmentType": "SavesArtworks_collection";
};
export type SavesArtworks_collection$key = {
  readonly " $data"?: SavesArtworks_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworks_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworks_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
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
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SavesArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:30)"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "3e5ed1385835dd369020588d320a591c";

export default node;
