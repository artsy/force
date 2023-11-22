/**
 * @generated SignedSource<<51529e930b03a618e91fee0f3b80562c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerContactAddress_location$data = {
  readonly address: string | null | undefined;
  readonly address2: string | null | undefined;
  readonly city: string | null | undefined;
  readonly displayCountry: string | null | undefined;
  readonly phone: string | null | undefined;
  readonly postalCode: string | null | undefined;
  readonly state: string | null | undefined;
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
