/**
 * @generated SignedSource<<b69e623d7329b58cf1952e96235d939f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignUpForm_requestLocation$data = {
  readonly countryCode: string | null;
  readonly " $fragmentType": "SignUpForm_requestLocation";
};
export type SignUpForm_requestLocation$key = {
  readonly " $data"?: SignUpForm_requestLocation$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignUpForm_requestLocation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignUpForm_requestLocation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "countryCode",
      "storageKey": null
    }
  ],
  "type": "RequestLocation",
  "abstractKey": null
};

(node as any).hash = "4e59fe8d3150617db26d33de4fac3bbe";

export default node;
