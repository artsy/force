/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeader_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "FeatureHeader_feature";
};
export type FeatureHeader_feature$data = FeatureHeader_feature;
export type FeatureHeader_feature$key = {
    readonly " $data"?: FeatureHeader_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeader_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureHeader_feature",
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
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:2000,version:\"source\",width:2000)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 2000
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "source"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 2000
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '4fad4b2f3161c349788d91adc1fc72b3';
export default node;
