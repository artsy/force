/**
 * @generated SignedSource<<74390c9bd4ef4eaba02a92b5f66951db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleDetailTimer_sale$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null;
  } | null;
  readonly endAt: string | null;
  readonly endedAt: string | null;
  readonly startAt: string | null;
  readonly " $fragmentType": "SaleDetailTimer_sale";
};
export type SaleDetailTimer_sale$key = {
  readonly " $data"?: SaleDetailTimer_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleDetailTimer_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleDetailTimer_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 0
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:0)"
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "a162d3baa71ed5077d5e40e4398fbc6d";

export default node;
