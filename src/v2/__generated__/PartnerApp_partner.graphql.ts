/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_partner = {
    readonly profile: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerHeaderImage_profile">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"PartnerMeta_partner" | "PartnerHeader_partner" | "NavigationTabs_partner">;
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PartnerHeaderImage_profile"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerMeta_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerHeader_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NavigationTabs_partner"
    }
  ],
  "type": "Partner"
};
(node as any).hash = '977fe5aa7ca51bedabaa52e9ed840d10';
export default node;
