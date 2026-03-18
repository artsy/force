/**
 * @generated SignedSource<<eaa2fb5259278a209b909080b53ed78c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarSizeInfo_piece$data = {
  readonly dimensions: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly editionOf: string | null | undefined;
  readonly framedDimensions?: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarSizeInfo_piece";
};
export type ArtworkSidebarSizeInfo_piece$key = {
  readonly " $data"?: ArtworkSidebarSizeInfo_piece$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
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
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "editionOf",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "dimensions",
          "kind": "LinkedField",
          "name": "framedDimensions",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "type": "EditionSet",
      "abstractKey": null
    }
  ],
  "type": "Sellable",
  "abstractKey": "__isSellable"
};
})();

(node as any).hash = "c83d20f7928915d10ad5f643e62ee67e";

export default node;
