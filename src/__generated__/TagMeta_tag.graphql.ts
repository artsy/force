/**
 * @generated SignedSource<<a0f486c560e475003d5132d03f46d977>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TagMeta_tag$data = {
  readonly description: string | null | undefined;
  readonly href: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly src: string;
    } | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "TagMeta_tag";
};
export type TagMeta_tag$key = {
  readonly " $data"?: TagMeta_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"TagMeta_tag">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TagMeta_tag",
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
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
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
              "value": 630
            },
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
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:630,width:1200)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Tag",
  "abstractKey": null
};

(node as any).hash = "53a26b071d0f846a03e777e5500d7302";

export default node;
