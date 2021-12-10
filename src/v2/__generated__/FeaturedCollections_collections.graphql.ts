/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FeaturedCollections_collections",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};
(node as any).hash = '720a140afbc9737e088d614b85ca3a31';
export default node;
