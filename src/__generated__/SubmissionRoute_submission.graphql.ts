/**
 * @generated SignedSource<<1fd334aa8ea45845561c1ba22e6fa0c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionRoute_submission$data = {
  readonly externalId: string;
  readonly internalID: string | null | undefined;
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
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "0f3eee192b38451a4827de4d547a9dcb";

export default node;
