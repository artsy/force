/**
 * @generated SignedSource<<30f16147c38fee54b5457ce28a3c325d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleNewsRelatedArticles_test_Query$variables = Record<PropertyKey, never>;
export type ArticleNewsRelatedArticles_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleNewsRelatedArticles_article">;
  } | null | undefined;
};
export type ArticleNewsRelatedArticles_test_Query = {
  response: ArticleNewsRelatedArticles_test_Query$data;
  variables: ArticleNewsRelatedArticles_test_Query$variables;
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
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
    "name": "ArticleNewsRelatedArticles_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArticleNewsRelatedArticles_article"
          }
        ],
        "storageKey": "article(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArticleNewsRelatedArticles_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          {
            "alias": "newsRelatedArticles",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 3
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
              (v1/*: any*/)
            ],
            "storageKey": "relatedArticles(size:3)"
          },
          (v1/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "463aea9a21a8af906fc23a6b758f9b92",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.id": (v2/*: any*/),
        "article.newsRelatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.newsRelatedArticles.byline": (v3/*: any*/),
        "article.newsRelatedArticles.href": (v3/*: any*/),
        "article.newsRelatedArticles.id": (v2/*: any*/),
        "article.newsRelatedArticles.internalID": (v2/*: any*/),
        "article.newsRelatedArticles.publishedAt": (v3/*: any*/),
        "article.newsRelatedArticles.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.newsRelatedArticles.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "article.newsRelatedArticles.thumbnailImage.cropped.height": (v4/*: any*/),
        "article.newsRelatedArticles.thumbnailImage.cropped.src": (v5/*: any*/),
        "article.newsRelatedArticles.thumbnailImage.cropped.srcSet": (v5/*: any*/),
        "article.newsRelatedArticles.thumbnailImage.cropped.width": (v4/*: any*/),
        "article.newsRelatedArticles.thumbnailTitle": (v3/*: any*/),
        "article.newsRelatedArticles.title": (v3/*: any*/),
        "article.newsRelatedArticles.vertical": (v3/*: any*/)
      }
    },
    "name": "ArticleNewsRelatedArticles_test_Query",
    "operationKind": "query",
    "text": "query ArticleNewsRelatedArticles_test_Query {\n  article(id: \"example\") {\n    ...ArticleNewsRelatedArticles_article\n    id\n  }\n}\n\nfragment ArticleNewsRelatedArticles_article on Article {\n  newsRelatedArticles: relatedArticles(size: 3) {\n    internalID\n    ...CellArticle_article\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9fd45f6e4bc411dedbf70109d1511f1a";

export default node;
