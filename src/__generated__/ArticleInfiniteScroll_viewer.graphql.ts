/**
 * @generated SignedSource<<7013e6489f4b50d16fc936f1dd5eaf65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleInfiniteScroll_viewer$data = {
  readonly articlesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArticleBody_article" | "ArticleVisibilityMetadata_article">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArticleInfiniteScroll_viewer";
};
export type ArticleInfiniteScroll_viewer$key = {
  readonly " $data"?: ArticleInfiniteScroll_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleInfiniteScroll_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "articleID"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "channelID"
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
  "name": "ArticleInfiniteScroll_viewer",
  "selections": [
    {
      "alias": "articlesConnection",
      "args": [
        {
          "kind": "Variable",
          "name": "channelId",
          "variableName": "channelID"
        },
        {
          "kind": "Literal",
          "name": "layout",
          "value": "STANDARD"
        },
        {
          "items": [
            {
              "kind": "Variable",
              "name": "omit.0",
              "variableName": "articleID"
            }
          ],
          "kind": "ListValue",
          "name": "omit"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "__ArticleInfiniteScroll_articlesConnection_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArticleBody_article"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArticleVisibilityMetadata_article"
                },
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
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "f94d6c9ff0c5a891b18ae7e978788f7e";

export default node;
