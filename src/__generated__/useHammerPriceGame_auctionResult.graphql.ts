/**
 * @generated SignedSource<<bedf5551d2a9855976204ca5c6971eec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useHammerPriceGame_auctionResult$data = {
  readonly internalID: string;
  readonly priceRealized: {
    readonly centsUSD: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useHammerPriceGame_auctionResult";
};
export type useHammerPriceGame_auctionResult$key = {
  readonly " $data"?: useHammerPriceGame_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"useHammerPriceGame_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useHammerPriceGame_auctionResult",
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
      "concreteType": "AuctionResultPriceRealized",
      "kind": "LinkedField",
      "name": "priceRealized",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "centsUSD",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "ae4c709283db7cb9b284820ac3aec35c";

export default node;
