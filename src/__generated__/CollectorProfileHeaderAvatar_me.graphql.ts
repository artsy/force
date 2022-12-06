/**
 * @generated SignedSource<<d658ac8e5573c4be628a16c1eb3ceb01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileHeaderAvatar_me$data = {
  readonly icon: {
    readonly resized: {
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly " $fragmentType": "CollectorProfileHeaderAvatar_me";
};
export type CollectorProfileHeaderAvatar_me$key = {
  readonly " $data"?: CollectorProfileHeaderAvatar_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileHeaderAvatar_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "icon",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 200
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "large_square"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 200
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
          "storageKey": "resized(height:200,version:\"large_square\",width:200)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "777de0a43fbb7dbe7144ed6ba8e56774";

export default node;
