/**
 * @generated SignedSource<<f54522d82fc3766439725ec5064c4911>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVerticalRelatedArticles_test_Query$variables = Record<PropertyKey, never>;
export type ArticleVerticalRelatedArticles_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleVerticalRelatedArticles_article">;
  } | null | undefined;
};
export type ArticleVerticalRelatedArticles_test_Query = {
  response: ArticleVerticalRelatedArticles_test_Query$data;
  variables: ArticleVerticalRelatedArticles_test_Query$variables;
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
  "name": "vertical",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v6 = {
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
    "name": "ArticleVerticalRelatedArticles_test_Query",
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
            "name": "ArticleVerticalRelatedArticles_article"
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
    "name": "ArticleVerticalRelatedArticles_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": "verticalRelatedArticles",
            "args": [
              {
                "kind": "Literal",
                "name": "inVertical",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 8
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
              (v1/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": "relatedArticles(inVertical:true,size:8)"
          },
          (v2/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "ce7290aecd176a7f940d5703acae53b5",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.id": (v3/*: any*/),
        "article.vertical": (v4/*: any*/),
        "article.verticalRelatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.verticalRelatedArticles.byline": (v4/*: any*/),
        "article.verticalRelatedArticles.href": (v4/*: any*/),
        "article.verticalRelatedArticles.id": (v3/*: any*/),
        "article.verticalRelatedArticles.internalID": (v3/*: any*/),
        "article.verticalRelatedArticles.publishedAt": (v4/*: any*/),
        "article.verticalRelatedArticles.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.verticalRelatedArticles.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "article.verticalRelatedArticles.thumbnailImage.cropped.height": (v5/*: any*/),
        "article.verticalRelatedArticles.thumbnailImage.cropped.src": (v6/*: any*/),
        "article.verticalRelatedArticles.thumbnailImage.cropped.srcSet": (v6/*: any*/),
        "article.verticalRelatedArticles.thumbnailImage.cropped.width": (v5/*: any*/),
        "article.verticalRelatedArticles.thumbnailTitle": (v4/*: any*/),
        "article.verticalRelatedArticles.title": (v4/*: any*/),
        "article.verticalRelatedArticles.vertical": (v4/*: any*/)
      }
    },
    "name": "ArticleVerticalRelatedArticles_test_Query",
    "operationKind": "query",
    "text": "query ArticleVerticalRelatedArticles_test_Query {\n  article(id: \"example\") {\n    ...ArticleVerticalRelatedArticles_article\n    id\n  }\n}\n\nfragment ArticleVerticalRelatedArticles_article on Article {\n  vertical\n  verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {\n    internalID\n    ...CellArticle_article\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "af9e1314229d372897f32f22894ee7ff";

export default node;
