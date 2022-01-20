/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LotInfo_saleArtwork = {
    readonly counts: {
        readonly bidderPositions: number | null;
    } | null;
    readonly lotLabel: string | null;
    readonly currentBid: {
        readonly display: string | null;
    } | null;
    readonly " $refType": "LotInfo_saleArtwork";
};
export type LotInfo_saleArtwork$data = LotInfo_saleArtwork;
export type LotInfo_saleArtwork$key = {
    readonly " $data"?: LotInfo_saleArtwork$data;
    readonly " $fragmentRefs": FragmentRefs<"LotInfo_saleArtwork">;
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
(node as any).hash = '00087830b5b89b40ca14bb55d7e163d9';
export default node;
