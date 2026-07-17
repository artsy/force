/**
 * @generated SignedSource<<fbb3a05e2406fc400f5064815b96f3e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceApp_auctionResult$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceLotDetails_auctionResult">;
  readonly " $fragmentType": "HammerPriceApp_auctionResult";
};
export type HammerPriceApp_auctionResult$key = {
  readonly " $data"?: HammerPriceApp_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceApp_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HammerPriceApp_auctionResult",
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
      "name": "HammerPriceLotDetails_auctionResult"
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "e98b5c00148ef1a447e968e2c5265a41";

export default node;
