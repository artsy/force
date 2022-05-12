/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureSetMeta_set = {
    readonly name: string | null;
    readonly description: string | null;
    readonly " $refType": "FeatureSetMeta_set";
};
export type FeatureSetMeta_set$data = FeatureSetMeta_set;
export type FeatureSetMeta_set$key = {
    readonly " $data"?: FeatureSetMeta_set$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSetMeta_set">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSetMeta_set",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
(node as any).hash = 'e1163832a9d3f97595ab010c0dc8ccf5';
export default node;
