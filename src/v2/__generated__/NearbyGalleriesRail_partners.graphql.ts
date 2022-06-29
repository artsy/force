/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NearbyGalleriesRail_partners = ReadonlyArray<{
    readonly node: {
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"CellPartner_partner">;
    } | null;
    readonly " $refType": "NearbyGalleriesRail_partners";
}>;
export type NearbyGalleriesRail_partners$data = NearbyGalleriesRail_partners;
export type NearbyGalleriesRail_partners$key = ReadonlyArray<{
    readonly " $data"?: NearbyGalleriesRail_partners$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NearbyGalleriesRail_partners">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "NearbyGalleriesRail_partners",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CellPartner_partner"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PartnerEdge",
  "abstractKey": null
};
(node as any).hash = 'd85ce52e89855b22727e93cde15509cf';
export default node;
