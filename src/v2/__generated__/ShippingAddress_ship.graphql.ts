/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingAddress_ship = {
    readonly name: string | null;
    readonly addressLine1: string | null;
    readonly addressLine2: string | null;
    readonly city: string | null;
    readonly postalCode: string | null;
    readonly region: string | null;
    readonly country: string | null;
    readonly phoneNumber: string | null;
    readonly " $refType": "ShippingAddress_ship";
};
export type ShippingAddress_ship$data = ShippingAddress_ship;
export type ShippingAddress_ship$key = {
    readonly " $data"?: ShippingAddress_ship$data;
    readonly " $fragmentRefs": FragmentRefs<"ShippingAddress_ship">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ShippingAddress_ship",
  "type": "CommerceShip",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "addressLine1",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "addressLine2",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "city",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "postalCode",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "region",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "country",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "phoneNumber",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '965be360f1c02f1cf98d179dda1e2df4';
export default node;
