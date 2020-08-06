/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeader_feature = {
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
(node as any).hash = '7472f3ce172d61b360f008173e242725';
export default node;
