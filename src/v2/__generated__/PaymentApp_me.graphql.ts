/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentApp_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsPayments_me">;
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
      "name": "UserSettingsPayments_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '6a3e00b5cd28afc62f4db9675c9b0140';
export default node;
