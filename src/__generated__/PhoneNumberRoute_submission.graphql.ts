/**
 * @generated SignedSource<<27e91f48a8799021adea800a3b106586>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PhoneNumberRoute_submission$data = {
  readonly userPhone: string | null | undefined;
  readonly " $fragmentType": "PhoneNumberRoute_submission";
};
export type PhoneNumberRoute_submission$key = {
  readonly " $data"?: PhoneNumberRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"PhoneNumberRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PhoneNumberRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userPhone",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "9ef24e9b6e70018e7704b07614e7627f";

export default node;
