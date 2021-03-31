/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerContactAddress_Fragment = {
    readonly city: string | null;
    readonly phone: string | null;
    readonly state: string | null;
    readonly country: string | null;
    readonly address: string | null;
    readonly address2: string | null;
    readonly postalCode: string | null;
    readonly " $refType": "PartnerContactAddress_Fragment";
};
export type PartnerContactAddress_Fragment$data = PartnerContactAddress_Fragment;
export type PartnerContactAddress_Fragment$key = {
    readonly " $data"?: PartnerContactAddress_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerContactAddress_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerContactAddress_Fragment",
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
      "name": "country",
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
    }
  ],
  "type": "Location"
};
(node as any).hash = '9d82e54cc2c70c0384ea45ffb391ad40';
export default node;
