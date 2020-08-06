/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureSetMeta_set = {
    readonly name: string | null;
    readonly description: string | null;
    readonly " $refType": "FeatureSetMeta_set";
};
export type FeatureSetMeta_set$data = FeatureSetMeta_set;
export type FeatureSetMeta_set$key = {
    readonly " $data"?: FeatureSetMeta_set$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSetMeta_set">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureSetMeta_set",
  "type": "OrderedSet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "storageKey": "description(format:\"HTML\")"
    }
  ]
};
(node as any).hash = 'e1163832a9d3f97595ab010c0dc8ccf5';
export default node;
