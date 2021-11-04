/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsAlertsRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"AllAlertsSection_me">;
    readonly " $refType": "SettingsAlertsRoute_me";
};
export type SettingsAlertsRoute_me$data = SettingsAlertsRoute_me;
export type SettingsAlertsRoute_me$key = {
    readonly " $data"?: SettingsAlertsRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsAlertsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsAlertsRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AllAlertsSection_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '4b94bdbfc4b6dcf9f76e09f7d8781f15';
export default node;
