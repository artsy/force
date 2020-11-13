/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Summary_offer = {
    readonly saleDate: string | null;
    readonly saleName: string | null;
    readonly saleLocation: string | null;
    readonly " $fragmentRefs": FragmentRefs<"SubmissionSummary_offer" | "OfferSummary_offer">;
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
      "name": "SubmissionSummary_offer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OfferSummary_offer"
    }
  ],
  "type": "ConsignmentOffer"
};
(node as any).hash = '0f7484468e23a2976edf0159f509b80a';
export default node;
