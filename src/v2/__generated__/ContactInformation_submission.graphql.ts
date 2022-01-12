/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_submission = {
    readonly id: string;
    readonly " $refType": "ContactInformation_submission";
};
export type ContactInformation_submission$data = ContactInformation_submission;
export type ContactInformation_submission$key = {
    readonly " $data"?: ContactInformation_submission$data;
    readonly " $fragmentRefs": FragmentRefs<"ContactInformation_submission">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContactInformation_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};
(node as any).hash = '5ae005fd76817564634de5eb1fe5353c';
export default node;
