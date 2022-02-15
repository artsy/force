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
        readonly description: string | null;
        readonly sponsor: {
            readonly " $fragmentRefs": FragmentRefs<"ArticleSponsor_sponsor">;
        } | null;
    } | null;
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
  "name": "description",
  "storageKey": null
},
v2 = {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    (v1/*: any*/),
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
            (v2/*: any*/)
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
        (v1/*: any*/),
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
        (v2/*: any*/)
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
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = '19bec5e7a262d2410e443300c222c643';
export default node;
