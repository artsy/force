/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderFull_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly fullImage: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "FeatureHeaderFull_feature";
};
export type FeatureHeaderFull_feature$data = FeatureHeaderFull_feature;
export type FeatureHeaderFull_feature$key = {
    readonly " $data"?: FeatureHeaderFull_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeaderFull_feature">;
};



const node: ReaderFragment = {
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1000
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "main",
                "wide"
              ]
            },
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
          "selections": [
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
          ],
          "storageKey": "cropped(height:1000,version:[\"main\",\"wide\"],width:2000)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature"
};
(node as any).hash = 'a0ed66431835bfd38c99fc6a27b0d1b5';
export default node;
