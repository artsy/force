/**
 * @generated SignedSource<<044eb6b1718c9e8482f05c0f5d8e292a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsPassword_me$data = {
  readonly hasPassword: boolean;
  readonly " $fragmentType": "SettingsEditSettingsPassword_me";
};
export type SettingsEditSettingsPassword_me$key = {
  readonly " $data"?: SettingsEditSettingsPassword_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsPassword_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsPassword_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPassword",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "7a8d2bf99ebdf91f780e1387cb9aaf6f";

export default node;
