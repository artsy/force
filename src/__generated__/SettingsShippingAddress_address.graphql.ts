/**
 * @generated SignedSource<<80e46bcde3a4d8119042d14d41cb6509>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingAddress_address$data = {
  readonly addressLine1: string;
  readonly addressLine2: string | null;
  readonly city: string;
  readonly country: string;
  readonly internalID: string;
  readonly isDefault: boolean;
  readonly name: string | null;
  readonly phoneNumber: string | null;
  readonly phoneNumberCountryCode: string | null;
  readonly postalCode: string | null;
  readonly region: string | null;
  readonly " $fragmentType": "SettingsShippingAddress_address";
};
export type SettingsShippingAddress_address$key = {
  readonly " $data"?: SettingsShippingAddress_address$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsShippingAddress_address">;
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
      "name": "phoneNumberCountryCode",
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

(node as any).hash = "8fed58260fe2f239eeb73dee64288d40";

export default node;
