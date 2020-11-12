/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferDetailApp_submission = {
    readonly title: string | null;
    readonly " $refType": "OfferDetailApp_submission";
};
export type OfferDetailApp_submission$data = OfferDetailApp_submission;
export type OfferDetailApp_submission$key = {
    readonly " $data"?: OfferDetailApp_submission$data;
    readonly " $fragmentRefs": FragmentRefs<"OfferDetailApp_submission">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferDetailApp_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission"
};
(node as any).hash = 'c500c6956779aece4056c472ff369540';
export default node;
