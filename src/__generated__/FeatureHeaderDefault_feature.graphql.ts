/**
 * @generated SignedSource<<14e768d3b45442a0c2fa7ded743ca0c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderDefault_feature$data = {
  readonly defaultImage: {
    readonly resized: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly name: string;
  readonly subheadline: string | null | undefined;
  readonly " $fragmentType": "FeatureHeaderDefault_feature";
};
export type FeatureHeaderDefault_feature$key = {
  readonly " $data"?: FeatureHeaderDefault_feature$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureHeaderDefault_feature">;
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
              "name": "version",
              "value": [
                "main",
                "source",
                "wide"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 900
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
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
          "storageKey": "resized(version:[\"main\",\"source\",\"wide\"],width:900)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature",
  "abstractKey": null
};

(node as any).hash = "abe5d39046032e80df6448aa870bf929";

export default node;
