/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkArtistMarket_marketPriceInsights = {
    readonly annualLotsSold: number | null;
    readonly annualValueSoldDisplayText: string | null;
    readonly medianSaleOverEstimatePercentage: number | null;
    readonly liquidityRankDisplayText: string | null;
    readonly sellThroughRate: number | null;
    readonly " $refType": "MyCollectionArtworkArtistMarket_marketPriceInsights";
};
export type MyCollectionArtworkArtistMarket_marketPriceInsights$data = MyCollectionArtworkArtistMarket_marketPriceInsights;
export type MyCollectionArtworkArtistMarket_marketPriceInsights$key = {
    readonly " $data"?: MyCollectionArtworkArtistMarket_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkArtistMarket_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkArtistMarket_marketPriceInsights",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "annualLotsSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "annualValueSoldDisplayText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medianSaleOverEstimatePercentage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "liquidityRankDisplayText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sellThroughRate",
      "storageKey": null
    }
  ],
  "type": "ArtworkPriceInsights",
  "abstractKey": null
};
(node as any).hash = 'a11e6122ed5ee14d128ef822cf1fa819';
export default node;
