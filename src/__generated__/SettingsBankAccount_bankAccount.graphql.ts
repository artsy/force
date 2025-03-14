/**
 * @generated SignedSource<<4a1145abb1eefa71c66af7e35837cbf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsBankAccount_bankAccount$data = {
  readonly internalID: string;
  readonly last4: string;
  readonly " $fragmentType": "SettingsBankAccount_bankAccount";
};
export type SettingsBankAccount_bankAccount$key = {
  readonly " $data"?: SettingsBankAccount_bankAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsBankAccount_bankAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsBankAccount_bankAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "last4",
      "storageKey": null
    }
  ],
  "type": "BankAccount",
  "abstractKey": null
};

(node as any).hash = "35ab302f8b7ff6a657c572d98be2ee2b";

export default node;
