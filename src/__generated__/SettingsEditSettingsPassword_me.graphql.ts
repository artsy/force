/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsPassword_me = {
    readonly hasPassword: boolean;
    readonly " $refType": "SettingsEditSettingsPassword_me";
};
export type SettingsEditSettingsPassword_me$data = SettingsEditSettingsPassword_me;
export type SettingsEditSettingsPassword_me$key = {
    readonly " $data"?: SettingsEditSettingsPassword_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsPassword_me">;
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
(node as any).hash = '7a8d2bf99ebdf91f780e1387cb9aaf6f';
export default node;
