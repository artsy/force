/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FeaturedCollectionsRails_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly name: string;
    readonly members: ReadonlyArray<{
        readonly slug: string;
        readonly title: string;
        readonly description: string | null;
        readonly price_guidance: number | null;
        readonly thumbnail: string | null;
    }>;
    readonly " $refType": "FeaturedCollectionsRails_collectionGroup";
};
export type FeaturedCollectionsRails_collectionGroup$data = FeaturedCollectionsRails_collectionGroup;
export type FeaturedCollectionsRails_collectionGroup$key = {
    readonly " $data"?: FeaturedCollectionsRails_collectionGroup$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedCollectionsRails_collectionGroup">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeaturedCollectionsRails_collectionGroup",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "description",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "price_guidance",
          "name": "priceGuidance",
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
    }
  ]
};
(node as any).hash = 'dc85cfd2b23294d0d678a66eaf966810';
export default node;
