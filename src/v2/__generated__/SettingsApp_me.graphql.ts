/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsApp_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsApp_me";
};
export type SettingsApp_me$data = SettingsApp_me;
export type SettingsApp_me$key = {
    readonly " $data"?: SettingsApp_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '56be5a9c920e4e6f4c10ae60edaeaedc';
export default node;
