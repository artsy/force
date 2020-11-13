/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Summary_offer = {
    readonly saleDate: string | null;
    readonly saleName: string | null;
    readonly saleLocation: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Submission_offer">;
    readonly " $refType": "Summary_offer";
};
export type Summary_offer$data = Summary_offer;
export type Summary_offer$key = {
    readonly " $data"?: Summary_offer$data;
    readonly " $fragmentRefs": FragmentRefs<"Summary_offer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Summary_offer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleLocation",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Submission_offer"
    }
  ],
  "type": "ConsignmentOffer"
};
(node as any).hash = '3b78274d2d44e82de78d856129d1ec6d';
export default node;
