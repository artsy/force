/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentArticlesRail_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly articlesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string | null;
                readonly href: string | null;
                readonly " $fragmentRefs": FragmentRefs<"CellArticle_article">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistCurrentArticlesRail_artist";
};
export type ArtistCurrentArticlesRail_artist$data = ArtistCurrentArticlesRail_artist;
export type ArtistCurrentArticlesRail_artist$key = {
    readonly " $data"?: ArtistCurrentArticlesRail_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCurrentArticlesRail_artist">;
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
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCurrentArticlesRail_artist",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "inEditorialFeed",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Article",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellArticle_article"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "articlesConnection(first:10,inEditorialFeed:true,sort:\"PUBLISHED_AT_DESC\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();
(node as any).hash = 'c08088f56451680766023365484066e6';
export default node;
