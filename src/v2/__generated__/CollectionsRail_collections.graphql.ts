/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsRail_collections = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"CollectionEntity_collection">;
    readonly " $refType": "CollectionsRail_collections";
}>;
export type CollectionsRail_collections$data = CollectionsRail_collections;
export type CollectionsRail_collections$key = ReadonlyArray<{
    readonly " $data"?: CollectionsRail_collections$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectionsRail_collections">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CollectionEntity_collection",
      "args": null
    }
  ]
};
(node as any).hash = '35961dd8c6f3b9ed5fff404b9a586026';
export default node;
