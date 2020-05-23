/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubRails_linkedCollections = ReadonlyArray<{
    readonly groupType: MarketingGroupTypes;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedCollectionsRails_collectionGroup" | "OtherCollectionsRail_collectionGroup" | "ArtistSeriesRail_collectionGroup">;
    readonly " $refType": "CollectionsHubRails_linkedCollections";
}>;
export type CollectionsHubRails_linkedCollections$data = CollectionsHubRails_linkedCollections;
export type CollectionsHubRails_linkedCollections$key = ReadonlyArray<{
    readonly " $data"?: CollectionsHubRails_linkedCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectionsHubRails_linkedCollections">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubRails_linkedCollections",
  "type": "MarketingCollectionGroup",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "groupType",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeaturedCollectionsRails_collectionGroup",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OtherCollectionsRail_collectionGroup",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistSeriesRail_collectionGroup",
      "args": null
    }
  ]
};
(node as any).hash = 'a7285e8c4087e97b3282b8c929f612be';
export default node;
