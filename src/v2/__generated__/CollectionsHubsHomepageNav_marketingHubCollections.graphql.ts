/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsHomepageNav_marketingHubCollections = ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": "CollectionsHubsHomepageNav_marketingHubCollections";
}>;
export type CollectionsHubsHomepageNav_marketingHubCollections$data = CollectionsHubsHomepageNav_marketingHubCollections;
export type CollectionsHubsHomepageNav_marketingHubCollections$key = ReadonlyArray<{
    readonly " $data"?: CollectionsHubsHomepageNav_marketingHubCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectionsHubsHomepageNav_marketingHubCollections">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubsHomepageNav_marketingHubCollections",
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
(node as any).hash = '34bd7792d5ea1762efa545928881b4b5';
export default node;
