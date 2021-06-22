/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedCategoriesRail_marketingCollections = ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": "HomeFeaturedCategoriesRail_marketingCollections";
}>;
export type HomeFeaturedCategoriesRail_marketingCollections$data = HomeFeaturedCategoriesRail_marketingCollections;
export type HomeFeaturedCategoriesRail_marketingCollections$key = ReadonlyArray<{
    readonly " $data"?: HomeFeaturedCategoriesRail_marketingCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedCategoriesRail_marketingCollections">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "HomeFeaturedCategoriesRail_marketingCollections",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnail",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection"
};
(node as any).hash = 'c7463c911981070e26e7cf97df7063c3';
export default node;
