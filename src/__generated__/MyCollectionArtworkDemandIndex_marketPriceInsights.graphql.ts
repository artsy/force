/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndex_marketPriceInsights = {
    readonly demandRank: number | null;
    readonly " $refType": "MyCollectionArtworkDemandIndex_marketPriceInsights";
};
export type MyCollectionArtworkDemandIndex_marketPriceInsights$data = MyCollectionArtworkDemandIndex_marketPriceInsights;
export type MyCollectionArtworkDemandIndex_marketPriceInsights$key = {
    readonly " $data"?: MyCollectionArtworkDemandIndex_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkDemandIndex_marketPriceInsights",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandRank",
      "storageKey": null
    }
  ],
  "type": "ArtworkPriceInsights",
  "abstractKey": null
};
(node as any).hash = '7bba7165aea476b6a5b4a18e63bbc02b';
export default node;
