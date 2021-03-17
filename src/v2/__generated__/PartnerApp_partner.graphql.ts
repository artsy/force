/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_partner = {
    readonly id: string;
    readonly slug: string;
    readonly name: string | null;
    readonly " $refType": "PartnerApp_partner";
};
export type PartnerApp_partner$data = PartnerApp_partner;
export type PartnerApp_partner$key = {
    readonly " $data"?: PartnerApp_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerApp_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerApp_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '161bdf1b521d4e61aa5cae09a89b6a83';
export default node;
