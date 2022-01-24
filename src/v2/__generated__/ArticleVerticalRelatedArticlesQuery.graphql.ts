/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleVerticalRelatedArticlesQueryVariables = {
    id: string;
};
export type ArticleVerticalRelatedArticlesQueryResponse = {
    readonly article: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleVerticalRelatedArticles_article">;
    } | null;
};
export type ArticleVerticalRelatedArticlesQuery = {
    readonly response: ArticleVerticalRelatedArticlesQueryResponse;
    readonly variables: ArticleVerticalRelatedArticlesQueryVariables;
};



/*
query ArticleVerticalRelatedArticlesQuery(
  $id: String!
) {
  article(id: $id) {
    ...ArticleVerticalRelatedArticles_article
    id
  }
}

fragment ArticleVerticalRelatedArticles_article on Article {
  vertical
  verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {
    vertical
    internalID
    title
    byline
    href
    publishedAt(format: "MMM D, YYYY")
    thumbnailImage {
      cropped(width: 300, height: 200) {
        width
        height
        src
        srcSet
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vertical",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleVerticalRelatedArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArticleVerticalRelatedArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v2/*: any*/),
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
                "name": "title",
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
                        "value": 200
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
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
                    "storageKey": "cropped(height:200,width:300)"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": "relatedArticles(inVertical:true,size:8)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6656af285d826c3bdc7ccaaa870fa591",
    "id": null,
    "metadata": {},
    "name": "ArticleVerticalRelatedArticlesQuery",
    "operationKind": "query",
    "text": "query ArticleVerticalRelatedArticlesQuery(\n  $id: String!\n) {\n  article(id: $id) {\n    ...ArticleVerticalRelatedArticles_article\n    id\n  }\n}\n\nfragment ArticleVerticalRelatedArticles_article on Article {\n  vertical\n  verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {\n    vertical\n    internalID\n    title\n    byline\n    href\n    publishedAt(format: \"MMM D, YYYY\")\n    thumbnailImage {\n      cropped(width: 300, height: 200) {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b8e65ed0888ede874380337d360d8c54';
export default node;
