/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ThankYou_submission = {
    readonly userEmail: string | null;
    readonly " $refType": "ThankYou_submission";
};
export type ThankYou_submission$data = ThankYou_submission;
export type ThankYou_submission$key = {
    readonly " $data"?: ThankYou_submission$data;
    readonly " $fragmentRefs": FragmentRefs<"ThankYou_submission">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ThankYou_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userEmail",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};
(node as any).hash = 'e25eec658370dc6e9338a456d6acf93a';
export default node;
