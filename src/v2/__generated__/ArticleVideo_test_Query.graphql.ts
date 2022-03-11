/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleVideo_test_QueryVariables = {};
export type ArticleVideo_test_QueryResponse = {
    readonly article: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleVideo_article">;
    } | null;
};
export type ArticleVideo_test_Query = {
    readonly response: ArticleVideo_test_QueryResponse;
    readonly variables: ArticleVideo_test_QueryVariables;
};



/*
query ArticleVideo_test_Query {
  article(id: "example") {
    ...ArticleVideo_article
    id
  }
}

fragment ArticleSeriesItem_article on Article {
  href
  title
  thumbnailTitle
  byline
  description
  publishedAt(format: "MMM DD, YYYY")
  thumbnailImage {
    display: cropped(width: 869, height: 580) {
      src
      srcSet
    }
  }
  media {
    duration
  }
}

fragment ArticleSponsor_sponsor on ArticleSponsor {
  partnerLightLogo
  partnerDarkLogo
  partnerLogoLink
}

fragment ArticleVideo_article on Article {
  title
  href
  description
  media {
    coverImage {
      url
    }
    credits
    description
    duration
    releaseDate(format: "MMM DD, YYYY h:mma")
    url
  }
  seriesArticle {
    title
    href
    description
    sponsor {
      ...ArticleSponsor_sponsor
    }
    id
  }
  seriesRelatedArticles: relatedArticles(size: 4) {
    ...ArticleSeriesItem_article
    internalID
    id
  }
}
*/

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
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "duration",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArticleMedia"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v12 = {
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
                  (v4/*: any*/)
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
              (v3/*: any*/),
              (v5/*: any*/),
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
              (v4/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/),
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
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "seriesRelatedArticles",
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
              (v2/*: any*/),
              (v1/*: any*/),
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
              (v3/*: any*/),
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
              (v6/*: any*/)
            ],
            "storageKey": "relatedArticles(size:4)"
          },
          (v6/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "dc3f742a8d208fd2c46ae1693074066e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v7/*: any*/),
        "article.description": (v8/*: any*/),
        "article.href": (v8/*: any*/),
        "article.id": (v9/*: any*/),
        "article.media": (v10/*: any*/),
        "article.media.coverImage": (v11/*: any*/),
        "article.media.coverImage.url": (v8/*: any*/),
        "article.media.credits": (v8/*: any*/),
        "article.media.description": (v8/*: any*/),
        "article.media.duration": (v8/*: any*/),
        "article.media.releaseDate": (v8/*: any*/),
        "article.media.url": (v8/*: any*/),
        "article.seriesArticle": (v7/*: any*/),
        "article.seriesArticle.description": (v8/*: any*/),
        "article.seriesArticle.href": (v8/*: any*/),
        "article.seriesArticle.id": (v9/*: any*/),
        "article.seriesArticle.sponsor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSponsor"
        },
        "article.seriesArticle.sponsor.partnerDarkLogo": (v8/*: any*/),
        "article.seriesArticle.sponsor.partnerLightLogo": (v8/*: any*/),
        "article.seriesArticle.sponsor.partnerLogoLink": (v8/*: any*/),
        "article.seriesArticle.title": (v8/*: any*/),
        "article.seriesRelatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.seriesRelatedArticles.byline": (v8/*: any*/),
        "article.seriesRelatedArticles.description": (v8/*: any*/),
        "article.seriesRelatedArticles.href": (v8/*: any*/),
        "article.seriesRelatedArticles.id": (v9/*: any*/),
        "article.seriesRelatedArticles.internalID": (v9/*: any*/),
        "article.seriesRelatedArticles.media": (v10/*: any*/),
        "article.seriesRelatedArticles.media.duration": (v8/*: any*/),
        "article.seriesRelatedArticles.publishedAt": (v8/*: any*/),
        "article.seriesRelatedArticles.thumbnailImage": (v11/*: any*/),
        "article.seriesRelatedArticles.thumbnailImage.display": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "article.seriesRelatedArticles.thumbnailImage.display.src": (v12/*: any*/),
        "article.seriesRelatedArticles.thumbnailImage.display.srcSet": (v12/*: any*/),
        "article.seriesRelatedArticles.thumbnailTitle": (v8/*: any*/),
        "article.seriesRelatedArticles.title": (v8/*: any*/),
        "article.title": (v8/*: any*/)
      }
    },
    "name": "ArticleVideo_test_Query",
    "operationKind": "query",
    "text": "query ArticleVideo_test_Query {\n  article(id: \"example\") {\n    ...ArticleVideo_article\n    id\n  }\n}\n\nfragment ArticleSeriesItem_article on Article {\n  href\n  title\n  thumbnailTitle\n  byline\n  description\n  publishedAt(format: \"MMM DD, YYYY\")\n  thumbnailImage {\n    display: cropped(width: 869, height: 580) {\n      src\n      srcSet\n    }\n  }\n  media {\n    duration\n  }\n}\n\nfragment ArticleSponsor_sponsor on ArticleSponsor {\n  partnerLightLogo\n  partnerDarkLogo\n  partnerLogoLink\n}\n\nfragment ArticleVideo_article on Article {\n  title\n  href\n  description\n  media {\n    coverImage {\n      url\n    }\n    credits\n    description\n    duration\n    releaseDate(format: \"MMM DD, YYYY h:mma\")\n    url\n  }\n  seriesArticle {\n    title\n    href\n    description\n    sponsor {\n      ...ArticleSponsor_sponsor\n    }\n    id\n  }\n  seriesRelatedArticles: relatedArticles(size: 4) {\n    ...ArticleSeriesItem_article\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '81bf77f6aa4641a59ad86cce1ffebb28';
export default node;
