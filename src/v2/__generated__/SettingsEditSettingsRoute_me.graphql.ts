/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsInformation_me">;
    readonly " $refType": "SettingsEditSettingsRoute_me";
};
export type SettingsEditSettingsRoute_me$data = SettingsEditSettingsRoute_me;
export type SettingsEditSettingsRoute_me$key = {
    readonly " $data"?: SettingsEditSettingsRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsInformation_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '6169d05baf70dd032cf44ea18d3764a7';
export default node;
