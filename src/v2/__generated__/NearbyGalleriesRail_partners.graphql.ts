/**
 * @generated SignedSource<<ae71ae1c91ca2d17e679f5727bb8c066>>
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
    readonly id: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"NearbyGalleryCard_partner">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "NearbyGalleryCard_partner"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PartnerEdge",
  "abstractKey": null
};

(node as any).hash = "87a1494ba7fbe4c211b25a5dc81c47c4";

export default node;
