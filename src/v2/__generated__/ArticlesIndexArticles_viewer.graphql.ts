/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticlesIndexArticles_viewer = {
    readonly articlesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ArticlesIndexArticle_article">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArticlesIndexArticles_viewer";
};
export type ArticlesIndexArticles_viewer$data = ArticlesIndexArticles_viewer;
export type ArticlesIndexArticles_viewer$key = {
    readonly " $data"?: ArticlesIndexArticles_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticlesIndexArticles_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": "after",
        "direction": "forward",
        "path": [
          "articlesConnection"
        ]
      }
    ]
  },
  "name": "ArticlesIndexArticles_viewer",
  "selections": [
    {
      "alias": "articlesConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "featured",
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
      "name": "__ArticlesIndexArticles_articlesConnection_connection",
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
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArticlesIndexArticle_article"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__ArticlesIndexArticles_articlesConnection_connection(featured:true,sort:\"PUBLISHED_AT_DESC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'fc09df8765785f4d0d08b5e79341262f';
export default node;
