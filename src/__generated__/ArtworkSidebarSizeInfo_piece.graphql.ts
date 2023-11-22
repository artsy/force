/**
 * @generated SignedSource<<55160f0a005e01474f0b4e8a6121d281>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarSizeInfo_piece$data = {
  readonly dimensions: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly editionOf: string | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarSizeInfo_piece";
};
export type ArtworkSidebarSizeInfo_piece$key = {
  readonly " $data"?: ArtworkSidebarSizeInfo_piece$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarSizeInfo_piece",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "editionOf",
      "storageKey": null
    }
  ],
  "type": "Sellable",
  "abstractKey": "__isSellable"
};

(node as any).hash = "a986776b32a0b3f3f9bab3199809c7e2";

export default node;
