/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"PaymentSection_me">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentSection_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '6a41b67b15b9cfc1c1630c5b0499332f';
export default node;
