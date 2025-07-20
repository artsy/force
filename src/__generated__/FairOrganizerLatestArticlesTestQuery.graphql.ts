/**
 * @generated SignedSource<<7b6a2bdc6937580c85c81fdfc5b4cb38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerLatestArticlesTestQuery$variables = Record<PropertyKey, never>;
export type FairOrganizerLatestArticlesTestQuery$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerLatestArticles_fairOrganizer">;
  } | null | undefined;
};
export type FairOrganizerLatestArticlesTestQuery = {
  response: FairOrganizerLatestArticlesTestQuery$data;
  variables: FairOrganizerLatestArticlesTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerLatestArticlesTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerLatestArticles_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOrganizerLatestArticlesTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 7
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
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:7,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "6faa7e65757b950e11a4525dbcf6898d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "fairOrganizer.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "fairOrganizer.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "fairOrganizer.articlesConnection.edges.node.byline": (v2/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.href": (v2/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.id": (v3/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.internalID": (v3/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.publishedAt": (v2/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.height": (v4/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.src": (v5/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v5/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.width": (v4/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailTitle": (v2/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.title": (v2/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.vertical": (v2/*: any*/),
        "fairOrganizer.articlesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "fairOrganizer.id": (v3/*: any*/),
        "fairOrganizer.name": (v2/*: any*/),
        "fairOrganizer.slug": (v3/*: any*/)
      }
    },
    "name": "FairOrganizerLatestArticlesTestQuery",
    "operationKind": "query",
    "text": "query FairOrganizerLatestArticlesTestQuery {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerLatestArticles_fairOrganizer\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {\n  name\n  slug\n  articlesConnection(first: 7, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "988de86edb6c4369f4df9c483f92283e";

export default node;
