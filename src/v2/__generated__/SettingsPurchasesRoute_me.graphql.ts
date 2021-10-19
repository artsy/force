/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchasesRoute_me = {
    readonly name: string | null;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = 'd0810f50c8abc162df5bb80601d2e746';
export default node;
