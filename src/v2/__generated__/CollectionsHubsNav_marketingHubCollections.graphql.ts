/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNav_marketingHubCollections = ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": "CollectionsHubsNav_marketingHubCollections";
}>;
export type CollectionsHubsNav_marketingHubCollections$data = CollectionsHubsNav_marketingHubCollections;
export type CollectionsHubsNav_marketingHubCollections$key = ReadonlyArray<{
    readonly " $data"?: CollectionsHubsNav_marketingHubCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectionsHubsNav_marketingHubCollections">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubsNav_marketingHubCollections",
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
(node as any).hash = '786fb4ee21714400af909abef5fda8ea';
export default node;
