/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type FeatureLayouts = "DEFAULT" | "FULL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeader_feature = {
    readonly layout: FeatureLayouts;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeaderDefault_feature" | "FeatureHeaderFull_feature">;
    readonly " $refType": "FeatureHeader_feature";
};
export type FeatureHeader_feature$data = FeatureHeader_feature;
export type FeatureHeader_feature$key = {
    readonly " $data"?: FeatureHeader_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeader_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureHeader_feature",
  "type": "Feature",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "layout",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureHeaderDefault_feature",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureHeaderFull_feature",
      "args": null
    }
  ]
};
(node as any).hash = '410eddfc25f11a9687c26ed516418f0e';
export default node;
