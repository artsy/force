/**
 * @generated SignedSource<<c05d08dfc46b2481c0a8fc70f6c0fca8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionInfoSidebar_sale$data = {
  readonly hideTotal: boolean | null | undefined;
  readonly internalID: string;
  readonly liveStartAt: string | null | undefined;
  readonly totalRaised: {
    readonly display: string | null | undefined;
    readonly minor: any;
  } | null | undefined;
  readonly " $fragmentType": "AuctionInfoSidebar_sale";
};
export type AuctionInfoSidebar_sale$key = {
  readonly " $data"?: AuctionInfoSidebar_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionInfoSidebar_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionInfoSidebar_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "liveStartAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hideTotal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "totalRaised",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "fdfaa5bd34ff9f09c341d6323c52a9b2";

export default node;
