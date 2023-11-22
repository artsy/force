/**
 * @generated SignedSource<<1e7d1ff5b6e56dd6f58d38cbbb107b3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVideo_test_Query$variables = Record<PropertyKey, never>;
export type ArticleVideo_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleVideo_article">;
  } | null | undefined;
};
export type ArticleVideo_test_Query = {
  response: ArticleVideo_test_Query$data;
  variables: ArticleVideo_test_Query$variables;
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
  "name": "title",
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
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "duration",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArticleMedia"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v13 = {
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
    "name": "ArticleVideo_test_Query",
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
            "name": "ArticleVideo_article"
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
    "name": "ArticleVideo_test_Query",
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
          (v4/*: any*/),
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
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "coverImage",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credits",
                "storageKey": null
              },
              (v4/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM DD, YYYY h:mma"
                  }
                ],
                "kind": "ScalarField",
                "name": "releaseDate",
                "storageKey": "releaseDate(format:\"MMM DD, YYYY h:mma\")"
              },
              (v5/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "moreRelatedArticles",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 4
              }
            ],
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "relatedArticles",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
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
                  (v6/*: any*/)
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
                  (v2/*: any*/),
                  (v7/*: any*/)
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
              (v7/*: any*/)
            ],
            "storageKey": "relatedArticles(size:4)"
          },
          (v7/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "2fbf4f8756cee62f3a5401a3259b849b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v8/*: any*/),
        "article.description": (v9/*: any*/),
        "article.href": (v9/*: any*/),
        "article.id": (v10/*: any*/),
        "article.media": (v11/*: any*/),
        "article.media.coverImage": (v12/*: any*/),
        "article.media.coverImage.url": (v9/*: any*/),
        "article.media.credits": (v9/*: any*/),
        "article.media.description": (v9/*: any*/),
        "article.media.duration": (v9/*: any*/),
        "article.media.releaseDate": (v9/*: any*/),
        "article.media.url": (v9/*: any*/),
        "article.moreRelatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.moreRelatedArticles.byline": (v9/*: any*/),
        "article.moreRelatedArticles.description": (v9/*: any*/),
        "article.moreRelatedArticles.href": (v9/*: any*/),
        "article.moreRelatedArticles.id": (v10/*: any*/),
        "article.moreRelatedArticles.internalID": (v10/*: any*/),
        "article.moreRelatedArticles.media": (v11/*: any*/),
        "article.moreRelatedArticles.media.duration": (v9/*: any*/),
        "article.moreRelatedArticles.publishedAt": (v9/*: any*/),
        "article.moreRelatedArticles.seriesArticle": (v8/*: any*/),
        "article.moreRelatedArticles.seriesArticle.id": (v10/*: any*/),
        "article.moreRelatedArticles.seriesArticle.title": (v9/*: any*/),
        "article.moreRelatedArticles.thumbnailImage": (v12/*: any*/),
        "article.moreRelatedArticles.thumbnailImage.display": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "article.moreRelatedArticles.thumbnailImage.display.src": (v13/*: any*/),
        "article.moreRelatedArticles.thumbnailImage.display.srcSet": (v13/*: any*/),
        "article.moreRelatedArticles.thumbnailTitle": (v9/*: any*/),
        "article.moreRelatedArticles.title": (v9/*: any*/),
        "article.moreRelatedArticles.vertical": (v9/*: any*/),
        "article.seriesArticle": (v8/*: any*/),
        "article.seriesArticle.description": (v9/*: any*/),
        "article.seriesArticle.href": (v9/*: any*/),
        "article.seriesArticle.id": (v10/*: any*/),
        "article.seriesArticle.sponsor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSponsor"
        },
        "article.seriesArticle.sponsor.partnerDarkLogo": (v9/*: any*/),
        "article.seriesArticle.sponsor.partnerLightLogo": (v9/*: any*/),
        "article.seriesArticle.sponsor.partnerLogoLink": (v9/*: any*/),
        "article.seriesArticle.title": (v9/*: any*/),
        "article.title": (v9/*: any*/),
        "article.vertical": (v9/*: any*/)
      }
    },
    "name": "ArticleVideo_test_Query",
    "operationKind": "query",
    "text": "query ArticleVideo_test_Query {\n  article(id: \"example\") {\n    ...ArticleVideo_article\n    id\n  }\n}\n\nfragment ArticleSeriesItem_article on Article {\n  href\n  vertical\n  title\n  thumbnailTitle\n  byline\n  description\n  publishedAt(format: \"MMM DD, YYYY\")\n  thumbnailImage {\n    display: cropped(width: 869, height: 580) {\n      src\n      srcSet\n    }\n  }\n  media {\n    duration\n  }\n  seriesArticle {\n    title\n    id\n  }\n}\n\nfragment ArticleSponsor_sponsor on ArticleSponsor {\n  partnerLightLogo\n  partnerDarkLogo\n  partnerLogoLink\n}\n\nfragment ArticleVideo_article on Article {\n  vertical\n  title\n  href\n  description\n  media {\n    coverImage {\n      url\n    }\n    credits\n    description\n    duration\n    releaseDate(format: \"MMM DD, YYYY h:mma\")\n    url\n  }\n  seriesArticle {\n    title\n    href\n    description\n    sponsor {\n      ...ArticleSponsor_sponsor\n    }\n    id\n  }\n  moreRelatedArticles: relatedArticles(size: 4) {\n    ...ArticleSeriesItem_article\n    internalID\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "81bf77f6aa4641a59ad86cce1ffebb28";

export default node;
