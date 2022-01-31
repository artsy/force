/**
 * @generated SignedSource<<e2a60008b8673dee003aace4f6ba9f7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Summary_offer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionSummary_offer" | "OfferSummary_offer">;
  readonly " $fragmentType": "Summary_offer";
};
export type Summary_offer$key = {
  readonly " $data"?: Summary_offer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Summary_offer">;
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
  "type": "ConsignmentOffer",
  "abstractKey": null
};

(node as any).hash = "3ae4545efea3f5a3d58228322f6a0928";

export default node;
