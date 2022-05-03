/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Collect_marketingCollections = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"CollectionsHubsNav_marketingCollections">;
    readonly " $refType": "Collect_marketingCollections";
}>;
export type Collect_marketingCollections$data = Collect_marketingCollections;
export type Collect_marketingCollections$key = ReadonlyArray<{
    readonly " $data"?: Collect_marketingCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"Collect_marketingCollections">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Collect_marketingCollections",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_marketingCollections"
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};
(node as any).hash = '1c038f9b6222b1a517dc8fcb0b1181e4';
export default node;
