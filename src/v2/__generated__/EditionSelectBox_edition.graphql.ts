/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EditionSelectBox_edition = {
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
    readonly " $refType": "EditionSelectBox_edition";
};
export type EditionSelectBox_edition$data = EditionSelectBox_edition;
export type EditionSelectBox_edition$key = {
    readonly " $data"?: EditionSelectBox_edition$data;
    readonly " $fragmentRefs": FragmentRefs<"EditionSelectBox_edition">;
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
          "type": "Money"
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "PriceRange"
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
  "type": "EditionSet"
};
})();
(node as any).hash = 'bed44602aa3d225b35cb8b5a9aa189a0';
export default node;
