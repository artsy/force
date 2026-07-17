/**
 * @generated SignedSource<<c5044a24bdad1c89ad6a7e6c600b1946>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceResultModal_auctionResult$data = {
  readonly artist: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly currency: string | null | undefined;
  readonly dateText: string | null | undefined;
  readonly internalID: string;
  readonly priceRealized: {
    readonly display: string | null | undefined;
    readonly displayUSD: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "HammerPriceResultModal_auctionResult";
};
export type HammerPriceResultModal_auctionResult$key = {
  readonly " $data"?: HammerPriceResultModal_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceResultModal_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HammerPriceResultModal_auctionResult",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
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
          "name": "display",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayUSD",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "74f6351526a9aef54a77cf33c678ac03";

export default node;
