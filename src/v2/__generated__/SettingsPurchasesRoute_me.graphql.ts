/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchasesRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsPurchases_me">;
    readonly " $refType": "SettingsPurchasesRoute_me";
};
export type SettingsPurchasesRoute_me$data = SettingsPurchasesRoute_me;
export type SettingsPurchasesRoute_me$key = {
    readonly " $data"?: SettingsPurchasesRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsPurchasesRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPurchasesRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsPurchases_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '8a2efa38bf0d5311ae045d8dfffb326d';
export default node;
