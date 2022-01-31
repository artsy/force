/**
 * @generated SignedSource<<d0130b1439f283d7f3a64252c4959fe0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubRails_linkedCollections$data = ReadonlyArray<{
  readonly groupType: MarketingGroupTypes;
  readonly " $fragmentSpreads": FragmentRefs<"FeaturedCollectionsRails_collectionGroup" | "OtherCollectionsRail_collectionGroup" | "ArtistSeriesRail_collectionGroup">;
  readonly " $fragmentType": "CollectionsHubRails_linkedCollections";
}>;
export type CollectionsHubRails_linkedCollections$key = ReadonlyArray<{
  readonly " $data"?: CollectionsHubRails_linkedCollections$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubRails_linkedCollections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubRails_linkedCollections",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "groupType",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeaturedCollectionsRails_collectionGroup"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OtherCollectionsRail_collectionGroup"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesRail_collectionGroup"
    }
  ],
  "type": "MarketingCollectionGroup",
  "abstractKey": null
};

(node as any).hash = "a7285e8c4087e97b3282b8c929f612be";

export default node;
