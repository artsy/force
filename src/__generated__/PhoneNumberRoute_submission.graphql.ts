/**
 * @generated SignedSource<<8b654e161a8f03413a1fc394fe13caa8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PhoneNumberRoute_submission$data = {
  readonly userPhoneNumber: {
    readonly display: string | null | undefined;
    readonly regionCode: string | null | undefined;
  } | null | undefined;
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
      "concreteType": "PhoneNumberType",
      "kind": "LinkedField",
      "name": "userPhoneNumber",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "regionCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "f3bb7235b3de98aeb762f30361f6e30d";

export default node;
