/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsRoute_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsPaymentsRoute_me";
};
export type SettingsPaymentsRoute_me$data = SettingsPaymentsRoute_me;
export type SettingsPaymentsRoute_me$key = {
    readonly " $data"?: SettingsPaymentsRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPaymentsRoute_me",
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
(node as any).hash = 'e34e5f50a7a3ac02756c2a43c506d523';
export default node;
