/**
 * @generated SignedSource<<921b582305d4c97863116c636b7af4b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ThankYouRoute_submission$data = {
  readonly internalID: string | null | undefined;
  readonly myCollectionArtworkID: string | null | undefined;
  readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  readonly " $fragmentType": "ThankYouRoute_submission";
};
export type ThankYouRoute_submission$key = {
  readonly " $data"?: ThankYouRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ThankYouRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ThankYouRoute_submission",
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
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "myCollectionArtworkID",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "23abbccc0a924ccac794f641333186d7";

export default node;
