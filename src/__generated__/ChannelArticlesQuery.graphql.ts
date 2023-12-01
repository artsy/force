/**
 * @generated SignedSource<<63c156728759dd2b0e44280c3d616f9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChannelArticlesQuery$variables = {
  after?: string | null | undefined;
  id: string;
};
export type ChannelArticlesQuery$data = {
  readonly channel: {
    readonly " $fragmentSpreads": FragmentRefs<"ChannelArticles_channel">;
  };
};
export type ChannelArticlesQuery = {
  response: ChannelArticlesQuery$data;
  variables: ChannelArticlesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v4 = [
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 9
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChannelArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Channel",
        "kind": "LinkedField",
        "name": "channel",
        "plural": false,
        "selections": [
          {
            "args": [
              (v3/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ChannelArticles_channel"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChannelArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Channel",
        "kind": "LinkedField",
        "name": "channel",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                        "name": "title",
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
                        "name": "byline",
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
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 334
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 445
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
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              },
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
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": [
              "sort"
            ],
            "handle": "connection",
            "key": "ChannelArticles_articlesConnection",
            "kind": "LinkedHandle",
            "name": "articlesConnection"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "45a5577e4ff6deec0b7c8e8c17b01370",
    "id": null,
    "metadata": {},
    "name": "ChannelArticlesQuery",
    "operationKind": "query",
    "text": "query ChannelArticlesQuery(\n  $id: ID!\n  $after: String\n) {\n  channel(id: $id) {\n    ...ChannelArticles_channel_WGPvJ\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ChannelArticles_channel_WGPvJ on Channel {\n  articlesConnection(first: 9, after: $after, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4ba65424f0d14752a56b0b3453b537f0";

export default node;
