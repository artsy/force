/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderDefault_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly defaultImage: {
        readonly cropped: {
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



const node: ReaderFragment = {
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
              "value": 1000
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
          "storageKey": "cropped(height:1000,version:[\"main\",\"wide\"],width:1000)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature"
};
(node as any).hash = 'b3ff61ea3188221e7aafd5f2fec95544';
export default node;
