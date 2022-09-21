/**
 * @generated SignedSource<<f1dbc388b07f8b1924846060aaf9ef70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndex_marketPriceInsights$data = {
  readonly demandRank: number | null;
  readonly demandRankDisplayText: string | null;
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
