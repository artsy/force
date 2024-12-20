/**
 * @generated SignedSource<<f1a69395aa20ed28766347a7135c7bd5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndex_marketPriceInsights$data = {
  readonly demandRank: number | null | undefined;
  readonly demandRankDisplayText: string | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkDemandIndex_marketPriceInsights";
};
export type MyCollectionArtworkDemandIndex_marketPriceInsights$key = {
  readonly " $data"?: MyCollectionArtworkDemandIndex_marketPriceInsights$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkDemandIndex_marketPriceInsights">;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandRankDisplayText",
      "storageKey": null
    }
  ],
  "type": "ArtworkPriceInsights",
  "abstractKey": null
};

(node as any).hash = "1cb6564f208a9bd47cb71303887223fb";

export default node;
