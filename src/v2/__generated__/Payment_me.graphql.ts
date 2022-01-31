/**
 * @generated SignedSource<<a1bd0e1c6e9be746c3af476dd1e55356>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Payment_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PaymentPicker_me">;
  readonly " $fragmentType": "Payment_me";
};
export type Payment_me$key = {
  readonly " $data"?: Payment_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Payment_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Payment_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentPicker_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "6e58b93df5b176669dbf779516ec980d";

export default node;
