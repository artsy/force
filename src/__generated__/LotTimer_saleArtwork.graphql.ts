/**
 * @generated SignedSource<<1d09ac14c5178f4775c55dd23fa51880>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LotTimer_saleArtwork$data = {
  readonly endAt: string | null;
  readonly extendedBiddingEndAt: string | null;
  readonly formattedStartDateTime: string | null;
  readonly lotID: string | null;
  readonly sale: {
    readonly extendedBiddingIntervalMinutes: number | null;
    readonly extendedBiddingPeriodMinutes: number | null;
    readonly internalID: string;
    readonly startAt: string | null;
  } | null;
  readonly " $fragmentType": "LotTimer_saleArtwork";
};
export type LotTimer_saleArtwork$key = {
  readonly " $data"?: LotTimer_saleArtwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"LotTimer_saleArtwork">;
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
      "kind": "ScalarField",
      "name": "lotID",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingIntervalMinutes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleArtwork",
  "abstractKey": null
};

(node as any).hash = "55716d023ef3ebdf22143acc9c455550";

export default node;
