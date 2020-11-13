/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Summary_offer = {
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
(node as any).hash = '3ae4545efea3f5a3d58228322f6a0928';
export default node;
