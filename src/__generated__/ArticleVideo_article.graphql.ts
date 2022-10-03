/**
 * @generated SignedSource<<80d515293e6946bf96f6311da5510199>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVideo_article$data = {
  readonly description: string | null;
  readonly href: string | null;
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
  readonly moreRelatedArticles: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSeriesItem_article">;
  }>;
  readonly seriesArticle: {
    readonly description: string | null;
    readonly href: string | null;
    readonly sponsor: {
      readonly " $fragmentSpreads": FragmentRefs<"ArticleSponsor_sponsor">;
    } | null;
    readonly title: string | null;
  } | null;
  readonly title: string | null;
  readonly vertical: string | null;
  readonly " $fragmentType": "ArticleVideo_article";
};
export type ArticleVideo_article$key = {
  readonly " $data"?: ArticleVideo_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleVideo_article">;
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vertical",
      "storageKey": null
    },
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
      "alias": "moreRelatedArticles",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSeriesItem_article"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": "relatedArticles(size:4)"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "f2619340e6e8033695245026b3b0de16";

export default node;
