/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_partner = {
    readonly partnerType: string | null;
    readonly displayFullPartnerPage: boolean | null;
    readonly partnerPageEligible: boolean | null;
    readonly isDefaultProfilePublic: boolean | null;
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
      "kind": "ScalarField",
      "name": "partnerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerPageEligible",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefaultProfilePublic",
      "storageKey": null
    },
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
  "type": "Partner",
  "abstractKey": null
};
(node as any).hash = '7ddbd3bf8397f8a6457dd30b85420462';
export default node;
