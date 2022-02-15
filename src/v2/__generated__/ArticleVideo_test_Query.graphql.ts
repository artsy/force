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
    description
    sponsor {
      ...ArticleSponsor_sponsor
    }
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
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          (v2/*: any*/),
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
                  (v3/*: any*/)
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "duration",
                "storageKey": null
              },
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
              (v3/*: any*/)
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
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "2f9599a052d632de643ed3c423cd4bcd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v5/*: any*/),
        "article.description": (v6/*: any*/),
        "article.href": (v6/*: any*/),
        "article.id": (v7/*: any*/),
        "article.media": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleMedia"
        },
        "article.media.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.media.coverImage.url": (v6/*: any*/),
        "article.media.credits": (v6/*: any*/),
        "article.media.description": (v6/*: any*/),
        "article.media.duration": (v6/*: any*/),
        "article.media.releaseDate": (v6/*: any*/),
        "article.media.url": (v6/*: any*/),
        "article.seriesArticle": (v5/*: any*/),
        "article.seriesArticle.description": (v6/*: any*/),
        "article.seriesArticle.id": (v7/*: any*/),
        "article.seriesArticle.sponsor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSponsor"
        },
        "article.seriesArticle.sponsor.partnerDarkLogo": (v6/*: any*/),
        "article.seriesArticle.sponsor.partnerLightLogo": (v6/*: any*/),
        "article.seriesArticle.sponsor.partnerLogoLink": (v6/*: any*/),
        "article.seriesArticle.title": (v6/*: any*/),
        "article.title": (v6/*: any*/)
      }
    },
    "name": "ArticleVideo_test_Query",
    "operationKind": "query",
    "text": "query ArticleVideo_test_Query {\n  article(id: \"example\") {\n    ...ArticleVideo_article\n    id\n  }\n}\n\nfragment ArticleSponsor_sponsor on ArticleSponsor {\n  partnerLightLogo\n  partnerDarkLogo\n  partnerLogoLink\n}\n\nfragment ArticleVideo_article on Article {\n  title\n  href\n  description\n  media {\n    coverImage {\n      url\n    }\n    credits\n    description\n    duration\n    releaseDate(format: \"MMM DD, YYYY h:mma\")\n    url\n  }\n  seriesArticle {\n    title\n    description\n    sponsor {\n      ...ArticleSponsor_sponsor\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '81bf77f6aa4641a59ad86cce1ffebb28';
export default node;
