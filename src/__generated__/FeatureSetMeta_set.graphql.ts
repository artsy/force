/**
 * @generated SignedSource<<bd9cba104a8d445f99884ced4265e3d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureSetMeta_set$data = {
  readonly description: string | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "FeatureSetMeta_set";
};
export type FeatureSetMeta_set$key = {
  readonly " $data"?: FeatureSetMeta_set$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSetMeta_set">;
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

(node as any).hash = "e1163832a9d3f97595ab010c0dc8ccf5";

export default node;
