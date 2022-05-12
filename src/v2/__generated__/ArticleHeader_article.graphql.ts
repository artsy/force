/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleFeatureSectionType = "BASIC" | "FULLSCREEN" | "SPLIT" | "TEXT" | "%future added value";
export type ArticleHeader_article = {
    readonly title: string | null;
    readonly href: string | null;
    readonly vertical: string | null;
    readonly byline: string | null;
    readonly hero: {
        readonly layout?: ArticleFeatureSectionType | undefined;
        readonly embed?: string | null | undefined;
        readonly media?: string | null | undefined;
        readonly image?: {
            readonly url: string | null;
            readonly split: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
            readonly text: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null | undefined;
    } | null;
    readonly " $refType": "ArticleHeader_article";
};
export type ArticleHeader_article$data = ArticleHeader_article;
export type ArticleHeader_article$key = {
    readonly " $data"?: ArticleHeader_article$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticleHeader_article">;
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
  "name": "ArticleHeader_article",
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
(node as any).hash = '94261789d0d9e4966edcbe6cbac8b65f';
export default node;
