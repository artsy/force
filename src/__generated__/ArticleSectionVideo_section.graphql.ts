/**
 * @generated SignedSource<<383f127f76b5cc900ab7e76791b7d04d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionVideo_section$data = {
  readonly embed: string | null | undefined;
  readonly fallbackEmbed: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArticleSectionVideo_section";
};
export type ArticleSectionVideo_section$key = {
  readonly " $data"?: ArticleSectionVideo_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionVideo_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionVideo_section",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "autoPlay",
          "value": true
        }
      ],
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
    },
    {
      "alias": "fallbackEmbed",
      "args": [
        {
          "kind": "Literal",
          "name": "autoPlay",
          "value": false
        }
      ],
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:false)"
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
              "value": 512
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 910
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
          "storageKey": "cropped(height:512,width:910)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionVideo",
  "abstractKey": null
};

(node as any).hash = "efd503a2f10aa94d7d0d86d131a47e4f";

export default node;
