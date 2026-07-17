/**
 * @generated SignedSource<<64f78c6e92efdc9c23a70d7f20c2a51a>>
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
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceGamePanel_auctionResult" | "HammerPriceLotDetails_auctionResult" | "HammerPriceMeta_auctionResult">;
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
      "name": "HammerPriceMeta_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HammerPriceLotDetails_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HammerPriceGamePanel_auctionResult"
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "f91c97c047ceea03ac78beaf3befc353";

export default node;
