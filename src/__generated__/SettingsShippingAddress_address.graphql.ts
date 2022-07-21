/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingAddress_address = {
    readonly internalID: string;
    readonly addressLine1: string;
    readonly addressLine2: string | null;
    readonly city: string;
    readonly country: string;
    readonly isDefault: boolean;
    readonly name: string | null;
    readonly phoneNumber: string | null;
    readonly postalCode: string | null;
    readonly region: string | null;
    readonly " $refType": "SettingsShippingAddress_address";
};
export type SettingsShippingAddress_address$data = SettingsShippingAddress_address;
export type SettingsShippingAddress_address$key = {
    readonly " $data"?: SettingsShippingAddress_address$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsShippingAddress_address">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsShippingAddress_address",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
      "name": "country",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefault",
      "storageKey": null
    },
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
      "name": "phoneNumber",
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
    }
  ],
  "type": "UserAddress",
  "abstractKey": null
};
(node as any).hash = '5ddaa74cd5bb1ba03f7cb48fa204cffe';
export default node;
