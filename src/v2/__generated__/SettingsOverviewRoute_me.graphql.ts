/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsOverviewRoute_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsOverviewRoute_me";
};
export type SettingsOverviewRoute_me$data = SettingsOverviewRoute_me;
export type SettingsOverviewRoute_me$key = {
    readonly " $data"?: SettingsOverviewRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsOverviewRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsOverviewRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '7028392d42eec203025d4055c5543eb0';
export default node;
