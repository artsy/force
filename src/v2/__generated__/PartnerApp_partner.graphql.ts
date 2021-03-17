/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_partner = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_partner">;
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
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NavigationTabs_partner"
    }
  ],
  "type": "Partner"
};
(node as any).hash = '62a9f0389b78665c93b1bfdde852760f';
export default node;
