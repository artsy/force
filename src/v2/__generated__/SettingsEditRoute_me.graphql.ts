/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditRoute_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsEditRoute_me";
};
export type SettingsEditRoute_me$data = SettingsEditRoute_me;
export type SettingsEditRoute_me$key = {
    readonly " $data"?: SettingsEditRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditRoute_me",
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
(node as any).hash = 'f23bdd89fb65ecb7c7571bda2d515049';
export default node;
