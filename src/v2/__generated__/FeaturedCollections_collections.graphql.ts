/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeaturedCollections_collections = ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly " $refType": "FeaturedCollections_collections";
}>;
export type FeaturedCollections_collections$data = FeaturedCollections_collections;
export type FeaturedCollections_collections$key = ReadonlyArray<{
    readonly " $data"?: FeaturedCollections_collections$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedCollections_collections">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeaturedCollections_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '720a140afbc9737e088d614b85ca3a31';
export default node;
