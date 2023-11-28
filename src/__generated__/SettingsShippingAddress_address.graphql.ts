/**
 * @generated SignedSource<<32a32c7fddc010574c3285f366453534>>
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
  readonly addressLine2: string | null | undefined;
  readonly city: string;
  readonly country: string;
  readonly internalID: string;
  readonly isDefault: boolean;
  readonly name: string | null | undefined;
  readonly phoneNumber: string | null | undefined;
  readonly phoneNumberCountryCode: string | null | undefined;
  readonly postalCode: string | null | undefined;
  readonly region: string | null | undefined;
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
