/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentApp_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"PaymentSection_me" | "UserSettingsAddresses_me">;
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
      "name": "PaymentSection_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSettingsAddresses_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '17037f8d70433d0e4e14159b243196f8';
export default node;
