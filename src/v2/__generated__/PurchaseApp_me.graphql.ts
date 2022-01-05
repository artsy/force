/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PurchaseApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"PurchaseHistory_me">;
    readonly " $refType": "PurchaseApp_me";
};
export type PurchaseApp_me$data = PurchaseApp_me;
export type PurchaseApp_me$key = {
    readonly " $data"?: PurchaseApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PurchaseApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PurchaseHistory_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'e70a36883f4593860107a31d2f840614';
export default node;
