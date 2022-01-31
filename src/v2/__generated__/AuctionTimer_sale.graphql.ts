/**
 * @generated SignedSource<<6ef2acb3deb0085c8040e72a38c5a598>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionTimer_sale$data = {
  readonly liveStartAt: string | null;
  readonly endAt: string | null;
  readonly " $fragmentType": "AuctionTimer_sale";
};
export type AuctionTimer_sale$key = {
  readonly " $data"?: AuctionTimer_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionTimer_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionTimer_sale",
  "selections": [
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
      "name": "endAt",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "3adac1d5d9ff59e38723ddec36f0ab3c";

export default node;
