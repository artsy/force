/**
 * @generated SignedSource<<3b3c44c98838d030e4b29582434a7eae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_feature$data = {
  readonly callout: string | null | undefined;
  readonly description: string | null | undefined;
  readonly sets: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"FeatureSet_set">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureHeader_feature" | "FeatureMeta_feature">;
  readonly " $fragmentType": "FeatureApp_feature";
};
export type FeatureApp_feature$key = {
  readonly " $data"?: FeatureApp_feature$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureApp_feature">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureApp_feature",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureMeta_feature"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureHeader_feature"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "callout",
      "storageKey": "callout(format:\"HTML\")"
    },
    {
      "alias": "sets",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "OrderedSetConnection",
      "kind": "LinkedField",
      "name": "setsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "OrderedSetEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "OrderedSet",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FeatureSet_set"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "setsConnection(first:20)"
    }
  ],
  "type": "Feature",
  "abstractKey": null
};
})();

(node as any).hash = "a03892745f198465e63df7420b7e1d3d";

export default node;
