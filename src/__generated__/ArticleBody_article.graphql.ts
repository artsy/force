/**
 * @generated SignedSource<<b170210da8c3894becd8930be4135283>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleBody_article$data = {
  readonly byline: string | null | undefined;
  readonly hero: {
    readonly __typename: string;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly layout: ArticleLayout;
  readonly leadParagraph: string | null | undefined;
  readonly postscript: string | null | undefined;
  readonly publishedAt: string | null | undefined;
  readonly relatedArticles: ReadonlyArray<{
    readonly byline: string | null | undefined;
    readonly href: string | null | undefined;
    readonly internalID: string;
    readonly thumbnailImage: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly title: string | null | undefined;
  }>;
  readonly sections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSection_section">;
  }>;
  readonly seriesArticle: {
    readonly href: string | null | undefined;
    readonly thumbnailTitle: string | null | undefined;
  } | null | undefined;
  readonly slug: string | null | undefined;
  readonly title: string | null | undefined;
  readonly vertical: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleByline_article" | "ArticleHero_article" | "ArticleNewsSource_article" | "ArticleSectionAd_article">;
  readonly " $fragmentType": "ArticleBody_article";
};
export type ArticleBody_article$key = {
  readonly " $data"?: ArticleBody_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleBody_article">;
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
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "fd9c26b60c08d0ed7a2088d777fbbeba";

export default node;
