/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderDefault_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly defaultImage: {
        readonly _1x: {
            readonly url: string | null;
        } | null;
        readonly _2x: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "FeatureHeaderDefault_feature";
};
export type FeatureHeaderDefault_feature$data = FeatureHeaderDefault_feature;
export type FeatureHeaderDefault_feature$key = {
    readonly " $data"?: FeatureHeaderDefault_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeaderDefault_feature">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide"
  ]
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureHeaderDefault_feature",
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
      "name": "subheadline",
      "storageKey": "subheadline(format:\"HTML\")"
    },
    {
      "alias": "defaultImage",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1000
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1000
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:1000,version:[\"main\",\"wide\"],width:1000)"
        },
        {
          "alias": "_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 2000
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 2000
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:2000,version:[\"main\",\"wide\"],width:2000)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature"
};
})();
(node as any).hash = 'daec947183f26d5bcbf0d3a5039d8a5b';
export default node;
