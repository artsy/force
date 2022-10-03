/**
 * @generated SignedSource<<7baa6dffb6a1e7ff6f91db9e5f4b60f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArticleFeatureSectionType = "BASIC" | "FULLSCREEN" | "SPLIT" | "TEXT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleHero_article$data = {
  readonly byline: string | null;
  readonly hero: {
    readonly embed?: string | null;
    readonly image?: {
      readonly split: {
        readonly src: string;
        readonly srcSet: string;
      } | null;
      readonly text: {
        readonly src: string;
        readonly srcSet: string;
      } | null;
      readonly url: string | null;
    } | null;
    readonly layout?: ArticleFeatureSectionType;
    readonly media?: string | null;
  } | null;
  readonly href: string | null;
  readonly title: string | null;
  readonly vertical: string | null;
  readonly " $fragmentType": "ArticleHero_article";
};
export type ArticleHero_article$key = {
  readonly " $data"?: ArticleHero_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleHero_article">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleHero_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
      "name": "vertical",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "byline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "hero",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "layout",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "embed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "media",
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
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                },
                {
                  "alias": "split",
                  "args": [
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
                  "selections": (v0/*: any*/),
                  "storageKey": "resized(width:900)"
                },
                {
                  "alias": "text",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 900
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 1600
                    }
                  ],
                  "concreteType": "CroppedImageUrl",
                  "kind": "LinkedField",
                  "name": "cropped",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": "cropped(height:900,width:1600)"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "ArticleFeatureSection",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "45805b6be826c1703e38be65c93b2225";

export default node;
