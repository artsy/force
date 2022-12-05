/**
 * @generated SignedSource<<f2e4ad798e224bc2838cc4f92ab03e39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthDialogSignUp_requestLocation$data = {
  readonly countryCode: string | null;
  readonly " $fragmentType": "AuthDialogSignUp_requestLocation";
};
export type AuthDialogSignUp_requestLocation$key = {
  readonly " $data"?: AuthDialogSignUp_requestLocation$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuthDialogSignUp_requestLocation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuthDialogSignUp_requestLocation",
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

(node as any).hash = "f8cf9971da121431b0c3fc5856281941";

export default node;
