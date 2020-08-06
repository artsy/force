/* tslint:disable */

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
  "kind": "Fragment",
  "name": "CollectionsHubsHomepageNav_marketingHubCollections",
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "thumbnail",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '34bd7792d5ea1762efa545928881b4b5';
export default node;
