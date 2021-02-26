/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentApp_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsAddresses_me" | "UserSettingsPayments_me">;
    readonly " $refType": "PaymentApp_me";
};
export type PaymentApp_me$data = PaymentApp_me;
export type PaymentApp_me$key = {
    readonly " $data"?: PaymentApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSettingsAddresses_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSettingsPayments_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'e24228d518416bffe30b8251823439f9';
export default node;
