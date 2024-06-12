/**
 * @generated SignedSource<<07f11c89d85c929e57332a44144c74c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PurchaseHistoryRoute_submission$data = {
  readonly provenance: string | null | undefined;
  readonly " $fragmentType": "PurchaseHistoryRoute_submission";
};
export type PurchaseHistoryRoute_submission$key = {
  readonly " $data"?: PurchaseHistoryRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"PurchaseHistoryRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PurchaseHistoryRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "provenance",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "b5a118d7b30e0d2fe9f140d75ca52db3";

export default node;
