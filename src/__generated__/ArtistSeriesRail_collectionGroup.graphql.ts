/**
 * @generated SignedSource<<0cb74da902a0784e11c6afe29b440564>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MarketingCollectionGroupTypeEnum = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesRail_collectionGroup$data = {
  readonly groupType: MarketingCollectionGroupTypeEnum;
  readonly members: ReadonlyArray<{
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesEntity_member">;
  }>;
  readonly name: string;
  readonly " $fragmentType": "ArtistSeriesRail_collectionGroup";
};
export type ArtistSeriesRail_collectionGroup$key = {
  readonly " $data"?: ArtistSeriesRail_collectionGroup$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesRail_collectionGroup">;
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
  "type": "MarketingCollectionGroup",
  "abstractKey": null
};

(node as any).hash = "0a934729123f8c15545a74cfcd58bb55";

export default node;
