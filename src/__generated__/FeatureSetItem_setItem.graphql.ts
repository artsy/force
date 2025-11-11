/**
 * @generated SignedSource<<b5fed0fa9ec8b9cb512daa2ab2239a7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureSetItem_setItem$data = {
  readonly __typename: string;
  readonly id?: string;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureFeaturedLink_featuredLink" | "FeatureSetVideo_video" | "GridItem_artwork">;
  readonly " $fragmentType": "FeatureSetItem_setItem";
};
export type FeatureSetItem_setItem$key = {
  readonly " $data"?: FeatureSetItem_setItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSetItem_setItem">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSetItem_setItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "FeaturedLink",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Artwork",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Video",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GridItem_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureFeaturedLink_featuredLink"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureSetVideo_video"
    }
  ],
  "type": "OrderedSetItem",
  "abstractKey": "__isOrderedSetItem"
};
})();

(node as any).hash = "5b0202f7bda0088ea348911e564342c3";

export default node;
