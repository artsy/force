/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderFull_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly fullImage: {
        readonly _1x: {
            readonly url: string | null;
        } | null;
        readonly _2x: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "FeatureHeaderFull_feature";
};
export type FeatureHeaderFull_feature$data = FeatureHeaderFull_feature;
export type FeatureHeaderFull_feature$key = {
    readonly " $data"?: FeatureHeaderFull_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeaderFull_feature">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "source"
  ]
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "FeatureHeaderFull_feature",
  "type": "Feature",
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
      "name": "subheadline",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "storageKey": "subheadline(format:\"HTML\")"
    },
    {
      "kind": "LinkedField",
      "alias": "fullImage",
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "_1x",
          "name": "cropped",
          "storageKey": "cropped(height:1000,version:[\"source\"],width:2000)",
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
              "value": 2000
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": "_2x",
          "name": "cropped",
          "storageKey": "cropped(height:2000,version:[\"source\"],width:4000)",
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
              "value": 4000
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": (v1/*: any*/)
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'c6db612daad6b6c7ff0fdc2ee7b9b07d';
export default node;
