/**
 * @generated SignedSource<<c1c38a09656beedf4816c4b21ed40a00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleChannelRelatedArticles_test_Query$variables = Record<PropertyKey, never>;
export type ArticleChannelRelatedArticles_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleChannelRelatedArticles_article">;
  } | null | undefined;
};
export type ArticleChannelRelatedArticles_test_Query = {
  response: ArticleChannelRelatedArticles_test_Query$data;
  variables: ArticleChannelRelatedArticles_test_Query$variables;
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
  "name": "byline",
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
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleChannelRelatedArticles_test_Query",
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
            "name": "ArticleChannelRelatedArticles_article"
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
    "name": "ArticleChannelRelatedArticles_test_Query",
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
            "alias": null,
            "args": null,
            "concreteType": "Channel",
            "kind": "LinkedField",
            "name": "channel",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
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
            "name": "channelArticles",
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
              (v1/*: any*/),
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
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "5ca7bf6765952d5cb57ba46db6b15ab1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.byline": (v3/*: any*/),
        "article.channel": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Channel"
        },
        "article.channel.id": (v4/*: any*/),
        "article.channel.name": (v5/*: any*/),
        "article.channelArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.channelArticles.byline": (v3/*: any*/),
        "article.channelArticles.href": (v3/*: any*/),
        "article.channelArticles.id": (v4/*: any*/),
        "article.channelArticles.internalID": (v4/*: any*/),
        "article.channelArticles.publishedAt": (v3/*: any*/),
        "article.channelArticles.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.channelArticles.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "article.channelArticles.thumbnailImage.cropped.height": (v6/*: any*/),
        "article.channelArticles.thumbnailImage.cropped.src": (v5/*: any*/),
        "article.channelArticles.thumbnailImage.cropped.srcSet": (v5/*: any*/),
        "article.channelArticles.thumbnailImage.cropped.width": (v6/*: any*/),
        "article.channelArticles.thumbnailTitle": (v3/*: any*/),
        "article.channelArticles.title": (v3/*: any*/),
        "article.channelArticles.vertical": (v3/*: any*/),
        "article.id": (v4/*: any*/)
      }
    },
    "name": "ArticleChannelRelatedArticles_test_Query",
    "operationKind": "query",
    "text": "query ArticleChannelRelatedArticles_test_Query {\n  article(id: \"example\") {\n    ...ArticleChannelRelatedArticles_article\n    id\n  }\n}\n\nfragment ArticleChannelRelatedArticles_article on Article {\n  byline\n  channel {\n    name\n    id\n  }\n  channelArticles {\n    internalID\n    ...CellArticle_article\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1fd030ef5f382076780b258c06f0f60c";

export default node;
