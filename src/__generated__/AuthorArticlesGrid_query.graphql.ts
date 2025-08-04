/**
 * @generated SignedSource<<dd2fa98a2dd67f3bd02cfa98e4920bdc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorArticlesGrid_query$data = {
  readonly author: {
    readonly articlesConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly byline: string | null | undefined;
          readonly href: string | null | undefined;
          readonly internalID: string;
          readonly publishedAt: string | null | undefined;
          readonly thumbnailImage: {
            readonly large: {
              readonly src: string;
              readonly srcSet: string;
            } | null | undefined;
          } | null | undefined;
          readonly thumbnailTitle: string | null | undefined;
          readonly title: string | null | undefined;
          readonly vertical: string | null | undefined;
          readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "AuthorArticlesGrid_query";
};
export type AuthorArticlesGrid_query$key = {
  readonly " $data"?: AuthorArticlesGrid_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuthorArticlesGrid_query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "author",
  "articlesConnection"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./AuthorArticlesGridPaginationQuery.graphql')
    }
  },
  "name": "AuthorArticlesGrid_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "Author",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        {
          "alias": "articlesConnection",
          "args": null,
          "concreteType": "AuthorArticlesConnectionConnection",
          "kind": "LinkedField",
          "name": "__AuthorArticlesGrid_articlesConnection_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AuthorArticlesConnectionEdge",
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
                      "name": "CellArticle_article"
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
                      "name": "href",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "vertical",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "thumbnailTitle",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "byline",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "MMM D, YYYY"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "publishedAt",
                      "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
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
                          "alias": "large",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "height",
                              "value": 600
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 600
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
                          "storageKey": "cropped(height:600,width:600)"
                        }
                      ],
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "20e73fd64853f4c502aac64d98c31c25";

export default node;
