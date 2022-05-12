/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsMethods_me">;
    readonly " $refType": "SettingsPaymentsRoute_me";
};
export type SettingsPaymentsRoute_me$data = SettingsPaymentsRoute_me;
export type SettingsPaymentsRoute_me$key = {
    readonly " $data"?: SettingsPaymentsRoute_me$data | undefined;
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
      "name": "SettingsPaymentsMethods_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'd5e17350fd5b99c456131babc0debbb3';
export default node;
