/**
 * @generated SignedSource<<ea0014bee6728d6a95753dc7fc63ebdb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureHeaderFull_feature$data = {
  readonly fullImage: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly name: string;
  readonly subheadline: string | null | undefined;
  readonly " $fragmentType": "FeatureHeaderFull_feature";
};
export type FeatureHeaderFull_feature$key = {
  readonly " $data"?: FeatureHeaderFull_feature$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureHeaderFull_feature">;
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
              "name": "version",
              "value": [
                "main",
                "source",
                "wide"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"main\",\"source\",\"wide\"])"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature",
  "abstractKey": null
};

(node as any).hash = "0876fec950c4df28305c8b38ad5aab60";

export default node;
