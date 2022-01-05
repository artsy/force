/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingAddress_ship = {
    readonly name?: string | null;
    readonly addressLine1?: string | null;
    readonly addressLine2?: string | null;
    readonly city?: string | null;
    readonly postalCode?: string | null;
    readonly region?: string | null;
    readonly country?: string | null;
    readonly phoneNumber?: string | null;
    readonly " $refType": "ShippingAddress_ship";
};
export type ShippingAddress_ship$data = ShippingAddress_ship;
export type ShippingAddress_ship$key = {
    readonly " $data"?: ShippingAddress_ship$data;
    readonly " $fragmentRefs": FragmentRefs<"ShippingAddress_ship">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "city",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "postalCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "country",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "phoneNumber",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShippingAddress_ship",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "CommerceShip",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "CommerceShipArta",
      "abstractKey": null
    }
  ],
  "type": "CommerceRequestedFulfillmentUnion",
  "abstractKey": "__isCommerceRequestedFulfillmentUnion"
};
})();
(node as any).hash = '92a7556e23bed9386cd5a051956ad8db';
export default node;
