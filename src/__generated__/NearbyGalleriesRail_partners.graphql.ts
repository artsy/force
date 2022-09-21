/**
 * @generated SignedSource<<f4506da082b9cdbdf56453b332ab23b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NearbyGalleriesRail_partners$data = ReadonlyArray<{
  readonly node: {
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"CellPartner_partner">;
  } | null;
  readonly " $fragmentType": "NearbyGalleriesRail_partners";
}>;
export type NearbyGalleriesRail_partners$key = ReadonlyArray<{
  readonly " $data"?: NearbyGalleriesRail_partners$data;
  readonly " $fragmentSpreads": FragmentRefs<"NearbyGalleriesRail_partners">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "CellPartner_partner"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PartnerEdge",
  "abstractKey": null
};

(node as any).hash = "d85ce52e89855b22727e93cde15509cf";

export default node;
