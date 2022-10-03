/**
 * @generated SignedSource<<a2833942df9c79f10380725271bd6346>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerContactAddress_location$data = {
  readonly address: string | null;
  readonly address2: string | null;
  readonly city: string | null;
  readonly displayCountry: string | null;
  readonly phone: string | null;
  readonly postalCode: string | null;
  readonly state: string | null;
  readonly " $fragmentType": "PartnerContactAddress_location";
};
export type PartnerContactAddress_location$key = {
  readonly " $data"?: PartnerContactAddress_location$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerContactAddress_location">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerContactAddress_location",
  "selections": [
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
      "name": "phone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address2",
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
      "name": "displayCountry",
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};

(node as any).hash = "22f6058e36dba8b51303698d218bcc35";

export default node;
