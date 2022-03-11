/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
export type ArticleBody_article = {
    readonly internalID: string;
    readonly layout: ArticleLayout;
    readonly leadParagraph: string | null;
    readonly title: string | null;
    readonly newsSource: {
        readonly title: string | null;
        readonly url: string | null;
    } | null;
    readonly href: string | null;
    readonly publishedAt: string | null;
    readonly sections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArticleSection_section">;
    }>;
    readonly postscript: string | null;
    readonly relatedArticles: ReadonlyArray<{
        readonly internalID: string;
        readonly title: string | null;
        readonly href: string | null;
        readonly byline: string | null;
        readonly thumbnailImage: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"ArticleHeader_article" | "ArticleByline_article" | "ArticleSectionAd_article">;
    readonly " $refType": "ArticleBody_article";
};
export type ArticleBody_article$data = ArticleBody_article;
export type ArticleBody_article$key = {
    readonly " $data"?: ArticleBody_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleBody_article",
  "selections": [
    (v0/*: any*/),
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
      "name": "leadParagraph",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleNewsSource",
      "kind": "LinkedField",
      "name": "newsSource",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D, YYYY h:mma"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM D, YYYY h:mma\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "sections",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSection_section"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postscript",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "relatedArticles",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
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
                  "value": 60
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
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
              "storageKey": "cropped(height:60,width:80)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleHeader_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleByline_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSectionAd_article"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = 'b8972497704bd06bd42116f0ba9d79b8';
export default node;
