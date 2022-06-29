/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Payment_me = {
    readonly " $fragmentRefs": FragmentRefs<"PaymentPicker_me" | "BankAccountPicker_me">;
    readonly " $refType": "Payment_me";
};
export type Payment_me$data = Payment_me;
export type Payment_me$key = {
    readonly " $data"?: Payment_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Payment_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Payment_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentPicker_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BankAccountPicker_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '09bd466e2814e345b4bcd89bea197068';
export default node;
