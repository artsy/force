/**
 * @generated SignedSource<<2f7b1c83ff83d2db07befc1a1a12c3e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionVideo_section$data = {
  readonly aspectRatio: number;
  readonly embed: string | null | undefined;
  readonly fallbackEmbed: string | null | undefined;
  readonly image: {
    readonly resized: {
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

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "autoPlay",
    "value": true
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionVideo_section",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "aspectRatio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
    },
    {
      "alias": "fallbackEmbed",
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
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
              "name": "width",
              "value": 910
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
          "storageKey": "resized(width:910)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionVideo",
  "abstractKey": null
};
})();

(node as any).hash = "cf74a0dc2a13dd40494cfd60ecad0301";

export default node;
