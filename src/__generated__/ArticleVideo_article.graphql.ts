/**
 * @generated SignedSource<<16b49ec4875e75da49fddf8dc9087987>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVideo_article$data = {
  readonly description: string | null | undefined;
  readonly href: string | null | undefined;
  readonly media: {
    readonly coverImage: {
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly credits: string | null | undefined;
    readonly description: string | null | undefined;
    readonly duration: string | null | undefined;
    readonly releaseDate: string | null | undefined;
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly moreRelatedArticles: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSeriesItem_article">;
  }>;
  readonly seriesArticle: {
    readonly description: string | null | undefined;
    readonly href: string | null | undefined;
    readonly sponsor: {
      readonly " $fragmentSpreads": FragmentRefs<"ArticleSponsor_sponsor">;
    } | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly vertical: string | null | undefined;
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
