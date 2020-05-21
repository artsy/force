/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Payment_me = {
    readonly " $fragmentRefs": FragmentRefs<"PaymentPicker_me">;
    readonly " $refType": "Payment_me";
};
export type Payment_me$data = Payment_me;
export type Payment_me$key = {
    readonly " $data"?: Payment_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Payment_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Payment_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "PaymentPicker_me",
      "args": null
    }
  ]
};
(node as any).hash = '6e58b93df5b176669dbf779516ec980d';
export default node;
