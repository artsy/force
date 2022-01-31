/**
 * @generated SignedSource<<57638f02d4007813c12f8d2645c40bc5>>
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
  readonly layout: ArticleLayout;
  readonly title: string | null;
  readonly newsSource: {
    readonly title: string | null;
    readonly url: string | null;
  } | null;
  readonly href: string | null;
  readonly publishedAt: string | null;
  readonly sections: ReadonlyArray<{
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionText_section" | "ArticleSectionImageCollection_section" | "ArticleSectionImageSet_section" | "ArticleSectionVideo_section" | "ArticleSectionSocialEmbed_section" | "ArticleSectionEmbed_section">;
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
  readonly " $fragmentSpreads": FragmentRefs<"ArticleHeader_article" | "ArticleByline_article">;
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
  "name": "title",
  "storageKey": null
},
v1 = {
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleNewsSource",
      "kind": "LinkedField",
      "name": "newsSource",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
    (v1/*: any*/),
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionText_section"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionImageCollection_section"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionImageSet_section"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionVideo_section"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionSocialEmbed_section"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionEmbed_section"
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
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
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "2bed116448c476603b7eccbf3bdb2cda";

export default node;
