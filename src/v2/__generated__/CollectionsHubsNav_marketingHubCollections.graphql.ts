/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubsNav_marketingHubCollections",
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
  "type": "MarketingCollection",
  "abstractKey": null
};
(node as any).hash = '786fb4ee21714400af909abef5fda8ea';
export default node;
