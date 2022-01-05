/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentApp_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"PaymentSection_me">;
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
    }
  ],
  "type": "Me"
};
(node as any).hash = 'f5f77a36b499ae5774ad4b562f1a2d4f';
export default node;
