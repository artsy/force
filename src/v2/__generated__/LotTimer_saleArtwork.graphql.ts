/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LotTimer_saleArtwork = {
    readonly endAt: string | null;
    readonly formattedStartDateTime: string | null;
    readonly extendedBiddingEndAt: string | null;
    readonly sale: {
        readonly startAt: string | null;
        readonly extendedBiddingPeriodMinutes: number | null;
    } | null;
    readonly " $refType": "LotTimer_saleArtwork";
};
export type LotTimer_saleArtwork$data = LotTimer_saleArtwork;
export type LotTimer_saleArtwork$key = {
    readonly " $data"?: LotTimer_saleArtwork$data;
    readonly " $fragmentRefs": FragmentRefs<"LotTimer_saleArtwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LotTimer_saleArtwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedStartDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingEndAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingPeriodMinutes",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleArtwork",
  "abstractKey": null
};
(node as any).hash = '505d5dfcfc9715e2f8fc0c152c68ca43';
export default node;
