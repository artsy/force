/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewPayment_me = {
    readonly " $fragmentRefs": FragmentRefs<"PaymentPicker_me">;
    readonly " $refType": "NewPayment_me";
};
export type NewPayment_me$data = NewPayment_me;
export type NewPayment_me$key = {
    readonly " $data"?: NewPayment_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NewPayment_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewPayment_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentPicker_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '7bb5f7c3b4fe86e246747b31a9b14b64';
export default node;
