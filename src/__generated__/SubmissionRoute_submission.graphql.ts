/**
 * @generated SignedSource<<52b8905df1a21925874c9a83aaf88c2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionRoute_submission$data = {
  readonly externalId: string;
  readonly internalID: string | null | undefined;
  readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  readonly " $fragmentType": "SubmissionRoute_submission";
};
export type SubmissionRoute_submission$key = {
  readonly " $data"?: SubmissionRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionRoute_submission",
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
      "name": "externalId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "83e9465ac2bec4d1dd6dca1b2b5b0012";

export default node;
