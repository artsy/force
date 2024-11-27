/**
 * @generated SignedSource<<e92a7c6da988f82adcabb0845a11ea82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PurchaseHistoryRoute_submission$data = {
  readonly provenance: string | null | undefined;
  readonly signature: boolean | null | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "signature",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "a36cbcb3ae9a2f7a8c56017c6803fd20";

export default node;
