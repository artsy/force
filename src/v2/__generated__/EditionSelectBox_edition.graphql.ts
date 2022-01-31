/**
 * @generated SignedSource<<0fede698bec49f52b3c29be9cbee447b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditionSelectBox_edition$data = {
  readonly internalID: string;
  readonly editionOf: string | null;
  readonly isOfferableFromInquiry: boolean | null;
  readonly listPrice: {
    readonly display?: string | null;
  } | null;
  readonly dimensions: {
    readonly cm: string | null;
    readonly in: string | null;
  } | null;
  readonly " $fragmentType": "EditionSelectBox_edition";
};
export type EditionSelectBox_edition$key = {
  readonly " $data"?: EditionSelectBox_edition$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditionSelectBox_edition">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditionSelectBox_edition",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferableFromInquiry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "listPrice",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "Money",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "PriceRange",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
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
          "name": "cm",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "EditionSet",
  "abstractKey": null
};
})();

(node as any).hash = "bed44602aa3d225b35cb8b5a9aa189a0";

export default node;
