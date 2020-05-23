/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Collect_marketingHubCollections = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"CollectionsHubsNav_marketingHubCollections">;
    readonly " $refType": "Collect_marketingHubCollections";
}>;
export type Collect_marketingHubCollections$data = Collect_marketingHubCollections;
export type Collect_marketingHubCollections$key = ReadonlyArray<{
    readonly " $data"?: Collect_marketingHubCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"Collect_marketingHubCollections">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Collect_marketingHubCollections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_marketingHubCollections",
      "args": null
    }
  ]
};
(node as any).hash = 'd2c8a937457d195a57fd7a72bf2ea361';
export default node;
