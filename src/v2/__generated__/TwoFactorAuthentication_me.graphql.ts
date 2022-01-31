/**
 * @generated SignedSource<<d4990b6750e71242e3f114e138f65d65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthentication_me$data = {
  readonly hasSecondFactorEnabled: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"AppSecondFactor_me" | "SmsSecondFactor_me" | "BackupSecondFactor_me">;
  readonly " $fragmentType": "TwoFactorAuthentication_me";
};
export type TwoFactorAuthentication_me$key = {
  readonly " $data"?: TwoFactorAuthentication_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"TwoFactorAuthentication_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TwoFactorAuthentication_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasSecondFactorEnabled",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AppSecondFactor_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SmsSecondFactor_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BackupSecondFactor_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "eac31dfdac45d8d82d5c52be1fac4bf8";

export default node;
