/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSeries_test_QueryVariables = {};
export type ArticleSeries_test_QueryResponse = {
    readonly article: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleSeries_article">;
    } | null;
};
export type ArticleSeries_test_Query = {
    readonly response: ArticleSeries_test_QueryResponse;
    readonly variables: ArticleSeries_test_QueryVariables;
};



/*
query ArticleSeries_test_Query {
  article(id: "example") {
    ...ArticleSeries_article
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

fragment ArticleSeries_article on Article {
  title
  byline
  href
  series {
    description
  }
  sponsor {
    ...ArticleSponsor_sponsor
  }
  relatedArticles {
    ...ArticleSeriesItem_article
    internalID
    id
  }
}

fragment ArticleSponsor_sponsor on ArticleSponsor {
  partnerLightLogo
  partnerDarkLogo
  partnerLogoLink
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
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
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
    "cacheID": "edc5d6324a9d6c520e3c37623e9e2846",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.byline": (v6/*: any*/),
        "article.href": (v6/*: any*/),
        "article.id": (v7/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v6/*: any*/),
        "article.relatedArticles.description": (v6/*: any*/),
        "article.relatedArticles.href": (v6/*: any*/),
        "article.relatedArticles.id": (v7/*: any*/),
        "article.relatedArticles.internalID": (v7/*: any*/),
        "article.relatedArticles.media": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleMedia"
        },
        "article.relatedArticles.media.duration": (v6/*: any*/),
        "article.relatedArticles.publishedAt": (v6/*: any*/),
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
        "article.relatedArticles.thumbnailImage.display.src": (v8/*: any*/),
        "article.relatedArticles.thumbnailImage.display.srcSet": (v8/*: any*/),
        "article.relatedArticles.thumbnailTitle": (v6/*: any*/),
        "article.relatedArticles.title": (v6/*: any*/),
        "article.series": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSeries"
        },
        "article.series.description": (v6/*: any*/),
        "article.sponsor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSponsor"
        },
        "article.sponsor.partnerDarkLogo": (v6/*: any*/),
        "article.sponsor.partnerLightLogo": (v6/*: any*/),
        "article.sponsor.partnerLogoLink": (v6/*: any*/),
        "article.title": (v6/*: any*/)
      }
    },
    "name": "ArticleSeries_test_Query",
    "operationKind": "query",
    "text": "query ArticleSeries_test_Query {\n  article(id: \"example\") {\n    ...ArticleSeries_article\n    id\n  }\n}\n\nfragment ArticleSeriesItem_article on Article {\n  href\n  title\n  thumbnailTitle\n  byline\n  description\n  publishedAt(format: \"MMM DD, YYYY\")\n  thumbnailImage {\n    display: cropped(width: 869, height: 580) {\n      src\n      srcSet\n    }\n  }\n  media {\n    duration\n  }\n}\n\nfragment ArticleSeries_article on Article {\n  title\n  byline\n  href\n  series {\n    description\n  }\n  sponsor {\n    ...ArticleSponsor_sponsor\n  }\n  relatedArticles {\n    ...ArticleSeriesItem_article\n    internalID\n    id\n  }\n}\n\nfragment ArticleSponsor_sponsor on ArticleSponsor {\n  partnerLightLogo\n  partnerDarkLogo\n  partnerLogoLink\n}\n"
  }
};
})();
(node as any).hash = '17f8ec93b14a0799e4b41874b3b9859b';
export default node;
