/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderDefault_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly defaultImage: {
        readonly sm: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly md: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly lg: {
            readonly src: string;
            readonly srcSet: string;
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
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
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
          "alias": "sm",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 400
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 400
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:400,version:[\"main\",\"wide\"],width:400)"
        },
        {
          "alias": "md",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 600
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 600
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:600,version:[\"main\",\"wide\"],width:600)"
        },
        {
          "alias": "lg",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature"
};
})();
(node as any).hash = '588199148f1e426283021a9e9f40a168';
export default node;
