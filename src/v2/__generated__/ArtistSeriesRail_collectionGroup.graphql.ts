/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
export type ArtistSeriesRail_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly name: string;
    readonly members: ReadonlyArray<{
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesEntity_member">;
    }>;
    readonly " $refType": "ArtistSeriesRail_collectionGroup";
};
export type ArtistSeriesRail_collectionGroup$data = ArtistSeriesRail_collectionGroup;
export type ArtistSeriesRail_collectionGroup$key = {
    readonly " $data"?: ArtistSeriesRail_collectionGroup$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesRail_collectionGroup">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesRail_collectionGroup",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "groupType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "members",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistSeriesEntity_member"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MarketingCollectionGroup"
};
(node as any).hash = '0a934729123f8c15545a74cfcd58bb55';
export default node;
