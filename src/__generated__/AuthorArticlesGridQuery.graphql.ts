/**
 * @generated SignedSource<<25933f225cd712e12487847abb58a52c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorArticlesGridQuery$variables = {
  id: string;
};
export type AuthorArticlesGridQuery$data = {
  readonly author: {
    readonly articles: ReadonlyArray<{
      readonly byline: string | null | undefined;
      readonly href: string | null | undefined;
      readonly internalID: string;
      readonly publishedAt: string | null | undefined;
      readonly thumbnailImage: {
        readonly large: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
      readonly thumbnailTitle: string | null | undefined;
      readonly title: string | null | undefined;
      readonly vertical: string | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
    }>;
  } | null | undefined;
};
export type AuthorArticlesGridQuery = {
  response: AuthorArticlesGridQuery$data;
  variables: AuthorArticlesGridQuery$variables;
};

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
  "name": "internalID",
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
  "name": "vertical",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailTitle",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v8 = {
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v11 = {
  "alias": "large",
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 600
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 600
    }
  ],
  "concreteType": "CroppedImageUrl",
  "kind": "LinkedField",
  "name": "cropped",
  "plural": false,
  "selections": [
    (v9/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": "cropped(height:600,width:600)"
},
v12 = {
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
    "name": "AuthorArticlesGridQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CellArticle_article"
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "thumbnailImage",
                "plural": false,
                "selections": [
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "AuthorArticlesGridQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/),
              (v3/*: any*/),
              (v8/*: any*/),
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
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": "cropped(height:334,width:445)"
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c9a2f67af343018a8d2eea9a5ddcf798",
    "id": null,
    "metadata": {},
    "name": "AuthorArticlesGridQuery",
    "operationKind": "query",
    "text": "query AuthorArticlesGridQuery(\n  $id: String!\n) {\n  author(id: $id) {\n    articles {\n      ...CellArticle_article\n      internalID\n      href\n      vertical\n      thumbnailTitle\n      title\n      byline\n      publishedAt(format: \"MMM D, YYYY\")\n      thumbnailImage {\n        large: cropped(width: 600, height: 600) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab241d70e05e445a0c271b8b2d461702";

export default node;
