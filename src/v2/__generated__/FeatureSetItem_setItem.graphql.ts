/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "FeatureSetItem_setItem",
  "type": "OrderedSetItem",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "type": "FeaturedLink",
      "selections": (v0/*: any*/)
    },
    {
      "kind": "InlineFragment",
      "type": "Artwork",
      "selections": (v0/*: any*/)
    },
    {
      "kind": "FragmentSpread",
      "name": "GridItem_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureFeaturedLink_featuredLink",
      "args": null
    }
  ]
};
})();
(node as any).hash = '9181810fe57734f6a1198ccec3ae7114';
export default node;
