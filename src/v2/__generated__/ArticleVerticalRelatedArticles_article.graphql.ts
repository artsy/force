/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleVerticalRelatedArticles_article = {
    readonly vertical: string | null;
    readonly verticalRelatedArticles: ReadonlyArray<{
        readonly vertical: string | null;
        readonly internalID: string;
        readonly title: string | null;
        readonly byline: string | null;
        readonly href: string | null;
        readonly publishedAt: string | null;
        readonly thumbnailImage: {
            readonly cropped: {
                readonly width: number;
                readonly height: number;
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    }>;
    readonly " $refType": "ArticleVerticalRelatedArticles_article";
};
export type ArticleVerticalRelatedArticles_article$data = ArticleVerticalRelatedArticles_article;
export type ArticleVerticalRelatedArticles_article$key = {
    readonly " $data"?: ArticleVerticalRelatedArticles_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleVerticalRelatedArticles_article">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vertical",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleVerticalRelatedArticles_article",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "verticalRelatedArticles",
      "args": [
        {
          "kind": "Literal",
          "name": "inVertical",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 8
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "relatedArticles",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
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
          "name": "byline",
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
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM D, YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "publishedAt",
          "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "thumbnailImage",
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
                  "name": "width",
                  "value": 300
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
              "storageKey": "cropped(height:200,width:300)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "relatedArticles(inVertical:true,size:8)"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = 'e4a8badf3c5a59f68d1adb84d02e6bcf';
export default node;
