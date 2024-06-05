/**
 * @generated SignedSource<<32ef83ac41e5303cc90597a6e19f436d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ThankYouRoute_submission$data = {
  readonly externalId: string;
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
      "name": "externalId",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "8891d40b8aa34ddfe90e4073d740c878";

export default node;
