/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type SubmittedOrderModal_order = {
    readonly mode: CommerceOrderModeEnum | null;
    readonly stateExpiresAt: string | null;
    readonly " $refType": "SubmittedOrderModal_order";
};
export type SubmittedOrderModal_order$data = SubmittedOrderModal_order;
export type SubmittedOrderModal_order$key = {
    readonly " $data"?: SubmittedOrderModal_order$data;
    readonly " $fragmentRefs": FragmentRefs<"SubmittedOrderModal_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmittedOrderModal_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D"
        }
      ],
      "kind": "ScalarField",
      "name": "stateExpiresAt",
      "storageKey": "stateExpiresAt(format:\"MMM D\")"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '7f9db383d43746663b568120b2abcf86';
export default node;
