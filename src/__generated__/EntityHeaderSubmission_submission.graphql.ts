/**
 * @generated SignedSource<<816f87748a4c25e82c4358cb428f3433>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderSubmission_submission$data = {
  readonly artist: {
    readonly avatar: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "EntityHeaderSubmission_submission";
};
export type EntityHeaderSubmission_submission$key = {
  readonly " $data"?: EntityHeaderSubmission_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderSubmission_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityHeaderSubmission_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": "avatar",
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
                  "value": 45
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "big_and_tall",
                    "tall"
                  ]
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 45
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
              "storageKey": "cropped(height:45,version:[\"big_and_tall\",\"tall\"],width:45)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "9807f5e2cc9ab8f6a273e20e72bfd977";

export default node;
