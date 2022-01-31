/**
 * @generated SignedSource<<218b695a52aa9a6f660167098996b169>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesRail_collectionGroup$data = {
  readonly groupType: MarketingGroupTypes;
  readonly name: string;
  readonly members: ReadonlyArray<{
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesEntity_member">;
  }>;
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
