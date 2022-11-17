/**
 * @generated SignedSource<<ad909c497057f651d8a7830175ce6c21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CascadingEndTimesBanner_sale$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null;
  } | null;
  readonly cascadingEndTimeIntervalMinutes: number | null;
  readonly extendedBiddingIntervalMinutes: number | null;
  readonly " $fragmentType": "CascadingEndTimesBanner_sale";
};
export type CascadingEndTimesBanner_sale$key = {
  readonly " $data"?: CascadingEndTimesBanner_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CascadingEndTimesBanner_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cascadingEndTimeIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingIntervalMinutes",
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

(node as any).hash = "a386706054a64b0dfb9cd69190807026";

export default node;
