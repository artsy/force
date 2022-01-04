/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
export type FeaturedCollectionsRails_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly name: string;
    readonly members: ReadonlyArray<{
        readonly id: string;
        readonly slug: string;
        readonly title: string;
        readonly description: string | null;
        readonly priceGuidance: number | null;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeaturedCollectionsRails_collectionGroup",
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
          "name": "id",
          "storageKey": null
        },
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
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "priceGuidance",
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
      "storageKey": null
    }
  ],
  "type": "MarketingCollectionGroup"
};
(node as any).hash = 'b2af7ee18d4fa1d6393ffea8d8050e51';
export default node;
