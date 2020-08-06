/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
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
  "kind": "Fragment",
  "name": "ArtistSeriesRail_collectionGroup",
  "type": "MarketingCollectionGroup",
  "metadata": null,
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
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "members",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "ArtistSeriesEntity_member",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '0a934729123f8c15545a74cfcd58bb55';
export default node;
