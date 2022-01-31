/**
 * @generated SignedSource<<f762706a7877d5538f4bc066a455317b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Collect_marketingHubCollections$data = ReadonlyArray<{
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_marketingHubCollections">;
  readonly " $fragmentType": "Collect_marketingHubCollections";
}>;
export type Collect_marketingHubCollections$key = ReadonlyArray<{
  readonly " $data"?: Collect_marketingHubCollections$data;
  readonly " $fragmentSpreads": FragmentRefs<"Collect_marketingHubCollections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Collect_marketingHubCollections",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_marketingHubCollections"
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "d2c8a937457d195a57fd7a72bf2ea361";

export default node;
