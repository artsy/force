/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsInformation_me = {
    readonly email: string | null;
    readonly name: string | null;
    readonly paddleNumber: string | null;
    readonly phone: string | null;
    readonly " $refType": "SettingsEditSettingsInformation_me";
};
export type SettingsEditSettingsInformation_me$data = SettingsEditSettingsInformation_me;
export type SettingsEditSettingsInformation_me$key = {
    readonly " $data"?: SettingsEditSettingsInformation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsInformation_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsInformation_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paddleNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '4b58a8c8a4bb4bcbc13fd9519056de2a';
export default node;
