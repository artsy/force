/**
 * @generated SignedSource<<f2c8dd03d95a304fde0034f3fc20b4f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ThankYouRoute_submission$data = {
  readonly internalID: string | null | undefined;
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
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "5378e57c68e2ee6b36d442552fa3ab40";

export default node;
