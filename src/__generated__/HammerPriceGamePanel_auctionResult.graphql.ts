/**
 * @generated SignedSource<<1729d9812d132726ecdd780d6f6cbdb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceGamePanel_auctionResult$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceResultModal_auctionResult" | "useHammerPriceGame_auctionResult">;
  readonly " $fragmentType": "HammerPriceGamePanel_auctionResult";
};
export type HammerPriceGamePanel_auctionResult$key = {
  readonly " $data"?: HammerPriceGamePanel_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceGamePanel_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HammerPriceGamePanel_auctionResult",
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
      "name": "useHammerPriceGame_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HammerPriceResultModal_auctionResult"
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "38d476bb9d233c96121531203b6dc1b5";

export default node;
