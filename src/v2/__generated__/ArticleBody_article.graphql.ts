/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
export type ArticleBody_article = {
    readonly hero: {
        readonly __typename: string;
    } | null;
    readonly seriesArticle: {
        readonly thumbnailTitle: string | null;
        readonly href: string | null;
    } | null;
    readonly vertical: string | null;
    readonly byline: string | null;
    readonly internalID: string;
    readonly slug: string | null;
    readonly layout: ArticleLayout;
    readonly leadParagraph: string | null;
    readonly title: string | null;
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
    readonly " $fragmentRefs": FragmentRefs<"ArticleHero_article" | "ArticleByline_article" | "ArticleSectionAd_article" | "ArticleNewsSource_article">;
    readonly " $refType": "ArticleBody_article";
};
export type ArticleBody_article$data = ArticleBody_article;
export type ArticleBody_article$key = {
    readonly " $data"?: ArticleBody_article$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleBody_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "hero",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "seriesArticle",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "thumbnailTitle",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vertical",
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
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
    (v3/*: any*/),
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": null
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
        (v2/*: any*/),
        (v3/*: any*/),
        (v0/*: any*/),
        (v1/*: any*/),
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
                  "value": 100
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 100
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
              "storageKey": "cropped(height:100,width:100)"
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
      "name": "ArticleHero_article"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleNewsSource_article"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = 'fd9c26b60c08d0ed7a2088d777fbbeba';
export default node;
