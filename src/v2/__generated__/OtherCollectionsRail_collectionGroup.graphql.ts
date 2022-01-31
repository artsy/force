/**
 * @generated SignedSource<<f54c7de9822fc7f1b34676c0bc6c8751>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OtherCollectionsRail_collectionGroup$data = {
  readonly groupType: MarketingGroupTypes;
  readonly name: string;
  readonly members: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"OtherCollectionEntity_member">;
  }>;
  readonly " $fragmentType": "OtherCollectionsRail_collectionGroup";
};
export type OtherCollectionsRail_collectionGroup$key = {
  readonly " $data"?: OtherCollectionsRail_collectionGroup$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherCollectionsRail_collectionGroup">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OtherCollectionsRail_collectionGroup",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "OtherCollectionEntity_member"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MarketingCollectionGroup",
  "abstractKey": null
};

(node as any).hash = "6f17d980c261d156126a25c34bacc8d7";

export default node;
