/**
 * @generated SignedSource<<6efc3fc65066d833b18313013578ac61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderFull_feature$data = {
  readonly name: string;
  readonly subheadline: string | null;
  readonly fullImage: {
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
  readonly " $fragmentType": "FeatureHeaderFull_feature";
};
export type FeatureHeaderFull_feature$key = {
  readonly " $data"?: FeatureHeaderFull_feature$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureHeaderFull_feature">;
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
  "name": "FeatureHeaderFull_feature",
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
      "alias": "fullImage",
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
              "value": 800
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:400,version:[\"main\",\"wide\"],width:800)"
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
              "value": 1200
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:600,version:[\"main\",\"wide\"],width:1200)"
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
              "value": 2000
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:1000,version:[\"main\",\"wide\"],width:2000)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature",
  "abstractKey": null
};
})();

(node as any).hash = "dc3fc182dd2ed03d4af33ac63d0b50e2";

export default node;
