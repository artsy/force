/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsEmailPreferences_me = {
    readonly emailFrequency: string | null;
    readonly id: string;
    readonly " $refType": "SettingsEditSettingsEmailPreferences_me";
};
export type SettingsEditSettingsEmailPreferences_me$data = SettingsEditSettingsEmailPreferences_me;
export type SettingsEditSettingsEmailPreferences_me$key = {
    readonly " $data"?: SettingsEditSettingsEmailPreferences_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsEmailPreferences_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsEmailPreferences_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailFrequency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '4550a5ff6a1a73f29de9bf543f17fe3d';
export default node;
