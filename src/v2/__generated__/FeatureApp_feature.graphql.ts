/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_feature = {
    readonly description: string | null;
    readonly callout: string | null;
    readonly sets: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"FeatureSet_set">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FeatureMeta_feature" | "FeatureHeader_feature">;
    readonly " $refType": "FeatureApp_feature";
};
export type FeatureApp_feature$data = FeatureApp_feature;
export type FeatureApp_feature$key = {
    readonly " $data"?: FeatureApp_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureApp_feature">;
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
  "kind": "Fragment",
  "name": "FeatureApp_feature",
  "type": "Feature",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": (v0/*: any*/),
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "callout",
      "args": (v0/*: any*/),
      "storageKey": "callout(format:\"HTML\")"
    },
    {
      "kind": "LinkedField",
      "alias": "sets",
      "name": "setsConnection",
      "storageKey": "setsConnection(first:20)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "OrderedSetConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OrderedSetEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "OrderedSet",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "FeatureSet_set",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureMeta_feature",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureHeader_feature",
      "args": null
    }
  ]
};
})();
(node as any).hash = 'a03892745f198465e63df7420b7e1d3d';
export default node;
