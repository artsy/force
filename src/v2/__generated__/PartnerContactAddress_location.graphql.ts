/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerContactAddress_location = {
    readonly city: string | null;
    readonly phone: string | null;
    readonly state: string | null;
    readonly address: string | null;
    readonly address2: string | null;
    readonly postalCode: string | null;
    readonly displayCountry: string | null;
    readonly " $refType": "PartnerContactAddress_location";
};
export type PartnerContactAddress_location$data = PartnerContactAddress_location;
export type PartnerContactAddress_location$key = {
    readonly " $data"?: PartnerContactAddress_location$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerContactAddress_location">;
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
  "type": "Location"
};
(node as any).hash = '22f6058e36dba8b51303698d218bcc35';
export default node;
