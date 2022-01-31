/**
 * @generated SignedSource<<ea67a577488ad45ae5e192c8370cab54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowCard_show$data = {
  readonly href: string | null;
  readonly name: string | null;
  readonly isFairBooth: boolean | null;
  readonly exhibitionPeriod: string | null;
  readonly coverImage: {
    readonly medium: {
      readonly width: number;
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly " $fragmentType": "ShowCard_show";
};
export type ShowCard_show$key = {
  readonly " $data"?: ShowCard_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowCard_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowCard_show",
  "selections": [
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFairBooth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": "medium",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 240
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 320
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
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
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
          "storageKey": "cropped(height:240,width:320)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "76ed317dec01eb8714a6602721d25131";

export default node;
