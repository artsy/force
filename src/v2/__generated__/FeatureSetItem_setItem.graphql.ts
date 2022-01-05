/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureSetItem_setItem = {
    readonly __typename: string;
    readonly id?: string;
    readonly " $fragmentRefs": FragmentRefs<"GridItem_artwork" | "FeatureFeaturedLink_featuredLink">;
    readonly " $refType": "FeatureSetItem_setItem";
};
export type FeatureSetItem_setItem$data = FeatureSetItem_setItem;
export type FeatureSetItem_setItem$key = {
    readonly " $data"?: FeatureSetItem_setItem$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSetItem_setItem">;
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
      "type": "FeaturedLink"
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Artwork"
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
    }
  ],
  "type": "OrderedSetItem"
};
})();
(node as any).hash = '9181810fe57734f6a1198ccec3ae7114';
export default node;
