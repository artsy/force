/**
 * @generated SignedSource<<1f7bd6931d14984e6076e54b8601c0dc>>
 * @relayHash 43dca918fa308d0c89cda7c9faa43a7c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 43dca918fa308d0c89cda7c9faa43a7c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSeries_test_Query$variables = Record<PropertyKey, never>;
export type ArticleSeries_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSeries_article">;
  } | null | undefined;
};
export type ArticleSeries_test_Query = {
  response: ArticleSeries_test_Query$data;
  variables: ArticleSeries_test_Query$variables;
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
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
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
    "name": "ArticleSeries_test_Query",
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
            "name": "ArticleSeries_article"
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
    "name": "ArticleSeries_test_Query",
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
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArticleSeries",
            "kind": "LinkedField",
            "name": "series",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArticleSponsor",
            "kind": "LinkedField",
            "name": "sponsor",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerLightLogo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerDarkLogo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerLogoLink",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "relatedArticles",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "vertical",
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbnailTitle",
                "storageKey": null
              },
              (v2/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM DD, YYYY"
                  }
                ],
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": "publishedAt(format:\"MMM DD, YYYY\")"
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
                    "alias": "display",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 580
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 869
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
                    "storageKey": "cropped(height:580,width:869)"
                  }
                ],
                "storageKey": null
              },
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
                    "kind": "ScalarField",
                    "name": "duration",
                    "storageKey": null
                  }
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
                  (v1/*: any*/),
                  (v5/*: any*/)
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
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "43dca918fa308d0c89cda7c9faa43a7c",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v6/*: any*/),
        "article.byline": (v7/*: any*/),
        "article.href": (v7/*: any*/),
        "article.id": (v8/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v7/*: any*/),
        "article.relatedArticles.description": (v7/*: any*/),
        "article.relatedArticles.href": (v7/*: any*/),
        "article.relatedArticles.id": (v8/*: any*/),
        "article.relatedArticles.internalID": (v8/*: any*/),
        "article.relatedArticles.media": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleMedia"
        },
        "article.relatedArticles.media.duration": (v7/*: any*/),
        "article.relatedArticles.publishedAt": (v7/*: any*/),
        "article.relatedArticles.seriesArticle": (v6/*: any*/),
        "article.relatedArticles.seriesArticle.id": (v8/*: any*/),
        "article.relatedArticles.seriesArticle.title": (v7/*: any*/),
        "article.relatedArticles.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.relatedArticles.thumbnailImage.display": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "article.relatedArticles.thumbnailImage.display.src": (v9/*: any*/),
        "article.relatedArticles.thumbnailImage.display.srcSet": (v9/*: any*/),
        "article.relatedArticles.thumbnailTitle": (v7/*: any*/),
        "article.relatedArticles.title": (v7/*: any*/),
        "article.relatedArticles.vertical": (v7/*: any*/),
        "article.series": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSeries"
        },
        "article.series.description": (v7/*: any*/),
        "article.sponsor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSponsor"
        },
        "article.sponsor.partnerDarkLogo": (v7/*: any*/),
        "article.sponsor.partnerLightLogo": (v7/*: any*/),
        "article.sponsor.partnerLogoLink": (v7/*: any*/),
        "article.title": (v7/*: any*/)
      }
    },
    "name": "ArticleSeries_test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "17f8ec93b14a0799e4b41874b3b9859b";

export default node;
