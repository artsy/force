/**
 * @generated SignedSource<<c01d92b7a5135e37045d23f737d5b9c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LotInfo_saleArtwork$data = {
  readonly counts: {
    readonly bidderPositions: Int | null;
  } | null;
  readonly lotLabel: string | null;
  readonly currentBid: {
    readonly display: string | null;
  } | null;
  readonly " $fragmentType": "LotInfo_saleArtwork";
};
export type LotInfo_saleArtwork$key = {
  readonly " $data"?: LotInfo_saleArtwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"LotInfo_saleArtwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LotInfo_saleArtwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bidderPositions",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkCurrentBid",
      "kind": "LinkedField",
      "name": "currentBid",
      "plural": false,
      "selections": [
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
  "type": "SaleArtwork",
  "abstractKey": null
};

(node as any).hash = "00087830b5b89b40ca14bb55d7e163d9";

export default node;
