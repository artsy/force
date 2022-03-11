/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleVideo_article = {
    readonly title: string | null;
    readonly href: string | null;
    readonly description: string | null;
    readonly media: {
        readonly coverImage: {
            readonly url: string | null;
        } | null;
        readonly credits: string | null;
        readonly description: string | null;
        readonly duration: string | null;
        readonly releaseDate: string | null;
        readonly url: string | null;
    } | null;
    readonly seriesArticle: {
        readonly title: string | null;
        readonly href: string | null;
        readonly description: string | null;
        readonly sponsor: {
            readonly " $fragmentRefs": FragmentRefs<"ArticleSponsor_sponsor">;
        } | null;
    } | null;
    readonly seriesRelatedArticles: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ArticleSeriesItem_article">;
    }>;
    readonly " $refType": "ArticleVideo_article";
};
export type ArticleVideo_article$data = ArticleVideo_article;
export type ArticleVideo_article$key = {
    readonly " $data"?: ArticleVideo_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleVideo_article">;
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
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleVideo_article",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleMedia",
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "coverImage",
          "plural": false,
          "selections": [
            (v3/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credits",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "duration",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM DD, YYYY h:mma"
            }
          ],
          "kind": "ScalarField",
          "name": "releaseDate",
          "storageKey": "releaseDate(format:\"MMM DD, YYYY h:mma\")"
        },
        (v3/*: any*/)
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
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleSponsor",
          "kind": "LinkedField",
          "name": "sponsor",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArticleSponsor_sponsor"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "seriesRelatedArticles",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 4
        }
      ],
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSeriesItem_article"
        }
      ],
      "storageKey": "relatedArticles(size:4)"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = '714e0e70baadb156d93d4b2fc5dc6de4';
export default node;
